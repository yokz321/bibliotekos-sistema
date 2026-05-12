"use client"

import { BooksTable } from "@/components/books/books-table"
import { ReservationsTable } from "@/components/reservations/reservations-table"

type IProps = {
  data: any[]
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
            items={data}
            onReturn={() => {}}
            onDelete={() => {}}
          />
        </>
      ) : (
        <>
          <h2 className="text-lg font-semibold mb-4">Inventorinis sąrašas</h2>
          <BooksTable books={data} onEdit={() => {}} onDelete={() => {}} />
        </>
      )}
    </div>
  )
}
