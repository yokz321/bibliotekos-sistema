"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PublishersTable } from "./publishers-table"
import { PublisherFormDialog } from "./publisher-form-dialog"
import { IPublisher } from "@/types/book-t"
import { deletePublisherAction } from "@/actions/publisher-actions"
import { useRouter } from "next/navigation"

export function PublishersClient({
  initialData,
}: {
  initialData: IPublisher[]
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPublisher, setEditingPublisher] = useState<
    IPublisher | undefined
  >(undefined)
  const router = useRouter()

  const handleDelete = async (id: string) => {
    const res = await deletePublisherAction(id)
    if (res.success) {
      toast.success("Leidykla pašalinta")
      router.refresh()
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
  }

  const openEdit = (pub: IPublisher) => {
    setEditingPublisher(pub)
    setIsDialogOpen(true)
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <PublisherFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingPublisher={editingPublisher}
          onSuccess={() => {
            setIsDialogOpen(false)
            setEditingPublisher(undefined)
            router.refresh()
          }}
        />
      </div>
      <PublishersTable
        publishers={initialData}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </>
  )
}
