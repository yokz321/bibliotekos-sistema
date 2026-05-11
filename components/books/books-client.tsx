"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BooksTable } from "./books-table"
import { BookFormDialog } from "./book-form-dialog"
import { deleteBookAction } from "@/actions/book-actions"
import type { IBook, IAuthor, IPublisher } from "@/types/book-t"
import { getApi } from "@/utils/server-api"

export function BooksClient({
  initialBooks,
  initialAuthors,
  initialPublishers,
}: {
  initialBooks: IBook[]
  initialAuthors: IAuthor[]
  initialPublishers: IPublisher[]
}) {
  const [books, setBooks] = useState<IBook[]>(initialBooks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<IBook | undefined>(undefined)

  const refreshBooks = async () => {
    const data = await getApi<IBook[]>("/api/books")
    if (data) {
      setBooks(data)
    }
  }

  const handleFormSuccess = () => {
    setIsDialogOpen(false)
    setEditingBook(undefined)
    refreshBooks()
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      setEditingBook(undefined)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    const res = await deleteBookAction(id)
    if (res.success) {
      toast.success("Knyga pašalinta sėkmingai")
      refreshBooks()
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
  }

  const handleEdit = (book: IBook) => {
    setEditingBook(book)
    setIsDialogOpen(true)
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

        <BookFormDialog
          isOpen={isDialogOpen}
          onOpenChange={handleDialogOpenChange}
          editingBook={editingBook}
          authors={initialAuthors}
          publishers={initialPublishers}
          onSuccess={handleFormSuccess}
        />
      </div>

      <BooksTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
