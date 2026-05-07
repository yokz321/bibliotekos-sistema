import { z } from "zod"

export const bookSchema = z.object({
  title: z.string().min(1, "Pavadinimas privalomas"),
  authorId: z.string().min(1, "Pasirinkite autorių"),
  publisherId: z.string().min(1, "Pasirinkite leidyklą"),
  inventoryNumber: z.string().min(1, "Inventorinis numeris privalomas"),
  isbn: z.string().optional().default(""),
  price: z.coerce.number().min(0, "Kaina turi būti teigiamas skaičius"),
  year: z.coerce
    .number()
    .min(1000, "Metai per maži")
    .max(new Date().getFullYear(), "Metai negali būti ateityje"),
  annotation: z.string().optional().default(""),
})

export type BookDTO = z.infer<typeof bookSchema>
