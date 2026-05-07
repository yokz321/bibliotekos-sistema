import { BookService } from "@/services/book-service"
import { type NextRequest } from "next/server"

export async function GET() {
  const service = new BookService()
  const data = await service.getAll()
  return Response.json(data)
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json()
    const service = new BookService()
    await service.save(res)
    return Response.json({ message: "Knyga sėkmingai pridėta" })
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 })
  }
}
