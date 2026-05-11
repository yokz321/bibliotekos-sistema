import { z } from "zod"

export const borrowingSchema = z.object({
  subscriberId: z.string().min(1, "Pasirinkite abonentą"),
  bookId: z.string().min(1, "Pasirinkite knygą"),
  borrowDate: z.string().min(1, "Pasiėmimo data privaloma"),
  dueDate: z.string().min(1, "Grąžinimo terminas privalomas"),
  isReturned: z.boolean(),
})

export type BorrowingDTO = z.infer<typeof borrowingSchema>
