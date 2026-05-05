"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, UserCircle2, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Author {
  _id: string
  name: string
  biography?: string
}

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)

  const [name, setName] = useState("")
  const [biography, setBiography] = useState("")

  const fetchAuthors = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/authors", { cache: "no-store" })
      const data = await res.json()

      if (res.ok && Array.isArray(data)) {
        setAuthors(data)
      } else {
        setAuthors([])
        toast.error(data.error || "Nepavyko gauti autorių sąrašo")
      }
    } catch (error) {
      setAuthors([])
      toast.error("Tinklo klaida: nepavyko pasiekti serverio")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAuthors()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingAuthor ? "PUT" : "POST"
    const url = editingAuthor
      ? `/api/authors/${editingAuthor._id}`
      : "/api/authors"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, biography }),
      })

      if (res.ok) {
        toast.success(editingAuthor ? "Atnaujinta!" : "Pridėta!")
        setIsOpen(false)
        resetForm()
        await fetchAuthors()
      } else {
        const data = await res.json()
        toast.error(data.error || "Klaida išsaugant")
      }
    } catch (error) {
      toast.error("Nepavyko išsaugoti duomenų")
    }
  }

  const resetForm = () => {
    setName("")
    setBiography("")
    setEditingAuthor(null)
  }

  const deleteAuthor = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti?")) return
    try {
      const res = await fetch(`/api/authors/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Pašalinta")
        await fetchAuthors() // Užtikriname atnaujinimą po trynimo
      } else {
        toast.error("Nepavyko pašalinti")
      }
    } catch (error) {
      toast.error("Klaida šalinant autorių")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Autoriai</h1>
          <p className="text-muted-foreground text-sm">
            Klasifikatoriaus valdymas
          </p>
        </div>

        <Dialog
          open={isOpen}
          onOpenChange={(v) => {
            setIsOpen(v)
            if (!v) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" /> Naujas autorius
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingAuthor ? "Redaguoti autorių" : "Pridėti autorių"}
              </DialogTitle>
              <DialogDescription>
                Įveskite autoriaus duomenis. Sistema neleis pridėti dublikatų.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Vardas Pavardė</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="pvz. Jonas Biliūnas"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Biografija</Label>
                <Input
                  id="bio"
                  value={biography}
                  onChange={(e) => setBiography(e.target.value)}
                  placeholder="Trumpas aprašymas"
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Išsaugoti
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card text-card-foreground shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Autorius</TableHead>
              <TableHead>Biografija</TableHead>
              <TableHead className="text-right">Veiksmai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-600" />
                </TableCell>
              </TableRow>
            ) : Array.isArray(authors) && authors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-10 text-muted-foreground"
                >
                  Autorių sąrašas tuščias
                </TableCell>
              </TableRow>
            ) : (
              Array.isArray(authors) &&
              authors.map((author) => (
                <TableRow key={author._id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <UserCircle2 className="h-4 w-4 text-muted-foreground" />
                    {author.name}
                  </TableCell>
                  <TableCell>{author.biography || "-"}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          setEditingAuthor(author)
                          setName(author.name)
                          setBiography(author.biography || "")
                          setIsOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-red-50"
                        onClick={() => deleteAuthor(author._id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
