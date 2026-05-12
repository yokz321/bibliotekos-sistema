"use server"

import { BookService } from "@/services/book-service"
import { bookSchema, type BookDTO } from "@/dto/book-dto"
import { revalidatePath } from "next/cache"
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

  const service = new BookService()
  try {
    if (id) {
      await service.update(id, parse.data)
    } else {
      await service.save(parse.data)
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
  const service = new BookService()
  try {
    await service.delete(id)
    revalidatePath("/books")
    return { success: true, message: "Knyga sėkmingai pašalinta" }
  } catch {
    return { success: false, error: "Nepavyko ištrinti knygos" }
  }
}
