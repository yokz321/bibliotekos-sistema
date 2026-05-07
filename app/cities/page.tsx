import { CityService } from "@/services/city-service"
import { CitiesClient } from "@/components/cities/cities-client"

export default async function CitiesPage() {
  const service = new CityService()
  const cities = await service.getAll()

  const safeCities = JSON.parse(JSON.stringify(cities))

  return <CitiesClient data={safeCities} />
}
