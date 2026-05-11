import { getApi } from "@/utils/server-api"
import { SubscribersClient } from "@/components/subscribers/subscribers-client"
import type { ICity } from "@/types/city-t"

export default async function SubscribersPage() {
  const cities = await getApi<ICity[]>("/api/cities")

  return <SubscribersClient cities={cities ?? []} />
}
