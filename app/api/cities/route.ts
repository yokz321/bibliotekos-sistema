import { CityService } from "@/services/city-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const service = new CityService()
  const data = await service.getAll()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json()
    const service = new CityService()
    await service.save(res)
    return Response.json({ message: "Miestas sėkmingai pridėtas" })
  } catch (error: unknown) {
    let message = "Serverio klaida"
    if (error instanceof Error) message = error.message
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
