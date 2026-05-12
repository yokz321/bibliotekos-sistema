"use client"

import { Trash2, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

type IProps = {
  items: IBorrowingPopulated[]
  onReturn: (id: string) => void
  onDelete: (id: string) => void
}

export function ReservationsTable(props: IProps) {
  const { items, onReturn, onDelete } = props

  return (
    <Card className="overflow-hidden border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Abonentas</TableHead>
            <TableHead>Knyga</TableHead>
            <TableHead>Terminas</TableHead>
            <TableHead className="text-center">Statusas</TableHead>
            <TableHead className="text-right">Veiksmai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-muted-foreground italic"
              >
                Rezervacijų sąrašas tuščias
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => {
              const subscriberName = item.subscriberId
                ? `${item.subscriberId.firstName} ${item.subscriberId.lastName}`
                : "Pašalintas abonentas"

              const bookTitle = item.bookId?.title || "Pašalinta knyga"

              const borrowDateFormatted = new Date(
                item.borrowDate
              ).toLocaleDateString("lt-LT")
              const dueDateFormatted = new Date(
                item.dueDate
              ).toLocaleDateString("lt-LT")

              const isOverdue =
                !item.isReturned && new Date(item.dueDate) < new Date()

              let statusBadge
              if (item.isReturned) {
                statusBadge = (
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 border-green-200"
                  >
                    Grąžinta
                  </Badge>
                )
              } else if (isOverdue) {
                statusBadge = (
                  <Badge variant="destructive" className="animate-pulse">
                    Vėluoja!
                  </Badge>
                )
              } else {
                statusBadge = (
                  <Badge
                    variant="secondary"
                    className="bg-blue-50 text-blue-700"
                  >
                    Skaitoma
                  </Badge>
                )
              }

              return (
                <TableRow
                  key={item.id}
                  className={cn(isOverdue && "bg-red-50/30")}
                >
                  <TableCell className="font-medium">
                    {subscriberName}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold">{bookTitle}</span>
                      <span className="text-xs text-muted-foreground">
                        Išduota: {borrowDateFormatted}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-sm",
                      isOverdue && "text-red-600 font-bold"
                    )}
                  >
                    {dueDateFormatted}
                  </TableCell>
                  <TableCell className="text-center">{statusBadge}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {!item.isReturned && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 text-green-600 hover:bg-green-50"
                          onClick={() => onReturn(item.id)}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" /> Grąžinti
                        </Button>
                      )}

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
