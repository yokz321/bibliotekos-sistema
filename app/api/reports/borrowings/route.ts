import { BorrowingService } from "@/services/borrowing-service"
import { type NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const subscriberId = searchParams.get("subscriberId") || undefined
  const bookId = searchParams.get("bookId") || undefined
  const onlyOverdue = searchParams.get("overdue") === "true"

  const service = new BorrowingService()

  try {
    const data = await service.getReportData({
      subscriberId,
      bookId,
      onlyOverdue,
    })
    return Response.json(data)
  } catch (error: unknown) {
    let message = "Klaida generuojant ataskaitą"
    if (error instanceof Error) message = error.message
    return Response.json({ error: message }, { status: 500 })
  }
}
