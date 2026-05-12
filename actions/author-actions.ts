"use server"

import { AuthorService } from "@/services/author-service"
import { authorSchema, type AuthorDTO } from "@/dto/author-dto"
import { revalidatePath } from "next/cache"
import type { IAuthor } from "@/types/book-t"
import type { IState } from "@/types/shared-t"

export async function saveAuthorAction(
  data: AuthorDTO,
  id?: string
): Promise<IState> {
  const parse = authorSchema.safeParse(data)

  if (!parse.success) {
    const errorMessage =
      parse.error.issues[0]?.message || "Blogai užpildyti laukeliai!"
    return { success: false, error: errorMessage }
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
    return { success: true, message: "Autorius sėkmingai išsaugotas" }
  } catch (error: unknown) {
    let message = "Serverio klaida"
    if (error instanceof Error) message = error.message
    return { success: false, error: message }
  }
}

export async function deleteAuthorAction(id: string): Promise<IState> {
  const authorService = new AuthorService()
  try {
    await authorService.delete(id)
    revalidatePath("/authors")
    return { success: true, message: "Autorius pašalintas" }
  } catch (error: unknown) {
    console.error("KLAIDA TRINANT AUTORIŲ:", error)

    let message = "Nepavyko pašalinti autoriaus"
    if (error instanceof Error) message = error.message

    return { success: false, error: message }
  }
}
