import { MetadataService } from "@/services/metadata-service"

export async function GET() {
  const service = new MetadataService()
  try {
    const data = await service.getLanguages()
    return Response.json(data)
  } catch {
    return Response.json(
      { error: "Nepavyko gauti kalbų sąrašo" },
      { status: 500 }
    )
  }
}
