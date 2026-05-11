import { AuthorService } from "@/services/author-service"
import { type NextRequest } from "next/server"

export async function PUT(request: NextRequest) {
  const res = await request.json()
  const service = new AuthorService()
  await service.update(res)
  return Response.json({ message: "Update successful" })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new AuthorService()

  await service.delete(id)

  return Response.json({ message: "Delete successful" })
}
