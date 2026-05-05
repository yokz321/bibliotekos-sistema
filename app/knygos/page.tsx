"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus, Pencil, Trash2, BookOpen, Loader2 } from "lucide-react"

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card } from "@/components/ui/card"

interface Author {
  _id: string
  name: string
}
interface Publisher {
  _id: string
  name: string
}
interface Book {
  _id: string
  title: string
  author: Author
  publisher: Publisher
  year: number
  isbn?: string
}

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [authors, setAuthors] = useState<Author[]>([])
  const [publishers, setPublishers] = useState<Publisher[]>([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  // Formos būsena
  const [title, setTitle] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [publisherId, setPublisherId] = useState("")
  const [year, setYear] = useState("")
  const [isbn, setIsbn] = useState("")

  const fetchData = async () => {
    try {
      setLoading(true)
      const [booksRes, authRes, pubRes] = await Promise.all([
        fetch("/api/books"),
        fetch("/api/authors"),
        fetch("/api/publishers"),
      ])
      const [booksData, authData, pubData] = await Promise.all([
        booksRes.json(),
        authRes.json(),
        pubRes.json(),
      ])
      if (Array.isArray(booksData)) setBooks(booksData)
      if (Array.isArray(authData)) setAuthors(authData)
      if (Array.isArray(pubData)) setPublishers(pubData)
    } catch (error) {
      toast.error("Nepavyko užkrauti duomenų")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editingBook ? "PUT" : "POST"
    const url = editingBook ? `/api/books/${editingBook._id}` : "/api/books"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          author: authorId,
          publisher: publisherId,
          year: Number(year),
          isbn,
        }),
      })

      if (res.ok) {
        toast.success(editingBook ? "Knyga atnaujinta!" : "Knyga pridėta!")
        setIsOpen(false)
        resetForm()
        fetchData()
      } else {
        const data = await res.json()
        toast.error(data.error || "Klaida išsaugant")
      }
    } catch (error) {
      toast.error("Tinklo klaida")
    }
  }

  const resetForm = () => {
    setTitle("")
    setAuthorId("")
    setPublisherId("")
    setYear("")
    setIsbn("")
    setEditingBook(null)
  }

  const deleteBook = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti šią knygą?")) return
    const res = await fetch(`/api/books/${id}`, { method: "DELETE" })
    if (res.ok) {
      toast.success("Knyga pašalinta")
      fetchData()
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knygos</h1>
          <p className="text-muted-foreground text-sm">
            Bibliotekos fondo valdymas
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
              <Plus className="mr-2 h-4 w-4" /> Nauja knyga
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingBook ? "Redaguoti knygą" : "Pridėti naują knygą"}
              </DialogTitle>
              <DialogDescription>
                Užpildykite knygos duomenis pasirinkdami klasifikatorius.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Pavadinimas</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Autorius</Label>
                  <Select onValueChange={setAuthorId} value={authorId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pasirinkite..." />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((a) => (
                        <SelectItem key={a._id} value={a._id}>
                          {a.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label>Leidykla</Label>
                  <Select onValueChange={setPublisherId} value={publisherId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pasirinkite..." />
                    </SelectTrigger>
                    <SelectContent>
                      {publishers.map((p) => (
                        <SelectItem key={p._id} value={p._id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="year">Leidimo metai</Label>
                  <Input
                    id="year"
                    type="number"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isbn">ISBN kodas</Label>
                  <Input
                    id="isbn"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                  />
                </div>
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

      <Card className="overflow-hidden border shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              <TableHead className="w-[300px]">Pavadinimas</TableHead>
              <TableHead>Autorius</TableHead>
              <TableHead>Leidykla</TableHead>
              <TableHead className="text-center">Metai</TableHead>
              <TableHead className="text-right">Veiksmai</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10">
                  <Loader2 className="h-6 w-6 animate-spin mx-auto text-orange-600" />
                </TableCell>
              </TableRow>
            ) : books.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-muted-foreground text-sm italic"
                >
                  Knygų fondo sąrašas tuščias
                </TableCell>
              </TableRow>
            ) : (
              books.map((book) => (
                <TableRow
                  key={book._id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-semibold flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-orange-600" />
                    {book.title}
                  </TableCell>
                  <TableCell>{book.author?.name || "Nežinomas"}</TableCell>
                  <TableCell>{book.publisher?.name || "Nenurodyta"}</TableCell>
                  <TableCell className="text-center">{book.year}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-blue-600 h-8 w-8"
                        onClick={() => {
                          setEditingBook(book)
                          setTitle(book.title)
                          setAuthorId(book.author?._id || "")
                          setPublisherId(book.publisher?._id || "")
                          setYear(book.year.toString())
                          setIsbn(book.isbn || "")
                          setIsOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive h-8 w-8"
                        onClick={() => deleteBook(book._id)}
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
      </Card>
    </div>
  )
}
