"use client"

import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { IBook } from "@/types/book-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"
import { InventoryReportFilter } from "./inventory-report-filter"
import { InventoryList } from "./inventory-list"
import { BookCopy } from "lucide-react"

type IProps = {
  authors: IAuthor[]
  publishers: IPublisher[]
  allBooks: IBook[]
  reportData: IBook[] | IBorrowingPopulated[]
  isHistoryView: boolean
  authorCount?: number
}

export function InventoryClient(props: IProps) {
  const {
    authors,
    publishers,
    allBooks,
    reportData,
    isHistoryView,
    authorCount,
  } = props

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Fondo inventorizacija
        </h1>
        <p className="text-muted-foreground text-sm">
          Peržiūrėkite knygų sąrašus, filtruokite pagal autorius ar leidyklas
          bei sekite judėjimo istoriją.
        </p>
      </div>

      <InventoryReportFilter
        authors={authors}
        publishers={publishers}
        books={allBooks}
      />

      {authorCount !== undefined && !isHistoryView && (
        <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-100 rounded-xl text-orange-900 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="bg-orange-600 p-2 rounded-lg text-white">
            <BookCopy className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs uppercase font-bold tracking-wider opacity-70">
              Autoriaus statistika
            </p>
            <p className="font-semibold">
              Šis autorius bibliotekos fonde iš viso turi{" "}
              <span className="text-xl font-black text-orange-600 ml-1">
                {authorCount}
              </span>{" "}
              knygų egzempliorius.
            </p>
          </div>
        </div>
      )}

      <InventoryList data={reportData} isHistoryView={isHistoryView} />
    </div>
  )
}
