"use client"

import { BookOpen, Pencil, Trash2, Languages, Tag } from "lucide-react"
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
import type { IBook } from "@/types/book-t"

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
  books: IBook[]
  onEdit: (book: IBook) => void
  onDelete: (id?: string) => void
  isReadOnly?: boolean
}

export function BooksTable(props: IProps) {
  const { books, onEdit, onDelete, isReadOnly = false } = props

  return (
    <Card className="overflow-hidden border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="w-[250px]">Pavadinimas</TableHead>
            <TableHead>Autorius</TableHead>
            <TableHead>Kategorija</TableHead>
            <TableHead>Kalba</TableHead>
            <TableHead className="text-center">Metai</TableHead>
            {!isReadOnly && (
              <TableHead className="text-right">Veiksmai</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {books.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={isReadOnly ? 5 : 6}
                className="text-center py-10 text-muted-foreground text-sm italic"
              >
                Knygų fondo sąrašas tuščias
              </TableCell>
            </TableRow>
          ) : (
            books.map((book) => {
              const authorName = book.author
                ? `${book.author.firstName} ${book.author.lastName}`
                : "Nežinomas"

              return (
                <TableRow
                  key={book.id}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell className="font-semibold">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-orange-600 shrink-0" />
                      <span className="line-clamp-1">{book.title}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">{authorName}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Tag className="h-3 w-3" />
                      {book.category}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Languages className="h-3 w-3" />
                      {book.language}
                    </div>
                  </TableCell>
                  <TableCell className="text-center text-sm">
                    {book.year}
                  </TableCell>

                  {!isReadOnly && (
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

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive h-8 w-8"
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
                                Knyga <strong>{book.title}</strong> bus
                                pašalinta iš bibliotekos fondo.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Atšaukti</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onDelete(book.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Ištrinti
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  )}
                </TableRow>
              )
            })
          )}
        </TableBody>
      </Table>
    </Card>
  )
}
