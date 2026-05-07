"use server"

import { AuthorService } from "@/services/author-service"
import { authorSchema, AuthorDTO } from "@/dto/author-dto"
import { revalidatePath } from "next/cache"
import { IAuthor } from "@/types/book-t"

export async function saveAuthorAction(data: AuthorDTO, id?: string) {
  const parse = authorSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Blogai užpildyti laukeliai!" }
  }

  const authorService = new AuthorService()
  try {
    if (id) {
      const authorToUpdate: IAuthor = { ...parse.data, id }
      await authorService.update(authorToUpdate)
    } else {
      await authorService.save(parse.data)
    }
    revalidatePath("/authors")
    return { success: true }
  } catch (error: unknown) {
    let message = "Serverio klaida"
    if (error instanceof Error) message = error.message
    return { success: false, error: message }
  }
}

export async function deleteAuthorAction(id: string) {
  const authorService = new AuthorService()
  try {
    await authorService.delete(id)
    revalidatePath("/authors")
    return { success: true }
  } catch (error: any) {
    console.error("KLAIDA TRINANT AUTORIŲ:", error.message)
    return { success: false, error: "Nepavyko pašalinti autoriaus" }
  }
}
