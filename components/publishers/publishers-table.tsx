"use client"

import { Building2, Pencil, Trash2 } from "lucide-react"
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

interface IProps {
  publishers: IPublisher[]
  onEdit: (pub: IPublisher) => void
  onDelete: (id?: string) => void
}

export function PublishersTable(props: IProps) {
  const { publishers, onEdit, onDelete } = props

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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Ar tikrai norite ištrinti?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Bus pašalinta leidykla: <strong>{pub.name}</strong>.
                          Šio veiksmo atšaukti negalėsite.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Atšaukti</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onDelete(pub.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                          Ištrinti
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
