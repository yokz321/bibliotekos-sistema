"use server"

import { Author } from "@/models/Author"
import { mongooseConnect } from "@/lib/mongoose"
import { revalidatePath } from "next/cache"

export async function getAuthors() {
  await mongooseConnect()
  const data = await Author.find().sort({ createdAt: -1 })
  return JSON.parse(JSON.stringify(data))
}

export async function saveAuthor(data: any, id?: string) {
  await mongooseConnect()
  if (id) {
    await Author.findByIdAndUpdate(id, data)
  } else {
    await Author.create(data)
  }
  revalidatePath("/authors") // Atnaujina puslapį be useEffect!
}

export async function deleteAuthor(id: string) {
  await mongooseConnect()
  await Author.findByIdAndDelete(id)
  revalidatePath("/authors")
}
