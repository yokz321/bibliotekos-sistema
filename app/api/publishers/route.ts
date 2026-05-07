import { PublisherService } from "@/services/publisher-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const service = new PublisherService()
  const data = await service.getAll()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json()
    const service = new PublisherService()
    await service.save(res)
    return Response.json({ message: "Leidykla sėkmingai pridėta" })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
