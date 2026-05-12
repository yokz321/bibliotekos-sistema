"use client"

import { BorrowingReportFilter } from "./borrowing-report-filter"
import { BorrowingsList } from "./borrowings-list"
import type { ISubscriber } from "@/types/subscriber-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

type IProps = {
  subscribers: ISubscriber[]
  reportData: IBorrowingPopulated[]
}

export function BorrowingsClient(props: IProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Knygų išdavimų ataskaitos
      </h1>

      <BorrowingReportFilter subscribers={props.subscribers} />

      <BorrowingsList data={props.reportData} />
    </div>
  )
}
