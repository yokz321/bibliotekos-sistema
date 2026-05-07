"use server"

import { PublisherService } from "@/services/publisher-service"
import { publisherSchema } from "@/dto/publisher-dto"
import { revalidatePath } from "next/cache"
import { IPublisher } from "@/types/book-t"

export async function savePublisherAction(data: any, id?: string) {
  const parsed = publisherSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: "Validacijos klaida" }

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
  } catch (error: any) {
    return { success: false, error: error.message || "Serverio klaida" }
  }
}

export async function deletePublisherAction(id: string) {
  const service = new PublisherService()
  try {
    await service.delete(id)
    revalidatePath("/publishers")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Nepavyko pašalinti leidyklos" }
  }
}
