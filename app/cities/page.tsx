import { getApi } from "@/utils/server-api"
import { CitiesClient } from "@/components/cities/cities-client"
import type { ICity } from "@/types/city-t"

export default async function CitiesPage() {
  const cities = await getApi<ICity[]>("/api/cities")

  return <CitiesClient data={cities ?? []} />
}
