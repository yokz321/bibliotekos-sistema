import { BorrowingService } from "@/services/borrowing-service"
import { BookService } from "@/services/book-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get("type")

  const borrowingService = new BorrowingService()
  const bookService = new BookService()

  try {
    if (type === "popular") {
      const data = await borrowingService.getMostBorrowedBooks()
      return Response.json(data)
    }

    if (type === "late-returners") {
      const data = await borrowingService.getFrequentLateReturners()
      return Response.json(data)
    }

    if (type === "total-value") {
      const value = await bookService.getTotalLibraryValue()
      return Response.json({ total: value })
    }

    return Response.json(
      { error: "Neteisingas analitikos tipas" },
      { status: 400 }
    )
  } catch {
    return Response.json(
      { error: "Serverio klaida generuojant analitiką" },
      { status: 500 }
    )
  }
}
