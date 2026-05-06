import { SubscriberService } from "@/services/subscriber-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const service = new SubscriberService()
  const data = await service.getAll()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  const res = await request.json()
  const service = new SubscriberService()
  await service.save(res)
  return Response.json({ message: "Data saved" })
}
