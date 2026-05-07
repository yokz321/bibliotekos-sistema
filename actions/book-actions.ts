"use server"

import { BookService } from "@/services/book-service"
import { bookSchema, type BookDTO } from "@/dto/book-dto"
import { revalidatePath } from "next/cache"

export async function saveBookAction(data: BookDTO, id?: string) {
  const parse = bookSchema.safeParse(data)

  if (!parse.success) {
    const firstError = parse.error.issues[0]?.message || "Neteisingi duomenys"
    return { success: false, error: firstError }
  }

  const validatedData = parse.data
  const bookService = new BookService()

  const dbData = {
    ...validatedData,
    author: validatedData.authorId,
    publisher: validatedData.publisherId,
  }

  try {
    if (id) {
      await bookService.update({ ...dbData, id })
    } else {
      await bookService.save(dbData)
    }
    revalidatePath("/books")
    return { success: true }
  } catch (error: unknown) {
    console.error("KLAIDA SAUGANT KNYGĄ:", error)
    let errorMessage = "Serverio klaida"
    if (error instanceof Error) errorMessage = error.message
    return { success: false, error: errorMessage }
  }
}

export async function deleteBookAction(id: string) {
  const bookService = new BookService()
  try {
    await bookService.delete(id)
    revalidatePath("/books")
    return { success: true }
  } catch (error: unknown) {
    console.error("KLAIDA TRINANT KNYGĄ:", error)
    return { success: false, error: "Nepavyko ištrinti knygos" }
  }
}
