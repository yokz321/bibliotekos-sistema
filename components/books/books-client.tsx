"use client"

import { useState } from "react"
import { toast } from "sonner"
import { BooksTable } from "./books-table"
import { BookFormDialog } from "./book-form-dialog"
import { deleteBook } from "@/actions/book-actions"
import type { Book, Author, Publisher } from "@/types/book-t"

export function BooksClient({
  initialBooks,
  initialAuthors,
  initialPublishers,
}: {
  initialBooks: Book[]
  initialAuthors: Author[]
  initialPublishers: Publisher[]
}) {
  const [books, setBooks] = useState<Book[]>(initialBooks)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti šią knygą?")) return
    const res = await deleteBook(id)
    if (res.success) {
      toast.success("Knyga pašalinta")
      setBooks((prev) => prev.filter((b) => b._id !== id))
    } else toast.error(res.error as string)
  }

  const handleSuccess = () => {
    setIsDialogOpen(false)
    setEditingBook(null)
    // revalidatePath automatiškai atnaujins page.tsx, bet lokaliam UI sync:
    window.location.reload() // Arba galite naudoti router.refresh() iš next/navigation
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
