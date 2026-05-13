import { BookService } from "@/services/book-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const authorId = searchParams.get("authorId") || undefined
  const publisherId = searchParams.get("publisherId") || undefined

  const service = new BookService()

  try {
    const data = await service.getInventoryReport({
      authorId,
      publisherId,
    })
    return Response.json(data)
  } catch {
    return Response.json({ error: "Serverio klaida" }, { status: 500 })
  }
}
