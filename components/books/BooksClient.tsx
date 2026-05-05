"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BooksTable } from "./BooksTable"
import { BookFormDialog } from "./BookFormDialog"
import type { Book, Author, Publisher } from "@/types/book-t"

interface Props {
  initialBooks: Book[]
  initialAuthors: Author[]
  initialPublishers: Publisher[]
}

export function BooksClient({
  initialBooks,
  initialAuthors,
  initialPublishers,
}: Props) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const refreshBooks = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/books")
      if (res.ok) setBooks(await res.json())
    } catch {
      toast.error("Nepavyko atnaujinti knygų sąrašo")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti šią knygą?")) return
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Knyga pašalinta")
        refreshBooks()
      }
    } catch {
      toast.error("Klaida šalinant")
    }
  }

  const openEdit = (book: Book) => {
    setEditingBook(book)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <BookFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingBook={editingBook}
          authors={initialAuthors}
          publishers={initialPublishers}
          onSuccess={() => {
            setIsDialogOpen(false)
            setEditingBook(null)
            refreshBooks()
          }}
        />
      </div>
      <BooksTable
        books={books}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </>
  )
}
