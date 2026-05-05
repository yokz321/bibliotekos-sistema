import { z } from "zod"

export const authorSchema = z.object({
  name: z
    .string()
    .min(3, "Vardas turi būti bent 3 simbolių.")
    .max(50, "Vardas per ilgas."),
  biography: z
    .string()
    .max(500, "Biografija negali viršyti 500 simbolių.")
    .optional()
    .or(z.literal("")),
})

export type AuthorDTO = z.infer<typeof authorSchema>
