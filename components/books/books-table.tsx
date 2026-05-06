"use client"

import { BookOpen, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { Book } from "@/types/book-t"

interface Props {
  books: Book[]
  onEdit: (book: Book) => void
  onDelete: (id: string) => void
}

export function BooksTable({ books, onEdit, onDelete }: Props) {
  return (
    <Card className="overflow-hidden border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[300px]">Pavadinimas</TableHead>
            <TableHead>Autorius</TableHead>
            <TableHead>Leidykla</TableHead>
            <TableHead className="text-center">Metai</TableHead>
            <TableHead className="text-right">Veiksmai</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center py-10 text-muted-foreground text-sm italic"
              >
                Knygų fondo sąrašas tuščias
              </TableCell>
            </TableRow>
          ) : (
            books.map((book) => (
              <TableRow
                key={book._id}
                className="hover:bg-muted/50 transition-colors"
              >
                <TableCell className="font-semibold flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-orange-600" />
                  {book.title}
                </TableCell>
                <TableCell>{book.author?.name || "Nežinomas"}</TableCell>
                <TableCell>{book.publisher?.name || "Nenurodyta"}</TableCell>
                <TableCell className="text-center">{book.year}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-blue-600 h-8 w-8"
                      onClick={() => onEdit(book)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive h-8 w-8"
                      onClick={() => onDelete(book._id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
