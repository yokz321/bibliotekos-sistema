import { z } from "zod"

export const bookSchema = z.object({
  inventoryNumber: z.string().min(1, "Privaloma"),
  isbn: z.string().min(1, "Privaloma"),
  title: z.string().min(1, "Privaloma"),
  authorId: z.string().min(1, "Pasirinkite autorių"),
  publisherId: z.string().min(1, "Pasirinkite leidyklą"),
  price: z.coerce.number().min(0),
  year: z.coerce.number().min(1000).max(new Date().getFullYear()),
  annotation: z.string().optional().or(z.literal("")),
})

export type BookDTO = z.infer<typeof bookSchema>
