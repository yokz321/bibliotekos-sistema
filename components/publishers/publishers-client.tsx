"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PublishersTable } from "./publishers-table"
import { PublisherFormDialog } from "./publisher-form-dialog"
import { IPublisher } from "@/types/book-t"
import { deletePublisherAction } from "@/actions/publisher-actions"
import { getApi } from "@/utils/server-api"

export function PublishersClient({
  initialData,
}: {
  initialData: IPublisher[]
}) {
  const [data, setData] = useState<IPublisher[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPublisher, setEditingPublisher] = useState<
    IPublisher | undefined
  >(undefined)

  const refreshData = async () => {
    const res = await getApi<IPublisher[]>("/api/publishers")
    if (res) {
      setData(res)
    }
  }

  const handleDelete = async (id: string) => {
    const res = await deletePublisherAction(id)
    if (res.success) {
      toast.success("Leidykla pašalinta")
      refreshData()
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
  }

  const openEdit = (pub: IPublisher) => {
    setEditingPublisher(pub)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      {}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leidyklos</h1>
          <p className="text-muted-foreground text-sm">
            Klasifikatoriaus valdymas
          </p>
        </div>

        <PublisherFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          editingPublisher={editingPublisher}
          onSuccess={() => {
            setIsDialogOpen(false)
            setEditingPublisher(undefined)
            refreshData()
          }}
        />
      </div>

      <PublishersTable
        publishers={data}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </div>
  )
}
