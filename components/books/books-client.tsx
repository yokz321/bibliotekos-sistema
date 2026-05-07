"use client"

import { useState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<IBook | undefined>(undefined)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    const res = await deleteBookAction(id)
    if (res.success) {
      toast.success("Knyga pašalinta sėkmingai")
      router.refresh()
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
  }

  const handleEdit = (book: IBook) => {
    setEditingBook(book)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <BookFormDialog
          isOpen={isDialogOpen}
          onOpenChange={(open) => {
            setIsDialogOpen(open)
            if (!open) setEditingBook(undefined)
          }}
          editingBook={editingBook}
          authors={initialAuthors}
          publishers={initialPublishers}
          onSuccess={() => {
            setIsDialogOpen(false)
            setEditingBook(undefined)
            router.refresh()
          }}
        />
      </div>
      <BooksTable
        books={initialBooks}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  )
}
