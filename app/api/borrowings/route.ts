import { BorrowingService } from "@/services/borrowing-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const service = new BorrowingService()
  const data = await service.getAll()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json()
    const service = new BorrowingService()
    await service.save(res)
    return Response.json({ message: "Rezervacija sėkmingai sukurta" })
  } catch (error: unknown) {
    let message = "Serverio klaida"
    if (error instanceof Error) message = error.message
    return Response.json({ success: false, error: message }, { status: 500 })
  }
}
