"use server"

import { AuthorService } from "@/services/author-service"
import { authorSchema } from "@/dto/author-dto"
import { revalidatePath } from "next/cache"

export async function saveAuthorAction(data: any, id?: string) {
  const parse = authorSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Blogai užpildyti laukeliai!" }
  }

  const authorService = new AuthorService()
  try {
    if (id) {
      await authorService.update({ ...parse.data, id })
    } else {
      await authorService.save(parse.data)
    }
    revalidatePath("/authors")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message || "Serverio klaida" }
  }
}
