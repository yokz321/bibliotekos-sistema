import { getApi } from "@/utils/server-api"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"
import type { ICity } from "@/types/city-t"
import type { ISubscriber } from "@/types/subscriber-t"

export default async function SubscribersPage() {
  const [subscribers, cities] = await Promise.all([
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<ICity[]>("/api/cities"),
  ])

  return (
    <SubscribersClient initialData={subscribers ?? []} cities={cities ?? []} />
  )
}
