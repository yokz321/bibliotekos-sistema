import { BorrowingService } from "@/services/borrowing-service"
import { type NextRequest } from "next/server"

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new BorrowingService()

  await service.returnBook(id)
  return Response.json({ message: "Knyga sėkmingai grąžinta" })
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const service = new BorrowingService()
  await service.delete(id)
  return Response.json({ message: "Rezervacija ištrinta" })
}
