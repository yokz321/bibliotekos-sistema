"use client"

import { InventoryReportFilter } from "./inventory-report-filter"
import { InventoryList } from "./inventory-list"
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { IBook } from "@/types/book-t"

type IProps = {
  authors: IAuthor[]
  publishers: IPublisher[]
  allBooks: IBook[]
  reportData: any[]
  isHistoryView: boolean
}

export function InventoryClient(props: IProps) {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">
        Fondo inventorizacija
      </h1>
      <InventoryReportFilter
        authors={props.authors}
        publishers={props.publishers}
        books={props.allBooks}
      />
      <InventoryList
        data={props.reportData}
        isHistoryView={props.isHistoryView}
      />
    </div>
  )
}
