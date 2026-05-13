"use client"

import { useState } from "react"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PublishersTable } from "./publishers-table"
import { PublisherFormDialog } from "./publisher-form-dialog"
import type { IPublisher } from "@/types/publisher-t"
import { getApi, deleteApi } from "@/utils/server-api"
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

  // #27: Tik vienas handleris evente
  const handleAdd = () => {
    setEditingPublisher(undefined)
    setIsDialogOpen(true)
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

    const ok = await deleteApi("/api/publishers", id)

    if (ok) {
      const msg = "Leidykla sėkmingai pašalinta"
      toast.success(msg)
      setMessage(msg)
      getPublishersFromApi()
    } else {
      toast.error("Nepavyko pašalinti leidyklos")
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
        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={handleAdd}
        >
          <Plus className="mr-2 h-4 w-4" /> Nauja leidykla
        </Button>

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
