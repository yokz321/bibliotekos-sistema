import { z } from "zod"

export const bookSchema = z.object({
  title: z.string().min(1, "Pavadinimas privalomas"),
  authorId: z.string().min(1, "Pasirinkite autorių"),
  publisherId: z.string().min(1, "Pasirinkite leidyklą"),
  inventoryNumber: z.string().min(1, "Inventorinis numeris privalomas"),
  isbn: z.string(),
  price: z.number().min(0, "Kaina turi būti teigiamas skaičius"),
  year: z.number().min(1000).max(new Date().getFullYear()),
  annotation: z.string(),
  category: z.string().min(1, "Pasirinkite kategoriją"),
  language: z.string().min(1, "Pasirinkite kalbą"),
  pageCount: z.number().min(1, "Puslapių skaičius turi būti bent 1"),
})

export type BookDTO = z.infer<typeof bookSchema>
