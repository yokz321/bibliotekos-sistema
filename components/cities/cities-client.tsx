"use client"

import { useState } from "react"
import { toast } from "sonner"
import { CitiesTable } from "./cities-table"
import { CityFormDialog } from "./city-form-dialog"
import type { ICity } from "@/types/city-t"
import { deleteCityAction } from "@/actions/city-actions"
import { getApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

type IProps = {
  initialData: ICity[]
  className?: string
}

export function CitiesClient(props: IProps) {
  const { initialData, className } = props
  void className

  const [cities, setCities] = useState<ICity[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<ICity | undefined>(undefined)

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    }))
  )

  const getCitiesFromApi = () => {
    getApi<ICity[]>("/api/cities").then((res) => {
      setCities(res ?? [])
    })
  }

  const handleFormSuccess = (msg?: string) => {
    setIsDialogOpen(false)
    setEditingCity(undefined)
    if (msg) setMessage(msg)
    getCitiesFromApi()
  }

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) setEditingCity(undefined)
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    const res = await deleteCityAction(id)
    if (res.success) {
      if (res.message) {
        toast.success(res.message)
        setMessage(res.message)
      }
      getCitiesFromApi()
    } else {
      toast.error(res.error || "Klaida")
    }
  }

  const openEdit = (city: ICity) => {
    setEditingCity(city)
    setIsDialogOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Miestai</h1>
          <p className="text-muted-foreground text-sm">
            Klasifikatoriaus valdymas
          </p>
        </div>

        <CityFormDialog
          isOpen={isDialogOpen}
          onOpenChange={handleOpenChange}
          editingCity={editingCity}
          onSuccess={handleFormSuccess}
        />
      </div>

      <CitiesTable cities={cities} onEdit={openEdit} onDelete={handleDelete} />
    </div>
  )
}
