"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { AuthorList } from "./author-list"
import { AuthorForm } from "./author-form"
import type { IAuthor } from "@/types/author-t"
import { getApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

type IProps = {
  initialData: IAuthor[]
  className?: string
}

export function AuthorListWrapper(props: IProps) {
  const { initialData, className } = props
  void className

  const [authors, setAuthors] = useState<IAuthor[]>(initialData)
  const [isOpen, setIsOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<IAuthor | undefined>(
    undefined
  )

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    }))
  )

  const getAuthorsFromApi = () => {
    getApi<IAuthor[]>("/api/authors").then((data) => {
      setAuthors(data ?? [])
    })
  }

  const handleAdd = () => {
    setEditingAuthor(undefined)
    setIsOpen(true)
  }

  const handleEdit = (author: IAuthor) => {
    setEditingAuthor(author)
    setIsOpen(true)
  }

  const handleComplete = (msg?: string) => {
    setIsOpen(false)
    setEditingAuthor(undefined)
    if (msg) setMessage(msg)
    getAuthorsFromApi()
  }

  const handleOpenChange = (v: boolean) => {
    setIsOpen(v)
    if (!v) setEditingAuthor(undefined)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Autoriai</h1>

        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button
              className="bg-orange-600 hover:bg-orange-700"
              onClick={handleAdd}
            >
              <Plus className="mr-2 h-4 w-4" /> Naujas autorius
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editingAuthor ? "Redaguoti autorių" : "Pridėti autorių"}
              </DialogTitle>
            </DialogHeader>
            <AuthorForm
              defaultValues={editingAuthor}
              id={editingAuthor?.id}
              onComplete={handleComplete}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-md border bg-card shadow-sm overflow-hidden p-4">
        <AuthorList
          items={authors}
          onEdit={handleEdit}
          onSuccess={getAuthorsFromApi}
        />
      </div>
    </div>
  )
}
