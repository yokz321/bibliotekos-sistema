"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ReservationsTable } from "./reservations-table"
import { ReservationFormDialog } from "./reservation-form-dialog"
import { getApi, putApi, deleteApi } from "@/utils/server-api" // SUTVARKYTA #30
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

type IProps = {
  initialBorrowings: IBorrowingPopulated[]
  books: IBook[]
  subscribers: ISubscriber[]
}

export function ReservationsClient(props: IProps) {
  const { initialBorrowings, books, subscribers } = props

  const [borrowings, setBorrowings] =
    useState<IBorrowingPopulated[]>(initialBorrowings)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const { setMessage } = useBoundStore(
    useShallow((state) => ({
      setMessage: state.setMessage,
    }))
  )

  const getBorrowingsFromApi = () => {
    getApi<IBorrowingPopulated[]>("/api/borrowings").then((data) => {
      setBorrowings(data ?? [])
    })
  }

  const handleAdd = () => {
    setIsDialogOpen(true)
  }

  const handleReturn = async (id: string) => {
    const res = await putApi<{ message?: string; error?: string }>(
      `/api/borrowings/${id}`,
      {}
    )

    if (res && !res.error) {
      if (res.message) setMessage(res.message)
      getBorrowingsFromApi()
    } else {
      setMessage(
        "Klaida: " + (res?.error || "Nepavyko užregistruoti grąžinimo")
      )
    }
  }

  const handleDelete = async (id: string) => {
    const ok = await deleteApi("/api/borrowings", id)

    if (ok) {
      setMessage("Rezervacija sėkmingai ištrinta")
      getBorrowingsFromApi()
    } else {
      setMessage("Klaida: Nepavyko ištrinti įrašo")
    }
  }

  const handleFormSuccess = (msg?: string) => {
    setIsDialogOpen(false)
    if (msg) setMessage(msg)
    getBorrowingsFromApi()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rezervacijos</h1>
          <p className="text-muted-foreground text-sm">
            Knygų išdavimo ir grąžinimo apskaita
          </p>
        </div>

        <Button
          className="bg-orange-600 hover:bg-orange-700"
          onClick={handleAdd}
        >
          <Plus className="mr-2 h-4 w-4" /> Nauja registracija
        </Button>

        <ReservationFormDialog
          isOpen={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          books={books}
          subscribers={subscribers}
          onSuccess={handleFormSuccess}
        />
      </div>

      <ReservationsTable
        items={borrowings}
        onReturn={handleReturn}
        onDelete={handleDelete}
      />
    </div>
  )
}
