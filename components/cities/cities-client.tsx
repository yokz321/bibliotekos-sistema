"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { CitiesTable } from "./cities-table"
import { CityFormDialog } from "./city-form-dialog"
import type { ICity } from "@/types/city-t"
import { deleteCityAction } from "@/actions/city-actions"
import { getApi } from "@/utils/server-api"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

export function CitiesClient() {
  const [cities, setCities] = useState<ICity[]>([])
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

  useEffect(() => {
    getCitiesFromApi()
  }, [])

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
    if (!confirm("Ar tikrai norite ištrinti miestą?")) return

    const res = await deleteCityAction(id)
    if (res.success) {
      toast.success("Miestas pašalintas")
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
