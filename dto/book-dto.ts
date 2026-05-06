import { z } from "zod"

export const bookSchema = z.object({
  inventoryNumber: z
    .string()
    .trim()
    .min(3, "Inventorinis numeris per trumpas, min 3 simboliai"),
  isbn: z.string().trim().min(10, "ISBN kodas turi turėti bent 10 simbolių"),
  title: z
    .string()
    .trim()
    .min(1, "Knygos pavadinimas privalomas")
    .max(200, "Pavadinimas per ilgas"),
  authorId: z.string().min(1, "Pasirinkite autorių iš sąrašo"),
  publisherId: z.string().min(1, "Pasirinkite leidyklą iš sąrašo"),
  price: z.coerce.number().min(0.01, "Kaina turi būti didesnė už 0"),
  year: z.coerce
    .number()
    .min(1000, "Metai negali būti mažesni nei 1000")
    .max(new Date().getFullYear(), "Metai negali būti ateityje"),
  annotation: z
    .string()
    .trim()
    .max(2000, "Anotacija per ilga")
    .optional()
    .or(z.literal("")),
})

export type BookDTO = z.infer<typeof bookSchema>
