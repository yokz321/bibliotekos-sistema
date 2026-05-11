import { getApi } from "@/utils/server-api"
import { IBook } from "@/types/book-t"
import { ISubscriber } from "@/types/subscriber-t"
import { IBorrowingPopulated } from "@/components/reservations/reservations-client"
import { ReservationsClient } from "@/components/reservations/reservations-client"

export default async function ReservationsPage() {
  const [books, subscribers, borrowings] = await Promise.all([
    getApi<IBook[]>("/api/books"),
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBorrowingPopulated[]>("/api/borrowings"),
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
