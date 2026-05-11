import { getApi } from "@/utils/server-api"
import { IBook } from "@/types/book-t"
import { ISubscriber } from "@/types/subscriber-t"
import { BorrowingService } from "@/services/borrowing-service"
import { ReservationsClient } from "@/components/reservations/reservations-client"

export default async function ReservationsPage() {
  const [books, subscribers] = await Promise.all([
    getApi<IBook[]>("/api/books"),
    getApi<ISubscriber[]>("/api/subscribers"),
  ])

  const service = new BorrowingService()
  const borrowings = await service.getAll()

  return (
    <div className="space-y-6">
      <ReservationsClient
        initialBorrowings={borrowings}
        books={books ?? []}
        subscribers={subscribers ?? []}
      />
    </div>
  )
}
