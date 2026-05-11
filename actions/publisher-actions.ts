"use server"

import { PublisherService } from "@/services/publisher-service"
import { publisherSchema, type PublisherDTO } from "@/dto/publisher-dto"
import { revalidatePath } from "next/cache"
import type { IPublisher } from "@/types/book-t"

export async function savePublisherAction(data: PublisherDTO, id?: string) {
  const parsed = publisherSchema.safeParse(data)

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Validacijos klaida"
    return { success: false, error: firstError }
  }

  const service = new PublisherService()

  try {
    if (id) {
      const toUpdate: IPublisher = { ...parsed.data, id }
      await service.update(toUpdate)
    } else {
      await service.save(parsed.data)
    }

    revalidatePath("/publishers")
    return { success: true }
  } catch (error: unknown) {
    console.error("KLAIDA SAUGANT LEIDYKLĄ:", error)

    let errorMessage = "Serverio klaida"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return { success: false, error: errorMessage }
  }
}

export async function deletePublisherAction(id: string) {
  const service = new PublisherService()
  try {
    await service.delete(id)
    revalidatePath("/publishers")
    return { success: true }
  } catch (error: unknown) {
    console.error("KLAIDA TRINANT LEIDYKLĄ:", error)
    return { success: false, error: "Nepavyko pašalinti leidyklos" }
  }
}
