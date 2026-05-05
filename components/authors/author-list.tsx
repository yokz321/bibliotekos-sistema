"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { deleteAuthor } from "@/actions/author-actions"

interface Author {
  _id: string
  name: string
  biography?: string
}

interface Props {
  items: Author[]
  onEdit: (author: Author) => void
}

export function AuthorList({ items, onEdit }: Props) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Ar tikrai norite pašalinti šį autorių?")) return
    setDeletingId(id)
    const res = await deleteAuthor(id)
    if (res.success) {
      toast.success("Autorius pašalintas")
      router.refresh() // Sinchronizuoja UI su serveriu po revalidatePath
    } else {
      toast.error(res.error || "Klaida šalinant")
    }
    setDeletingId(null)
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
          <TableRow key={author._id}>
            <TableCell className="font-medium flex items-center gap-2">
              <UserCircle2 className="h-4 w-4 text-orange-600" />
              {author.name}
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
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDelete(author._id)}
                disabled={deletingId === author._id}
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
