import { BookService } from "@/services/book-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const authParam = searchParams.get("authorId")?.trim()
  const pubParam = searchParams.get("publisherId")?.trim()

  const authorId = authParam && authParam !== "" ? authParam : undefined
  const publisherId = pubParam && pubParam !== "" ? pubParam : undefined

  const service = new BookService()

  try {
    const books = await service.getInventoryReport({ authorId, publisherId })

    let count = undefined
    if (authorId && authorId.length === 24) {
      count = await service.getBookCountByAuthor(authorId)
    }

    return Response.json({ books, count })
  } catch {
    return Response.json({ error: "Serverio klaida" }, { status: 500 })
  }
}
