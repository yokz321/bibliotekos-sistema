"use client"

import { useState } from "react"
import { toast } from "sonner"
import { CitiesTable } from "./cities-table"
import { CityFormDialog } from "./city-form-dialog"
import type { ICity } from "@/types/city-t"
import { deleteCityAction } from "@/actions/city-actions"
import { getApi } from "@/utils/server-api"

export function CitiesClient({ data: initialData }: { data: ICity[] }) {
  const [cities, setCities] = useState<ICity[]>(initialData)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCity, setEditingCity] = useState<ICity | undefined>(undefined)

  const refreshData = async () => {
    const res = await getApi<ICity[]>("/api/cities")
    if (res) {
      setCities(res)
    }
  }

  const handleFormSuccess = () => {
    setIsDialogOpen(false)
    setEditingCity(undefined)
    refreshData()
  }

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open)
    if (!open) {
      setEditingCity(undefined)
    }
  }

  const handleDelete = async (id?: string) => {
    if (!id) return

    const res = await deleteCityAction(id)
    if (res.success) {
      toast.success("Miestas pašalintas sėkmingai")
      refreshData()
    } else {
      toast.error(res.error || "Klaida šalinant")
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
