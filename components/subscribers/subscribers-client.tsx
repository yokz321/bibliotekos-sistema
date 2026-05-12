"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { SubscriberTable } from "./subscriber-table"
import { SubscriberDialog } from "./subscriber-dialog"
import type { ISubscriber } from "@/types/subscriber-t"
import type { ICity } from "@/types/city-t"
import { getApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

interface IProps {
  initialData: ISubscriber[]
  cities: ICity[]
  className?: string
}

export function SubscribersClient(props: IProps) {
  const { initialData, cities, className } = props
  void className

  const [data, setData] = useState<ISubscriber[]>(initialData)
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<ISubscriber | undefined>(undefined)

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    }))
  )

  const getSubscribersFromApi = () => {
    getApi<ISubscriber[]>("/api/subscribers").then((res) => {
      setData(res ?? [])
    })
  }

  const handleEdit = (item: ISubscriber) => {
    setEditing(item)
    setIsOpen(true)
  }

  const handleSuccess = (msg?: string) => {
    setIsOpen(false)
    setEditing(undefined)
    if (msg) setMessage(msg)
    getSubscribersFromApi()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Abonentai</h1>

        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={() => {
            setEditing(undefined)
            setIsOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Naujas abonentas
        </Button>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        <SubscriberTable
          items={data}
          onEdit={handleEdit}
          onRefresh={getSubscribersFromApi}
        />
      </Card>

      <SubscriberDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        editingItem={editing}
        onSuccess={handleSuccess}
        cities={cities}
      />
    </div>
  )
}
