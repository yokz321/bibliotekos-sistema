"use server"

import { BookService } from "@/services/book-service"
import { bookSchema, type BookDTO } from "@/dto/book-dto"
import { revalidatePath } from "next/cache"
import type { IBook } from "@/types/book-t"
import type { IState } from "@/types/shared-t"

export async function saveBookAction(
  data: BookDTO,
  id?: string
): Promise<IState> {
  const parse = bookSchema.safeParse(data)

  if (!parse.success) {
    const firstError = parse.error.issues[0]?.message || "Neteisingi duomenys"
    return { success: false, error: firstError }
  }

  const validatedData = parse.data
  const bookService = new BookService()

  const dbData = {
    title: validatedData.title,
    author: validatedData.authorId,
    publisher: validatedData.publisherId,
    inventoryNumber: validatedData.inventoryNumber,
    isbn: validatedData.isbn,
    price: validatedData.price,
    year: validatedData.year,
    annotation: validatedData.annotation,
  } as unknown as IBook

  try {
    if (id) {
      await bookService.update({ ...dbData, id })
    } else {
      await bookService.save(dbData)
    }
    revalidatePath("/books")
    return { success: true, message: "Knyga sėkmingai išsaugota" }
  } catch (error: unknown) {
    let errorMessage = "Serverio klaida"
    if (error instanceof Error) errorMessage = error.message
    return { success: false, error: errorMessage }
  }
}

export async function deleteBookAction(id: string): Promise<IState> {
  const bookService = new BookService()
  try {
    await bookService.delete(id)
    revalidatePath("/books")
    return { success: true, message: "Knyga sėkmingai pašalinta" }
  } catch {
    return { success: false, error: "Nepavyko ištrinti knygos" }
  }
}
