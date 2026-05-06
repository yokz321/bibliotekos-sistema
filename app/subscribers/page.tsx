import { getSubscribers } from "@/actions/subscriber-actions"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"

export default async function AbonentaiPage() {
  const initialData = await getSubscribers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Abonentai</h1>
          <p className="text-muted-foreground text-sm">Skaitytojų valdymas</p>
        </div>
      </div>
      <SubscribersClient initialData={initialData} />
    </div>
  )
}
