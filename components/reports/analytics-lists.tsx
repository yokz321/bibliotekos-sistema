"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import type { IPopularBook, ILateSubscriber } from "@/types/borrowing-t"

type IPopularProps = {
  items: IPopularBook[]
}

export function PopularBooksTable(props: IPopularProps) {
  const { items } = props

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-bold">Knygos pavadinimas</TableHead>
            <TableHead className="text-right font-bold">
              Skolinimų kiekis
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center py-10 text-muted-foreground italic"
              >
                Duomenų apie skolinimus dar nėra
              </TableCell>
            </TableRow>
          ) : (
            items.map((book) => (
              <TableRow
                key={book.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-semibold text-slate-700">
                  {book.title}
                </TableCell>
                <TableCell className="text-right">
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 border-blue-100 font-bold px-3"
                  >
                    {book.borrowCount} kartus
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}

type ILateProps = {
  items: ILateSubscriber[]
}

export function LateSubscribersTable(props: ILateProps) {
  const { items } = props

  return (
    <div className="rounded-xl border bg-white shadow-sm overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50">
          <TableRow>
            <TableHead className="font-bold">
              Vardas Pavardė (Bilietas)
            </TableHead>
            <TableHead className="text-right font-bold">
              Vėlavimų skaičius
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={2}
                className="text-center py-10 text-muted-foreground italic"
              >
                Sąžiningi skaitytojai! Vėlavimų nefiksuota.
              </TableCell>
            </TableRow>
          ) : (
            items.map((sub) => (
              <TableRow
                key={sub.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <TableCell className="font-semibold text-slate-700">
                  {sub.firstName} {sub.lastName}
                  <span className="ml-2 text-xs font-normal text-muted-foreground">
                    ({sub.ticketNumber})
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <Badge variant="destructive" className="font-bold px-3">
                    {sub.lateCount} vėlavimai
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
