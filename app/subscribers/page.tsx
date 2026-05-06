import { SubscriberService } from "@/services/subscriber-service"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"

export default async function SubscribersPage() {
  const service = new SubscriberService()
  const subscribers = await service.getAll()
  const safeSubscribers = JSON.parse(JSON.stringify(subscribers))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Abonentai</h1>
      </div>
      <SubscribersClient initialData={safeSubscribers} />
    </div>
  )
}
