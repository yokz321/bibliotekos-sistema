import { z } from "zod"

export const subscriberSchema = z.object({
  firstName: z
    .string()
    .min(2, "Vardas per trumpas, min 2 raidės")
    .max(32, "Vardas per ilgas, max 32 raidės"),
  lastName: z
    .string()
    .min(2, "Pavardė per trumpa, min 2 raidės")
    .max(32, "Pavardė per ilga, max 32 raidės"),
  email: z.string().email("Neteisingas el. pašto formatas"),
  ticketNumber: z.string().min(1, "Bilieto numeris privalomas"),
  phone: z
    .string()
    .min(8, "Numeris per trumpas, min 8 skaičiai")
    .max(20, "Numeris per ilgas, max 20 skaičių")
    .optional()
    .or(z.literal("")),
})

export type SubscriberDTO = z.infer<typeof subscriberSchema>
