"use client"

import { useState } from "react"
import { toast } from "sonner"
import { ReservationsTable } from "./reservations-table"
import { ReservationFormDialog } from "./reservation-form-dialog"
import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"

export interface IBorrowingPopulated {
  id: string
  bookId: IBook | null
  subscriberId: ISubscriber | null
  borrowDate: string
  dueDate: string
  returnDate?: string
  isReturned: boolean
}

interface Props {
  initialBorrowings: IBorrowingPopulated[]
  books: IBook[]
  subscribers: ISubscriber[]
}

export function ReservationsClient({
  initialBorrowings,
  books,
  subscribers,
}: Props) {
  const [borrowings, setBorrowings] =
    useState<IBorrowingPopulated[]>(initialBorrowings)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const refreshData = async () => {
    const data = await getApi<IBorrowingPopulated[]>("/api/borrowings")
    if (data) {
      setBorrowings(data)
    }
  }

  const handleReturn = async (id: string) => {
    try {
      const res = await fetch(`/api/borrowings/${id}`, { method: "PUT" })
      if (res.ok) {
        toast.success("Knyga sėkmingai grąžinta!")
        refreshData()
      } else {
        toast.error("Nepavyko užregistruoti grąžinimo")
      }
    } catch (error) {
      toast.error("Sistemos klaida")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite ištrinti šį įrašą?")) return

    try {
      const res = await fetch(`/api/borrowings/${id}`, { method: "DELETE" })
      if (res.ok) {
        toast.success("Įrašas pašalintas")
        refreshData()
      } else {
        toast.error("Nepavyko ištrinti")
      }
    } catch (error) {
      toast.error("Sistemos klaida")
    }
  }

  const handleFormSuccess = () => {
    setIsDialogOpen(false)
    refreshData()
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
