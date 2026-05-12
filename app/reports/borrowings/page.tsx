import { getApi } from "@/utils/server-api"
import { BorrowingsClient } from "@/components/reports/borrowings-client"
import type { ISubscriber } from "@/types/subscriber-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

type IPageProps = {
  searchParams: Promise<{ subscriberId?: string; overdue?: string }>
}

export default async function BorrowingsReportPage(props: IPageProps) {
  const params = await props.searchParams

  const [subscribers, reportData] = await Promise.all([
    getApi<ISubscriber[]>("/api/subscribers"),
    getApi<IBorrowingPopulated[]>(
      `/api/reports/borrowings?subscriberId=${
        params.subscriberId || ""
      }&overdue=${params.overdue || ""}`
    ),
  ])

  return (
    <BorrowingsClient
      subscribers={subscribers ?? []}
      reportData={reportData ?? []}
    />
  )
}
