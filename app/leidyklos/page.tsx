"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, Building2, Loader2 } from "lucide-react"

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

interface Publisher {
  _id: string
  name: string
  location?: string
}

export default function PublishersPage() {
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(
    null
  )

  const [name, setName] = useState("")
  const [location, setLocation] = useState("")

  const fetchPublishers = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/publishers")
      if (!res.ok) throw new Error("Serverio klaida")
      const data = await res.json()
      if (Array.isArray(data)) {
        setPublishers(data)
      } else {
        setPublishers([])
      }
    } catch (error) {
      setPublishers([])
      toast.error("Nepavyko gauti leidyklų sąrašo")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPublishers()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingPublisher ? "PUT" : "POST"
    const url = editingPublisher
      ? `/api/publishers/${editingPublisher._id}`
      : "/api/publishers"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(
          editingPublisher ? "Leidykla atnaujinta!" : "Leidykla pridėta!"
        )
        setIsOpen(false)
        resetForm()
        fetchPublishers()
      } else {
        toast.error(data.error || "Klaida išsaugant")
      }
    } catch (error) {
      toast.error("Tinklo klaida išsaugant duomenis")
    }
  }

  const resetForm = () => {
    setName("")
    setLocation("")
    setEditingPublisher(null)
  }

  const deletePublisher = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti?")) return
    try {
      const res = await fetch(`/api/publishers/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Leidykla pašalinta")
        fetchPublishers()
      }
    } catch (error) {
      toast.error("Klaida šalinant")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leidyklos</h1>
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
              <Plus className="mr-2 h-4 w-4" /> Nauja leidykla
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingPublisher ? "Redaguoti leidyklą" : "Pridėti leidyklą"}
              </DialogTitle>
              <DialogDescription>
                Įveskite leidyklos duomenis.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="pub-name">Pavadinimas</Label>
                <Input
                  id="pub-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="pub-loc">Miestas / Adresas</Label>
                <Input
                  id="pub-loc"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
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

      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50 border-b">
              {/* PAŠALINTA font-bold: dabar sulygiuota su Autoriais */}
              <TableHead>Pavadinimas</TableHead>
              <TableHead>Miestas / Adresas</TableHead>
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
            ) : publishers.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-center py-10 text-muted-foreground"
                >
                  Leidyklų sąrašas tuščias
                </TableCell>
              </TableRow>
            ) : (
              publishers.map((pub) => (
                <TableRow key={pub._id}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    {pub.name}
                  </TableCell>
                  <TableCell>{pub.location || "-"}</TableCell>
                  <TableCell className="text-right flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setEditingPublisher(pub)
                        setName(pub.name)
                        setLocation(pub.location || "")
                        setIsOpen(true)
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:bg-red-50"
                      onClick={() => deletePublisher(pub._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
