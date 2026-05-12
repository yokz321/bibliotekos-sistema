"use client"

import { useEffect, useState } from "react"
import { toast } from "sonner"
import { ReservationsTable } from "./reservations-table"
import { ReservationFormDialog } from "./reservation-form-dialog"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"
import {
  returnBookAction,
  deleteBorrowingAction,
} from "@/actions/borrowing-actions"
import { useBoundStore } from "@/store/app-store"
import { useShallow } from "zustand/react/shallow"

interface IProps {
  books: IBook[]
  subscribers: ISubscriber[]
}

export function ReservationsClient(props: IProps) {
  const { books, subscribers } = props

  const [borrowings, setBorrowings] = useState<IBorrowingPopulated[]>([])
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

  useEffect(() => {
    getBorrowingsFromApi()
  }, [])

  const handleReturn = async (id: string) => {
    const res = await returnBookAction(id)
    if (res.success) {
      toast.success("Knyga sėkmingai grąžinta!")
      getBorrowingsFromApi()
    } else {
      toast.error(res.error || "Klaida")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite ištrinti šį įrašą?")) return

    const res = await deleteBorrowingAction(id)
    if (res.success) {
      toast.success("Įrašas pašalintas")
      getBorrowingsFromApi()
    } else {
      toast.error(res.error || "Klaida")
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
