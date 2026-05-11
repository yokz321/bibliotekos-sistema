import { getApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"
import { ReservationsClient } from "@/components/reservations/reservations-client"

export default async function ReservationsPage() {
  const [books, subscribers] = await Promise.all([
    getApi<IBook[]>("/api/books"),
    getApi<ISubscriber[]>("/api/subscribers"),
  ])

  return (
    <div className="space-y-6">
      <ReservationsClient books={books ?? []} subscribers={subscribers ?? []} />
    </div>
  )
}
