import { getApi } from "@/utils/server-api"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"
import { ISubscriber } from "@/types/subscriber-t"

export default async function SubscribersPage() {
  const subscribers = await getApi<ISubscriber[]>("/api/subscribers")
  return <SubscribersClient initialData={subscribers ?? []} />
}
