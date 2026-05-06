"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BooksTable } from "./books-table"
import { BookFormDialog } from "./book-form-dialog"
import { deleteBookAction } from "@/actions/book-actions"
import type { IBook, IAuthor, IPublisher } from "@/types/book-t"

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
  const [editingBook, setEditingBook] = useState<IBook | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti šią knygą?")) return
    const res = await deleteBookAction(id)
    if (res.success) {
      toast.success("Knyga pašalinta")
      setBooks((prev) => prev.filter((b) => b.id !== id))
    } else toast.error(res.error as string)
  }

  const handleSuccess = () => {
    setIsDialogOpen(false)
    setEditingBook(null)
    window.location.reload()
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
          onSuccess={handleSuccess}
        />
      </div>
      <BooksTable
        books={books}
        onEdit={(b) => {
          setEditingBook(b)
          setIsDialogOpen(true)
        }}
        onDelete={handleDelete}
      />
    </>
  )
}
