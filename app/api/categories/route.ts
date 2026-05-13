import { MetadataService } from "@/services/metadata-service"

export async function GET() {
  const service = new MetadataService()
  try {
    const data = await service.getCategories()
    return Response.json(data)
  } catch {
    return Response.json(
      { error: "Nepavyko gauti kategorijų sąrašo" },
      { status: 500 }
    )
  }
}
