import { z } from "zod"

export const subscriberSchema = z.object({
  ticketNumber: z.string().min(1, "Abonento numeris privalomas"),
  firstName: z.string().trim().min(2, "Vardas per trumpas"),
  lastName: z.string().trim().min(2, "Pavardė per trumpa"),
  city: z.string().trim().min(1, "Miestas privalomas"),
  street: z.string().trim().min(1, "Gatvė privaloma"),
  houseNumber: z.string().trim().min(1, "Namo numeris privalomas"),
  apartmentNumber: z.string().trim().optional().or(z.literal("")),
  phone: z.string().trim().min(4, "Telefonas privalomas"),
  subscriberType: z.string().min(1, "Pasirinkite tipą"),
  isActive: z.boolean(),
})

export type SubscriberDTO = z.infer<typeof subscriberSchema>
