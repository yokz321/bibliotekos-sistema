"use client"
import { deleteAuthorAction } from "@/actions/author-actions"
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
import { toast } from "sonner"

interface Author {
  id?: string
  firstName: string
  lastName: string
  biography?: string
}

interface Props {
  items: Author[]
  onEdit: (author: Author) => void
}

export function AuthorList({ items, onEdit }: Props) {
  const handleDelete = async (id?: string) => {
    if (!id || !confirm("Trinti?")) return
    const res = await deleteAuthorAction(id)
    if (res.success) toast.success("Pašalinta")
  }

  return (
    <Table>
      <TableHeader>
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
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(author)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(author.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
