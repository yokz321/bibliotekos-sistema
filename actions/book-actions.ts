"use server"

import { BookService } from "@/services/book-service"
import { revalidatePath } from "next/cache"

export async function saveBookAction(data: any, id?: string) {
  // Čia gali pridėti BookSchema validaciją, jei ją turi
  const bookService = new BookService()

  try {
    if (id) {
      await bookService.update({ ...data, id })
    } else {
      await bookService.save(data)
    }
    revalidatePath("/books")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Klaida išsaugant knygą" }
  }
}

export async function deleteBookAction(id: string) {
  const bookService = new BookService()
  try {
    await bookService.delete(id)
    revalidatePath("/books")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Klaida šalinant knygą" }
  }
}
