"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { IAuthor } from "@/types/book-t"

interface Props {
  initialData: IAuthor[]
}

export function AuthorListWrapper({ initialData }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<IAuthor | undefined>(
    undefined
  )

  const handleEdit = (author: IAuthor) => {
    setEditingAuthor(author)
    setIsOpen(true)
  }

  const handleComplete = () => {
    setIsOpen(false)
    setEditingAuthor(undefined)
    router.refresh()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Autoriai</h1>

        <Dialog
          open={isOpen}
          onOpenChange={(v) => {
            setIsOpen(v)
            if (!v) setEditingAuthor(undefined)
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-orange-600 hover:bg-orange-700">
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
        <AuthorList items={initialData} onEdit={handleEdit} />
      </div>
    </div>
  )
}
