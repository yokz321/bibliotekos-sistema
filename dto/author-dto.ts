import { z } from "zod"

export const authorSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "Vardas per trumpas, min 2 simboliai")
    .max(50, "Vardas per ilgas, max 50 simbolių"),
  lastName: z
    .string()
    .trim()
    .min(2, "Pavardė per trumpa, min 2 simboliai")
    .max(50, "Pavardė per ilga, max 50 simbolių"),
  biography: z
    .string()
    .trim()
    .max(1000, "Biografija negali viršyti 1000 simbolių")
    .optional()
    .or(z.literal("")),
})

export type AuthorDTO = z.infer<typeof authorSchema>
