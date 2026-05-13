import { getApi } from "@/utils/server-api"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"
import type { ICity } from "@/types/city-t"
import type { ISubscriber } from "@/types/subscriber-t"
import type { ISubscriberType } from "@/types/metadata-t"

export default async function SubscribersPage() {
  const [subscribers, cities, subscriberTypes] = await Promise.all([
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<ICity[]>("/api/cities"),
    getApi<ISubscriberType[]>("/api/subscriber-types"),
  ])

  return (
    <SubscribersClient
      initialData={subscribers ?? []}
      cities={cities ?? []}
      subscriberTypes={subscriberTypes ?? []}
    />
  )
}
