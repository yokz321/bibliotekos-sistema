import { BorrowingService } from "@/services/borrowing-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const subParam = searchParams.get("subscriberId")?.trim()
  const bookParam = searchParams.get("bookId")?.trim()

  const subscriberId = subParam && subParam !== "" ? subParam : undefined
  const bookId = bookParam && bookParam !== "" ? bookParam : undefined
  const overdue = searchParams.get("overdue") === "true"

  const service = new BorrowingService()

  try {
    const data = await service.getReportData({
      subscriberId,
      bookId,
      onlyOverdue: overdue,
    })
    return Response.json(data)
  } catch {
    return Response.json({ error: "Serverio klaida" }, { status: 500 })
  }
}
