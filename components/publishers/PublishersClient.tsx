"use client"

import { useState } from "react"
import { toast } from "sonner"
import { PublishersTable } from "./PublishersTable"
import { PublisherFormDialog } from "./PublisherFormDialog"
import type { Publisher } from "@/types/publisher-t"

export function PublishersClient({
  initialData,
}: {
  initialData: Publisher[]
}) {
  const [publishers, setPublishers] = useState<Publisher[]>(initialData)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPublisher, setEditingPublisher] = useState<Publisher | null>(
    null
  )

  const refreshData = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/publishers")
      if (res.ok) setPublishers(await res.json())
    } catch {
      toast.error("Nepavyko atnaujinti sąrašo")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti?")) return
    try {
      const res = await fetch(`/api/publishers/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Leidykla pašalinta")
        refreshData()
      }
    } catch {
      toast.error("Klaida šalinant")
    }
  }

  const openEdit = (pub: Publisher) => {
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
            setEditingPublisher(null)
            refreshData()
          }}
        />
      </div>
      <PublishersTable
        publishers={publishers}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
    </>
  )
}
