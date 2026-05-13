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
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2, Loader2, UserCircle } from "lucide-react"
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
          <TableHead>Tipas</TableHead>
          <TableHead className="text-center">Būsena</TableHead>
          <TableHead>Telefonas</TableHead>
          <TableHead className="text-right">Veiksmai</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length === 0 ? (
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-center py-10 text-muted-foreground"
            >
              Sąrašas tuščias
            </TableCell>
          </TableRow>
        ) : (
          items.map((sub) => {
            const fullName = `${sub.firstName} ${sub.lastName}`

            return (
              <TableRow
                key={sub.id}
                className={!sub.isActive ? "opacity-60 bg-slate-50/50" : ""}
              >
                <TableCell className="font-medium">
                  {sub.ticketNumber}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <UserCircle className="h-4 w-4 text-slate-400" />
                    {fullName}
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-sm text-muted-foreground">
                    {sub.subscriberType}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Badge
                    variant={sub.isActive ? "outline" : "secondary"}
                    className={
                      sub.isActive
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-slate-100 text-slate-500"
                    }
                  >
                    {sub.isActive ? "Aktyvus" : "Pasyvus"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{sub.phone}</TableCell>
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
                          sistemos.
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
