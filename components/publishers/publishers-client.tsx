"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PublishersTable } from "./publishers-table"
import { PublisherFormDialog } from "./publisher-form-dialog"
import type { IPublisher } from "@/types/publisher-t"
import { deletePublisherAction } from "@/actions/publisher-actions"
import { getApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

type IProps = {
  initialData: IPublisher[]
  className?: string
}

export function PublishersClient(props: IProps) {
  const { initialData, className } = props
  void className

  const [data, setData] = useState<IPublisher[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPublisher, setEditingPublisher] = useState<
    IPublisher | undefined
  >(undefined)

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    }))
  )

  const getPublishersFromApi = () => {
    getApi<IPublisher[]>("/api/publishers").then((res) => {
      setData(res ?? [])
    })
  }

  const handleFormSuccess = (msg?: string) => {
    setIsDialogOpen(false)
    setEditingPublisher(undefined)
    if (msg) setMessage(msg)
    getPublishersFromApi()
  }

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) setEditingPublisher(undefined)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    const res = await deletePublisherAction(id)
    if (res.success) {
      if (res.message) {
        toast.success(res.message)
        setMessage(res.message)
      }
      getPublishersFromApi()
    } else {
      toast.error(res.error || "Klaida")
    }
  }

  const openEdit = (pub: IPublisher) => {
    setEditingPublisher(pub)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leidyklos</h1>
          <p className="text-muted-foreground text-sm">
            Klasifikatoriaus valdymas
          </p>
        </div>

        <PublisherFormDialog
          isOpen={isDialogOpen}
          onOpenChange={handleOpenChange}
          editingPublisher={editingPublisher}
          onSuccess={handleFormSuccess}
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
