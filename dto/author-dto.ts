import { z } from "zod"

export const authorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Vardas per trumpas, min 3 simboliai")
    .max(50, "Vardas per ilgas, max 50 simbolių"),
  biography: z
    .string()
    .trim()
    .max(1000, "Biografija negali viršyti 1000 simbolių")
    .optional()
    .or(z.literal("")),
})

export type AuthorDTO = z.infer<typeof authorSchema>
