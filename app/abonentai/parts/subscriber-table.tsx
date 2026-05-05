"use client"

import { Pencil, Trash2, UserCog } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Props {
  items: any[]
  onEdit: (item: any) => void
  onDelete: (id: string) => void
}

export function SubscriberTable({ items, onEdit, onDelete }: Props) {
  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead>Vardas Pavardė</TableHead>
          <TableHead>Pažymėjimas</TableHead>
          <TableHead>El. paštas</TableHead>
          <TableHead className="text-right">Veiksmai</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item._id} className="hover:bg-muted/50">
            <TableCell className="font-medium flex items-center gap-2">
              <UserCog className="h-4 w-4 text-orange-600" />
              {item.firstName} {item.lastName}
            </TableCell>
            <TableCell className="font-mono text-xs">
              {item.ticketNumber}
            </TableCell>
            <TableCell>{item.email}</TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-blue-600"
                  onClick={() => onEdit(item)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive"
                  onClick={() => onDelete(item._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
