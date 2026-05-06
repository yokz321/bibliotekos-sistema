import { PublisherService } from "@/services/publisher-service"
import { PublishersClient } from "@/components/publishers/publishers-client"

export default async function PublishersPage() {
  const service = new PublisherService()
  const publishers = await service.getAll()
  const safePublishers = JSON.parse(JSON.stringify(publishers))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leidyklos</h1>
          <p className="text-muted-foreground text-sm">
            Klasifikatoriaus valdymas
          </p>
        </div>
      </div>
      <PublishersClient initialData={safePublishers} />
    </div>
  )
}
