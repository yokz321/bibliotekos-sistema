import { getApi } from "@/utils/server-api"
import { AnalyticsClient } from "@/components/reports/analytics-client"
import type { IPopularBook, ILateSubscriber } from "@/types/borrowing-t"

export default async function AnalyticsPage() {
  const [popularBooks, lateReturners, totalValueRes] = await Promise.all([
    getApi<IPopularBook[]>("/api/reports/analytics?type=popular"),
    getApi<ILateSubscriber[]>("/api/reports/analytics?type=late-returners"),
    getApi<{ total: number }>("/api/reports/analytics?type=total-value"),
  ])

  return (
    <AnalyticsClient
      popularBooks={popularBooks ?? []}
      lateReturners={lateReturners ?? []}
      totalValue={totalValueRes?.total ?? 0}
    />
  )
}
