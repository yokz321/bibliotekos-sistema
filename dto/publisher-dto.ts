import { z } from "zod"

export const publisherSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Leidyklos pavadinimas per trumpas, min 2 simboliai")
    .max(64, "Pavadinimas per ilgas, max 64 simboliai"),
  location: z
    .string()
    .trim()
    .min(2, "Miestas/Adresas per trumpas, min 2 simboliai")
    .max(100, "Adresas per ilgas, max 100 simbolių")
    .optional()
    .or(z.literal("")),
})

export type PublisherDTO = z.infer<typeof publisherSchema>
