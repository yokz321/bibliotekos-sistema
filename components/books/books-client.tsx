"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { BooksTable } from "./books-table"
import { BookFormDialog } from "./book-form-dialog"
import type { IPublisher } from "@/types/publisher-t"
import type { IAuthor } from "@/types/author-t"
import type { IBook } from "@/types/book-t"
import type { ICategory, ILanguage } from "@/types/metadata-t"
import { getApi, deleteApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

type IProps = {
  initialBooks: IBook[]
  authors: IAuthor[]
  publishers: IPublisher[]
  categories: ICategory[]
  languages: ILanguage[]
}

export function BooksClient(props: IProps) {
  const { initialBooks, authors, publishers, categories, languages } = props

  const [books, setBooks] = useState<IBook[]>(initialBooks)
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

  const handleAdd = () => {
    setEditingBook(undefined)
    setIsDialogOpen(true)
  }

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

    const ok = await deleteApi("/api/books", id)

    if (ok) {
      setMessage("Knyga sėkmingai pašalinta")
      getBooksFromApi()
    } else {
      setMessage("Klaida: Nepavyko pašalinti knygos")
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

        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={handleAdd}
        >
          <Plus className="mr-2 h-4 w-4" /> Nauja knyga
        </Button>

        <BookFormDialog
          isOpen={isDialogOpen}
          onOpenChange={handleDialogOpenChange}
          editingBook={editingBook}
          authors={authors}
          publishers={publishers}
          categories={categories}
          languages={languages}
          onSuccess={handleFormSuccess}
        />
      </div>

      <BooksTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  )
}
