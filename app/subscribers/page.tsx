import { SubscriberService } from "@/services/subscriber-service"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"

export default async function SubscribersPage() {
  const service = new SubscriberService()

  const subscribers = await service.getAll()

  return <SubscribersClient initialData={subscribers} />
}
