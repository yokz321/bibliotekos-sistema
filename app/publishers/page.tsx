import { getApi } from "@/utils/server-api"
import { PublishersClient } from "@/components/publishers/publishers-client"
import type { IPublisher } from "@/types/book-t"

export default async function PublishersPage() {
  const publishers = await getApi<IPublisher[]>("/api/publishers")
  return <PublishersClient initialData={publishers ?? []} />
}
