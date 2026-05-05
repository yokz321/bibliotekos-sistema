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

interface Author {
  _id: string
  name: string
  biography?: string
}

interface Props {
  initialData: Author[]
}

export function AuthorListWrapper({ initialData }: Props) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)

  const handleEdit = (author: Author) => {
    setEditingAuthor(author)
    setIsOpen(true)
  }

  const handleComplete = () => {
    setIsOpen(false)
    setEditingAuthor(null)
    router.refresh() // Atnaujina serverio duomenis be pilno reload
  }

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-end">
        <Dialog
          open={isOpen}
          onOpenChange={(v) => {
            setIsOpen(v)
            if (!v) setEditingAuthor(null)
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
              defaultValues={editingAuthor || undefined}
              id={editingAuthor?._id}
              onComplete={handleComplete}
            />
          </DialogContent>
        </Dialog>
      </div>
      <AuthorList items={initialData} onEdit={handleEdit} />
    </div>
  )
}
