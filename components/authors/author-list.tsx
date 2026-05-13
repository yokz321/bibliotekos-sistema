"use client"

import { useState } from "react"
import { toast } from "sonner"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2, UserCircle2 } from "lucide-react"
import { deleteApi } from "@/utils/server-api"
import type { IAuthor } from "@/types/author-t"

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
  items: IAuthor[]
  onEdit: (author: IAuthor) => void
  onSuccess: () => void
}

export function AuthorList(props: IProps) {
  const { items, onEdit, onSuccess } = props

  const [deletingId, setDeletingId] = useState<string | undefined>(undefined)

  const executeDelete = async (id?: string) => {
    if (!id) return

    setDeletingId(id)

    const success = await deleteApi("/api/authors", id)

    if (success) {
      toast.success("Autorius pašalintas")
      onSuccess()
    } else {
      toast.error("Nepavyko pašalinti autoriaus")
    }

    setDeletingId(undefined)
  }

  return (
    <Table>
      <TableHeader className="bg-muted/50">
        <TableRow>
          <TableHead>Autorius</TableHead>
          <TableHead>Biografija</TableHead>
          <TableHead className="text-right">Veiksmai</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((author) => {
          const fullName = `${author.firstName} ${author.lastName}`
          const biographyText = author.biography || "-"

          return (
            <TableRow key={author.id}>
              <TableCell className="font-medium flex items-center gap-2">
                <UserCircle2 className="h-4 w-4 text-orange-600" />
                {fullName}
              </TableCell>
              <TableCell>{biographyText}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(author)}
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      disabled={deletingId === author.id}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Ar tikrai norite ištrinti?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Šis veiksmas pašalins autorių {fullName} iš sistemos.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Atšaukti</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => executeDelete(author.id)}
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
        })}
      </TableBody>
    </Table>
  )
}
