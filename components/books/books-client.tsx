"use client"

import { useEffect, useState } from "react"
import { BooksTable } from "./books-table"
import { BookFormDialog } from "./book-form-dialog"
import { deleteBookAction } from "@/actions/book-actions"
import type { IPublisher } from "@/types/publisher-t"
import type { IAuthor } from "@/types/author-t"
import type { IBook } from "@/types/book-t"
import { getApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

interface IProps {
  authors: IAuthor[]
  publishers: IPublisher[]
}

export function BooksClient(props: IProps) {
  const { authors, publishers } = props

  const [books, setBooks] = useState<IBook[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingBook, setEditingBook] = useState<IBook | undefined>(undefined)

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    }))
  )

  const getBooksFromApi = () => {
    getApi<IBook[]>("/api/books").then((data) => {
      setBooks(data ?? [])
    })
  }

  useEffect(() => {
    getBooksFromApi()
  }, [])

  const handleFormSuccess = (msg?: string) => {
    setIsDialogOpen(false)
    setEditingBook(undefined)
    if (msg) setMessage(msg)
    getBooksFromApi()
  }

  const handleDialogOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) setEditingBook(undefined)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    const res = await deleteBookAction(id)
    if (res.success) {
      if (res.message) setMessage(res.message)
      getBooksFromApi()
    } else {
      if (res.error) setMessage("Klaida: " + res.error)
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
          authors={authors}
          publishers={publishers}
          onSuccess={handleFormSuccess}
        />
      </div>

      <BooksTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
