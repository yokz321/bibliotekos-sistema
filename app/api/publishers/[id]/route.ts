import { PublisherService } from "@/services/publisher-service"
import { type NextRequest } from "next/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const res = await request.json()
  res.id = id

  const service = new PublisherService()
  await service.update(res)
  return Response.json({ message: "Update successful" })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new PublisherService()
  await service.delete(id)
  return Response.json({ message: "Delete successful" })
}
