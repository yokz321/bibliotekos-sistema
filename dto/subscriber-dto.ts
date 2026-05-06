import { z } from "zod"

export const subscriberSchema = z.object({
  firstName: z.string().min(2, "Vardas per trumpas"),
  lastName: z.string().min(2, "Pavardė per trumpa"),
  address: z.string().min(5, "Adresas privalomas"),
  rentedBooks: z
    .array(
      z.object({
        bookId: z.string().min(1, "Pasirinkite knygą"),
        borrowDate: z.string().min(1, "Data privaloma"),
      })
    )
    .optional(),
})
