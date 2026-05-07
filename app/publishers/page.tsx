import { PublisherService } from "@/services/publisher-service"
import { PublishersClient } from "@/components/publishers/publishers-client"

export default async function PublishersPage() {
  const service = new PublisherService()

  const publishers = await service.getAll()

  return <PublishersClient initialData={publishers} />
}
