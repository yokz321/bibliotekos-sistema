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
import { createBook, updateBook } from "@/actions/book"
import type { Book, Author, Publisher } from "@/types/book-t"

export function BookFormDialog({
  isOpen,
  onOpenChange,
  editingBook,
  authors,
  publishers,
  onSuccess,
}: {
  isOpen: boolean
  onOpenChange: (v: boolean) => void
  editingBook: Book | null
  authors: Author[]
  publishers: Publisher[]
  onSuccess: () => void
}) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!isOpen) setIsSubmitting(false)
  }, [isOpen])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const formData = new FormData(e.currentTarget)
    const res = editingBook
      ? await updateBook(editingBook._id, formData)
      : await createBook(formData)

    if (res.success) {
      toast.success(editingBook ? "Knyga atnaujinta!" : "Knyga pridėta!")
      onSuccess()
    } else
      toast.error(
        typeof res.error === "string" ? res.error : "Patikrinkite laukus"
      )
    setIsSubmitting(false)
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
              name="title"
              defaultValue={editingBook?.title}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Autorius</Label>
              <Select
                name="author"
                defaultValue={editingBook?.author?._id}
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
                name="publisher"
                defaultValue={editingBook?.publisher?._id}
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
              <Label htmlFor="year">Metai</Label>
              <Input
                id="year"
                name="year"
                type="number"
                defaultValue={editingBook?.year}
                required
                disabled={isSubmitting}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="isbn">ISBN</Label>
              <Input
                id="isbn"
                name="isbn"
                defaultValue={editingBook?.isbn || ""}
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
