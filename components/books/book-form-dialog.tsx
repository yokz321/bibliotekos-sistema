"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { saveBookAction } from "@/actions/book-actions"
import { bookSchema, type BookDTO } from "@/dto/book-dto"
import { BookFormFields } from "./book-form-fields"
import type { IBook } from "@/types/book-t"
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { ICategory, ILanguage } from "@/types/metadata-t"

type IProps = {
  isOpen: boolean
  onOpenChange: (v: boolean) => void
  editingBook: IBook | undefined
  authors: IAuthor[]
  publishers: IPublisher[]
  categories: ICategory[]
  languages: ILanguage[]
  onSuccess: (msg?: string) => void
}

export function BookFormDialog(props: IProps) {
  const {
    isOpen,
    onOpenChange,
    editingBook,
    authors,
    publishers,
    categories,
    languages,
    onSuccess,
  } = props

  const form = useForm<BookDTO>({
    resolver: zodResolver(bookSchema),
    mode: "onBlur",
    values: editingBook
      ? {
          title: editingBook.title,
          authorId: editingBook.author?.id || "",
          publisherId: editingBook.publisher?.id || "",
          inventoryNumber: editingBook.inventoryNumber,
          isbn: editingBook.isbn || "",
          price: editingBook.price,
          year: editingBook.year,
          annotation: editingBook.annotation ?? "",
          category: editingBook.category || "",
          language: editingBook.language || "",
          pageCount: editingBook.pageCount || 0,
        }
      : {
          title: "",
          authorId: "",
          publisherId: "",
          inventoryNumber: "",
          isbn: "",
          price: 0,
          year: new Date().getFullYear(),
          annotation: "",
          category: "",
          language: "",
          pageCount: 0,
        },
  })

  async function onSubmit(values: BookDTO) {
    const res = await saveBookAction(values, editingBook?.id)

    if (res.success) {
      toast.success(res.message || "Operacija sėkminga")
      onSuccess(res.message)
    } else {
      form.setError("root", { type: "server", message: res.error })
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editingBook ? "Redaguoti knygą" : "Pridėti knygą"}
          </DialogTitle>
          <DialogDescription className="hidden">
            Užpildykite duomenis.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <BookFormFields
              form={form}
              authors={authors}
              publishers={publishers}
              categories={categories}
              languages={languages}
              isSubmitting={isSubmitting}
            />

            {rootError && (
              <div className="p-2 mt-4 text-sm text-red-600 bg-red-100 rounded-md">
                {rootError.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6 bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saugoma..." : "Išsaugoti"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
