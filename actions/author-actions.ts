"use server"

import { authorSchema, AuthorDTO } from "@/dto/author-dto"
import { mongooseConnect } from "@/utils/mongoose-client"
import { Author } from "@/models/author-model"
import { revalidatePath } from "next/cache"

// ✅ Sukūrimas / Atnaujinimas
export async function saveAuthor(
  data: AuthorDTO,
  id?: string
): Promise<{ success: boolean; error?: string }> {
  const parsed = authorSchema.safeParse(data)
  if (!parsed.success) {
    return { success: false, error: "Validacijos klaida" }
  }

  try {
    await mongooseConnect()
    if (id) {
      await Author.findByIdAndUpdate(id, parsed.data)
    } else {
      await Author.create(parsed.data)
    }
    revalidatePath("/authors") // ⚠️ Pakeisk į savo maršrutą, pvz. "/autoriai"
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Serverio klaida" }
  }
}

// ✅ Šalinimas
export async function deleteAuthor(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    await mongooseConnect()
    await Author.findByIdAndDelete(id)
    revalidatePath("/authors") // ⚠️ Pakeisk į savo maršrutą
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Klaida šalinant autorių" }
  }
}

// ✅ Duomenų gavimas Server Component'ui
export async function getAuthors() {
  await mongooseConnect()
  const authors = await Author.find().sort({ createdAt: -1 }).lean()
  // Serializacija būtina, kad Server Component galėtų perduoti duomenis klientui
  return JSON.parse(JSON.stringify(authors)) as Array<{
    _id: string
    name: string
    biography?: string
  }>
}
