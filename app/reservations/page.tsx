import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"
import { ReservationsClient } from "@/components/reservations/reservations-client"

export default async function ReservationsPage() {
  const [borrowings, books, subscribers] = await Promise.all([
    getApi<IBorrowingPopulated[]>("/api/borrowings"),
    getApi<IBook[]>("/api/books"),
    getApi<ISubscriber[]>("/api/subscribers"),
  ])

  return (
    <div className="space-y-6">
      <ReservationsClient
        initialBorrowings={borrowings ?? []}
        books={books ?? []}
        subscribers={subscribers ?? []}
      />
    </div>
  )
}
