import { z } from "zod"

export const citySchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Miesto pavadinimas per trumpas, min 2 simboliai")
    .max(50, "Miesto pavadinimas per ilgas, max 50 simbolių"),
})

export type CityDTO = z.infer<typeof citySchema>
