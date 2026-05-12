"use client"

import { useState } from "react"
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
import type { ISubscriber } from "@/types/subscriber-t"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

type IProps = {
  items: ISubscriber[]
  onEdit: (item: ISubscriber) => void
  onRefresh: () => void
}

export function SubscriberTable(props: IProps) {
  const { items, onEdit, onRefresh } = props
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined)

  const executeDelete = async (id: string) => {
    setDeletingId(id)
    const res = await deleteSubscriberAction(id)

    if (res.success) {
      toast.success(res.message || "Abonentas pašalintas")
      onRefresh()
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
    setDeletingId(undefined)
  }

  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead>Bilieto Nr.</TableHead>
          <TableHead>Vardas Pavardė</TableHead>
          <TableHead>Miestas</TableHead>
          <TableHead>Telefonas</TableHead>
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
          items.map((sub) => {
            const fullName = `${sub.firstName} ${sub.lastName}`

            return (
              <TableRow key={sub.id}>
                <TableCell className="font-medium">
                  {sub.ticketNumber}
                </TableCell>
                <TableCell>{fullName}</TableCell>
                <TableCell>{sub.city}</TableCell>
                <TableCell>{sub.phone}</TableCell>
                <TableCell className="text-right space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(sub)}
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        disabled={deletingId === sub.id}
                      >
                        {deletingId === sub.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Trash2 className="h-4 w-4 text-destructive" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Ar tikrai norite pašalinti?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Abonentas <strong>{fullName}</strong> bus ištrintas iš
                          sistemos. Šio veiksmo atšaukti negalėsite.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Atšaukti</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => executeDelete(sub.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Ištrinti
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            )
          })
        )}
      </TableBody>
    </Table>
  )
}
