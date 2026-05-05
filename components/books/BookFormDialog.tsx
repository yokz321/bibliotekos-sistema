"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { Book, Author, Publisher } from "@/types/book-t"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingBook: Book | null
  authors: Author[]
  publishers: Publisher[]
  onSuccess: () => void
}

export function BookFormDialog({
  isOpen,
  onOpenChange,
  editingBook,
  authors,
  publishers,
  onSuccess,
}: Props) {
  const [title, setTitle] = useState("")
  const [authorId, setAuthorId] = useState("")
  const [publisherId, setPublisherId] = useState("")
  const [year, setYear] = useState("")
  const [isbn, setIsbn] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sinchronizuoja formą su redaguojamu įrašu
  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title)
      setAuthorId(editingBook.author?._id || "")
      setPublisherId(editingBook.publisher?._id || "")
      setYear(editingBook.year.toString())
      setIsbn(editingBook.isbn || "")
    } else {
      setTitle("")
      setAuthorId("")
      setPublisherId("")
      setYear("")
      setIsbn("")
    }
  }, [editingBook, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
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
      const data = await res.json()
      if (res.ok) {
        toast.success(editingBook ? "Knyga atnaujinta!" : "Knyga pridėta!")
        onSuccess()
      } else {
        toast.error(data.error || "Klaida išsaugant")
      }
    } catch {
      toast.error("Tinklo klaida")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Pavadinimas</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Autorius</Label>
              <Select
                onValueChange={setAuthorId}
                value={authorId}
                disabled={isSubmitting}
              >
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
              <Select
                onValueChange={setPublisherId}
                value={publisherId}
                disabled={isSubmitting}
              >
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
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN kodas</Label>
              <Input
                id="isbn"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                disabled={isSubmitting}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saugoma..." : "Išsaugoti"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
