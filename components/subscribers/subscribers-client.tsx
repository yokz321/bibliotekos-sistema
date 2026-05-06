"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { SubscriberTable } from "./subscriber-table"
import { SubscriberDialog } from "./subscriber-dialog"
import type { ISubscriber } from "@/types/subscriber-t"

export function SubscribersClient({
  initialData,
}: {
  initialData: ISubscriber[]
}) {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<ISubscriber | null>(null)

  const handleEdit = (item: ISubscriber) => {
    setEditing(item)
    setIsOpen(true)
  }

  const handleSuccess = () => {
    setIsOpen(false)
    setEditing(null)
    router.refresh()
  }

  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => {
            setEditing(null)
            setIsOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Naujas abonentas
        </Button>
      </div>
      <Card className="overflow-hidden border shadow-sm">
        <SubscriberTable items={initialData} onEdit={handleEdit} />
      </Card>
      <SubscriberDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        editingItem={editing}
        onSuccess={handleSuccess}
      />
    </>
  )
}
