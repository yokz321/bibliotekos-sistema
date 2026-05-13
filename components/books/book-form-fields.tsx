"use client"

import type { UseFormReturn } from "react-hook-form"
import { TextField } from "@/components/parts/text-field"
import { SelectField } from "@/components/parts/select-field"
import { NumberField } from "@/components/parts/number-field"
import type { BookDTO } from "@/dto/book-dto"
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { ICategory, ILanguage } from "@/types/metadata-t"

type IProps = {
  form: UseFormReturn<BookDTO>
  authors: IAuthor[]
  publishers: IPublisher[]
  categories: ICategory[]
  languages: ILanguage[]
  isSubmitting: boolean
}

export function BookFormFields(props: IProps) {
  const { form, authors, publishers, categories, languages, isSubmitting } =
    props

  return (
    <div className="space-y-4 pt-4">
      <TextField
        control={form.control}
        name="title"
        label="Pavadinimas"
        disabled={isSubmitting}
      />

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          control={form.control}
          name="authorId"
          label="Autorius"
          disabled={isSubmitting}
          options={authors.map((a) => ({
            value: a.id,
            label: `${a.firstName} ${a.lastName}`,
          }))}
        />
        <SelectField
          control={form.control}
          name="publisherId"
          label="Leidykla"
          disabled={isSubmitting}
          options={publishers.map((p) => ({ value: p.id, label: p.name }))}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          control={form.control}
          name="category"
          label="Kategorija / Žanras"
          disabled={isSubmitting}
          options={categories.map((c) => ({ value: c.name, label: c.name }))}
        />
        <SelectField
          control={form.control}
          name="language"
          label="Kalba"
          disabled={isSubmitting}
          options={languages.map((l) => ({ value: l.name, label: l.name }))}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextField
          control={form.control}
          name="inventoryNumber"
          label="Inv. Nr."
          disabled={isSubmitting}
        />
        <NumberField
          control={form.control}
          name="pageCount"
          label="Puslapiai"
          disabled={isSubmitting}
        />
        <NumberField
          control={form.control}
          name="price"
          label="Kaina"
          isFloat
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <NumberField
          control={form.control}
          name="year"
          label="Metai"
          disabled={isSubmitting}
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
        placeholder="Trumpas aprašymas"
        disabled={isSubmitting}
      />
    </div>
  )
}
