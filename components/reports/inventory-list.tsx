"use client"

import { BooksTable } from "@/components/books/books-table"
import { ReservationsTable } from "@/components/reservations/reservations-table"
import type { IBook } from "@/types/book-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

type IProps = {
  data: IBook[] | IBorrowingPopulated[]
  isHistoryView: boolean
}

export function InventoryList(props: IProps) {
  const { data, isHistoryView } = props

  return (
    <div className="pt-4">
      {isHistoryView ? (
        <>
          <h2 className="text-lg font-semibold mb-4 text-orange-600">
            Knygos judėjimo istorija
          </h2>
          <ReservationsTable
            items={data as IBorrowingPopulated[]}
            onReturn={() => {}}
            onDelete={() => {}}
            isReadOnly={true}
          />
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4 text-slate-700">
            Inventorinis sąrašas
          </h2>
          <BooksTable
            books={data as IBook[]}
            onEdit={() => {}}
            onDelete={() => {}}
            isReadOnly={true}
          />
        </>
      )}

      {data.length === 0 && (
        <p className="text-sm text-muted-foreground italic mt-4 text-center py-10 border rounded-lg bg-slate-50/50">
          Pagal pasirinktus filtrus duomenų nerasta.
        </p>
      )}
    </div>
  )
}
