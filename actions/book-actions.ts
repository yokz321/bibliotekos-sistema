"use server"

import { BookService } from "@/services/book-service"
import { revalidatePath } from "next/cache"

export async function saveBookAction(formData: any, id?: string) {
  const bookService = new BookService()

  const data = {
    title: formData.title,
    author: formData.authorId || formData.author,
    publisher: formData.publisherId || formData.publisher,
    year: Number(formData.year),
    isbn: formData.isbn,
    inventoryNumber: formData.inventoryNumber || "",
    price: Number(formData.price) || 0,
    annotation: formData.annotation || "",
  }

  try {
    if (id) {
      await bookService.update({ ...data, id })
    } else {
      await bookService.save(data)
    }
    revalidatePath("/books")
    return { success: true }
  } catch (error: any) {
    console.error("KLAIDA SAUGANT:", error.message)
    return { success: false, error: "Nepavyko išsaugoti knygos" }
  }
}

export async function deleteBookAction(id: string) {
  const bookService = new BookService()
  try {
    await bookService.delete(id)
    revalidatePath("/books")
    return { success: true }
  } catch (error: any) {
    console.error("KLAIDA TRINANT:", error.message)
    return { success: false, error: "Nepavyko ištrinti knygos" }
  }
}
