"use client"

import { Building2, Loader2, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { IPublisher } from "@/types/publisher-t"

interface Props {
  publishers: IPublisher[]
  loading: boolean
  onEdit: (pub: IPublisher) => void
  onDelete: (id: string) => void
}

export function PublishersTable({
  publishers,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="h-6 w-6 animate-spin text-orange-600" />
      </div>
    )
  }

  return (
    <div className="rounded-md border bg-card shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 border-b">
            <TableHead>Pavadinimas</TableHead>
            <TableHead>Miestas / Adresas</TableHead>
            <TableHead className="text-right">Veiksmai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {publishers.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={3}
                className="text-center py-10 text-muted-foreground"
              >
                Leidyklų sąrašas tuščias
              </TableCell>
            </TableRow>
          ) : (
            publishers.map((pub) => (
              <TableRow key={pub.id}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                  {pub.name}
                </TableCell>
                <TableCell>{pub.location || "-"}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-blue-600 hover:bg-blue-50"
                    onClick={() => onEdit(pub)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:bg-red-50"
                    onClick={() => onDelete(pub.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
