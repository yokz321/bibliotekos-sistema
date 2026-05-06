"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Pencil, Trash2, Loader2 } from "lucide-react"
import { deleteSubscriberAction } from "@/actions/subscriber-actions"
import { ISubscriber } from "@/types/subscriber-t"

interface Props {
  items: ISubscriber[]
  onEdit: (item: ISubscriber) => void
}

export function SubscriberTable({ items, onEdit }: Props) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id?: string) => {
    if (!id) return
    if (!confirm("Ar tikrai norite pašalinti šį abonentą?")) return
    setDeletingId(id)
    const res = await deleteSubscriberAction(id)
    if (res.success) {
      toast.success("Abonentas pašalintas")
      router.refresh()
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
    setDeletingId(null)
  }

  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead>Vardas</TableHead>
          <TableHead>Pavardė</TableHead>
          <TableHead>El. paštas</TableHead>
          <TableHead>Bilieto Nr.</TableHead>
          <TableHead className="text-right">Veiksmai</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={5}
              className="text-center py-10 text-muted-foreground"
            >
              Sąrašas tuščias
            </TableCell>
          </TableRow>
        ) : (
          items.map((sub) => (
            <TableRow key={sub.id}>
              <TableCell>{sub.firstName}</TableCell>
              <TableCell>{sub.lastName}</TableCell>
              <TableCell>{sub.email}</TableCell>
              <TableCell>{sub.ticketNumber}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button variant="ghost" size="icon" onClick={() => onEdit(sub)}>
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(sub.id)}
                  disabled={deletingId === sub.id}
                >
                  {deletingId === sub.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4 text-destructive" />
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
