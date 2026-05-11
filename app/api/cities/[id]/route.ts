import { CityService } from "@/services/city-service"
import { type NextRequest } from "next/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const res = await request.json()

  const service = new CityService()
  await service.update({ ...res, id })
  return Response.json({ message: "Miestas atnaujintas" })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new CityService()
  await service.delete(id)
  return Response.json({ message: "Miestas ištrintas" })
}
