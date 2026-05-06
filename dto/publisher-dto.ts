import { z } from "zod"

export const publisherSchema = z.object({
  name: z.string().min(1, "Pavadinimas yra privalomas!").trim(),
  location: z.string().optional().or(z.literal("")),
})

export type PublisherDTO = z.infer<typeof publisherSchema>
