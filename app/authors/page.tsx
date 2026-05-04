"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AuthorsPage() {
  const [authors, setAuthors] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<any>(null)
  const [name, setName] = useState("")
  const [biography, setBiography] = useState("")

  // Funkcija duomenų užkrovimui
  const fetchAuthors = async () => {
    const res = await fetch("/api/authors")
    const data = await res.json()
    setAuthors(data)
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  // Išsaugojimas (Naujas arba Redagavimas)
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingAuthor ? "PUT" : "POST"
    const url = editingAuthor
      ? `/api/authors/${editingAuthor._id}`
      : "/api/authors"

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, biography }),
    })

    const data = await res.json()

    if (res.ok) {
      toast.success(
        editingAuthor ? "Sėkmingai atnaujinta!" : "Autorius pridėtas!"
      )
      setIsOpen(false)
      setName("")
      setBiography("")
      setEditingAuthor(null)
      fetchAuthors()
    } else {
      toast.error(data.error || "Klaida išsaugant")
    }
  }

  // Šalinimas
  const deleteAuthor = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti šį autorių?")) return
    const res = await fetch(`/api/authors/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Autorius pašalintas")
      fetchAuthors()
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
          <CardTitle className="text-2xl font-bold">
            Autorių klasifikatorius
          </CardTitle>
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  setEditingAuthor(null)
                  setName("")
                  setBiography("")
                }}
              >
                + Pridėti autorių
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingAuthor ? "Redaguoti autorių" : "Naujas autorius"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSave} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Vardas Pavardė</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="pvz. Kristijonas Donelaitis"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Aprašymas</Label>
                  <Input
                    id="bio"
                    value={biography}
                    onChange={(e) => setBiography(e.target.value)}
                    placeholder="Trumpa informacija"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Išsaugoti
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Vardas</TableHead>
                <TableHead>Aprašymas</TableHead>
                <TableHead className="text-right">Veiksmai</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authors.length === 0 && (
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-center py-10 text-gray-500"
                  >
                    Autorių nerasta.
                  </TableCell>
                </TableRow>
              )}
              {authors.map((author: any) => (
                <TableRow key={author._id}>
                  <TableCell className="font-medium">{author.name}</TableCell>
                  <TableCell>{author.biography || "-"}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setEditingAuthor(author)
                        setName(author.name)
                        setBiography(author.biography || "")
                        setIsOpen(true)
                      }}
                    >
                      Redaguoti
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteAuthor(author._id)}
                    >
                      Šalinti
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
