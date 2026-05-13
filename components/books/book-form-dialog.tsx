"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/parts/text-field"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { saveBookAction } from "@/actions/book-actions"
import { bookSchema, type BookDTO } from "@/dto/book-dto"
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
          price: editingBook.price || 0,
          year: editingBook.year || new Date().getFullYear(),
          annotation: editingBook.annotation || "",
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

  const onSubmit = async (values: BookDTO) => {
    const res = await saveBookAction(values, editingBook?.id)

    if (res.success) {
      toast.success(res.message || "Operacija sėkminga")
      onSuccess(res.message)
    } else {
      form.setError("root", { type: "server", message: res.error })
    }
  }

  const dialogTitle = editingBook ? "Redaguoti knygą" : "Pridėti naują knygą"
  const isSubmitting = form.formState.isSubmitting
  const submitButtonText = isSubmitting ? "Saugoma..." : "Išsaugoti"
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="hidden">
            Užpildykite knygos duomenis.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
            noValidate
          >
            <TextField
              control={form.control}
              name="title"
              label="Pavadinimas"
              placeholder="Knygos pavadinimas"
              disabled={isSubmitting}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="authorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Autorius</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pasirinkite autorių" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {authors.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.firstName} {a.lastName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="publisherId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leidykla</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pasirinkite leidyklą" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {publishers.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kategorija / Žanras</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pasirinkite kategoriją" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kalba</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pasirinkite kalbą" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {languages.map((lang) => (
                          <SelectItem key={lang.id} value={lang.name}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <TextField
                control={form.control}
                name="inventoryNumber"
                label="Inv. Nr."
                disabled={isSubmitting}
              />

              <FormField
                control={form.control}
                name="pageCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Puslapiai</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Kaina</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Leidimo metai</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value, 10) || 0)
                        }
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <TextField
                control={form.control}
                name="isbn"
                label="ISBN"
                disabled={isSubmitting}
              />
            </div>

            <TextField
              control={form.control}
              name="annotation"
              label="Anotacija"
              placeholder="Trumpas knygos aprašymas"
              disabled={isSubmitting}
            />

            {rootError && (
              <div className="p-2 text-sm text-red-600 bg-red-100 rounded-md">
                {rootError.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {submitButtonText}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
