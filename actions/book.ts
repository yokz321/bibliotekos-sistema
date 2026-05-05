"use server"

import { revalidatePath } from "next/cache"
import { mongooseConnect } from "@/lib/mongoose"
import { Book } from "@/models/book"
import { z } from "zod"

const BookSchema = z.object({
  title: z.string().min(1, "Pavadinimas privalomas"),
  author: z.string().min(1, "Pasirinkite autorių"),
  publisher: z.string().min(1, "Pasirinkite leidyklą"),
  year: z.coerce.number().int().min(1000).max(new Date().getFullYear()),
  isbn: z.string().optional(),
  summary: z.string().optional(),
  pages: z.coerce.number().optional(),
  quantity: z.coerce.number().optional(),
})

export async function createBook(formData: FormData) {
  const parsed = BookSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { success: false, error: "Validacijos klaida" }

  try {
    await mongooseConnect()
    const { isbn, ...data } = parsed.data
    if (isbn && (await Book.findOne({ isbn }))) {
      return { success: false, error: "Knyga su šiuo ISBN jau egzistuoja" }
    }
    await Book.create({ ...data, isbn })
    revalidatePath("/knygos")
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Serverio klaida" }
  }
}

export async function updateBook(id: string, formData: FormData) {
  const parsed = BookSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) return { success: false, error: "Validacijos klaida" }

  try {
    await mongooseConnect()
    const { isbn, ...data } = parsed.data
    if (isbn && (await Book.findOne({ isbn, _id: { $ne: id } }))) {
      return { success: false, error: "Knyga su šiuo ISBN jau egzistuoja" }
    }
    await Book.findByIdAndUpdate(id, { ...data, isbn })
    revalidatePath("/knygos")
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Serverio klaida" }
  }
}

export async function deleteBook(id: string) {
  try {
    await mongooseConnect()
    await Book.findByIdAndDelete(id)
    revalidatePath("/knygos")
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Klaida šalinant" }
  }
}
