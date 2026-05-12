"use server"

import { PublisherService } from "@/services/publisher-service"
import { publisherSchema, type PublisherDTO } from "@/dto/publisher-dto"
import { revalidatePath } from "next/cache"
import type { IPublisher } from "@/types/publisher-t"
import type { IState } from "@/types/shared-t"

export async function savePublisherAction(
  data: PublisherDTO,
  id?: string
): Promise<IState> {
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
    return { success: true, message: "Leidykla išsaugota" }
  } catch (error: unknown) {
    let errorMessage = "Serverio klaida"
    if (error instanceof Error) errorMessage = error.message
    return { success: false, error: errorMessage }
  }
}

export async function deletePublisherAction(id: string): Promise<IState> {
  const service = new PublisherService()
  try {
    await service.delete(id)
    revalidatePath("/publishers")
    return { success: true, message: "Leidykla pašalinta" }
  } catch {
    return { success: false, error: "Nepavyko pašalinti leidyklos" }
  }
}
