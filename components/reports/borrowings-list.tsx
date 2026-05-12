"use client"

import { ReservationsTable } from "@/components/reservations/reservations-table"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

type IProps = {
  data: IBorrowingPopulated[]
}

export function BorrowingsList(props: IProps) {
  return (
    <div className="pt-4">
      <h2 className="text-lg font-semibold mb-4 text-slate-700">
        Paieškos rezultatai
      </h2>

      <ReservationsTable
        items={props.data}
        onReturn={() => {}}
        onDelete={() => {}}
      />

      {props.data.length === 0 && (
        <p className="text-sm text-muted-foreground italic mt-2">
          Pagal pasirinktus filtrus įrašų nerasta.
        </p>
      )}
    </div>
  )
}
