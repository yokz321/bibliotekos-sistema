import { z } from "zod"

export const borrowingSchema = z
  .object({
    subscriberId: z.string().min(1, "Pasirinkite abonentą"),
    bookId: z.string().min(1, "Pasirinkite knygą"),
    borrowDate: z.string().min(1, "Pasiėmimo data privaloma"),
    dueDate: z.string().min(1, "Grąžinimo terminas privalomas"),
    isReturned: z.boolean(),
  })
  .refine(
    (data) => {
      const borrow = new Date(data.borrowDate)
      const due = new Date(data.dueDate)

      const minYear = 2000
      const maxYear = 2100

      return (
        borrow.getFullYear() >= minYear &&
        borrow.getFullYear() <= maxYear &&
        due.getFullYear() >= minYear &&
        due.getFullYear() <= maxYear
      )
    },
    {
      message: "Įveskite logišką datą (metai nuo 2000 iki 2100)",
      path: ["borrowDate"],
    }
  )
  .refine(
    (data) => {
      const borrow = new Date(data.borrowDate)
      const due = new Date(data.dueDate)
      return due >= borrow
    },
    {
      message: "Terminas negali būti ankstesnis už pasiėmimo datą",
      path: ["dueDate"],
    }
  )

export type BorrowingDTO = z.infer<typeof borrowingSchema>
