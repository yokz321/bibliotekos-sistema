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
import { deleteAuthorAction } from "@/actions/author-actions"
import { IAuthor } from "@/types/book-t"

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

interface Props {
  items: IAuthor[]
  onEdit: (author: IAuthor) => void
  onSuccess: () => void
}

export function AuthorList({ items, onEdit, onSuccess }: Props) {
  const [deletingId, setDeletingId] = useState<string | undefined>(undefined)
  const executeDelete = async (id?: string) => {
    if (!id) return

    setDeletingId(id)
    const res = await deleteAuthorAction(id)
    if (res.success) {
      toast.success("Autorius pašalintas")
      onSuccess()
    } else {
      toast.error(res.error || "Klaida šalinant")
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
        {items.map((author) => (
          <TableRow key={author.id}>
            <TableCell className="font-medium flex items-center gap-2">
              <UserCircle2 className="h-4 w-4 text-orange-600" />
              {author.firstName} {author.lastName}
            </TableCell>
            <TableCell>{author.biography || "-"}</TableCell>
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
                      Šis veiksmas pašalins autorių {author.firstName}{" "}
                      {author.lastName} iš sistemos.
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
        ))}
      </TableBody>
    </Table>
  )
}
