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
import type { IAuthor } from "@/types/book-t"
import { getApi } from "@/utils/server-api"

interface Props {
  initialData: IAuthor[]
}

export function AuthorListWrapper({ initialData }: Props) {
  const [authors, setAuthors] = useState<IAuthor[]>(initialData)
  const [isOpen, setIsOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<IAuthor | undefined>(
    undefined
  )

  const refreshData = async () => {
    const data = await getApi<IAuthor[]>("/api/authors")
    if (data) {
      setAuthors(data)
    }
  }

  const handleEdit = (author: IAuthor) => {
    setEditingAuthor(author)
    setIsOpen(true)
  }

  const handleComplete = () => {
    setIsOpen(false)
    setEditingAuthor(undefined)
    refreshData()
  }

  const handleOpenChange = (v: boolean) => {
    setIsOpen(v)
    if (!v) {
      setEditingAuthor(undefined)
    }
  }

  const dialogTitle = editingAuthor ? "Redaguoti autorių" : "Pridėti autorių"

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Autoriai</h1>

        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Plus className="mr-2 h-4 w-4" /> Naujas autorius
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{dialogTitle}</DialogTitle>
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
          onSuccess={refreshData}
        />
      </div>
    </div>
  )
}
