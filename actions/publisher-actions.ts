"use server"

import { PublisherService } from "@/services/publisher-service"
import { publisherSchema } from "@/dto/publisher-dto"
import { revalidatePath } from "next/cache"

export async function savePublisherAction(data: any, id?: string) {
  const parsed = publisherSchema.safeParse(data)

  if (!parsed.success) {
    const flatErrors = parsed.error.flatten()
    const firstErrorMessage = Object.values(flatErrors.fieldErrors).flat()[0]

    return {
      success: false,
      error: firstErrorMessage || "Validacijos klaida",
    }
  }

  const service = new PublisherService()
  try {
    if (id) {
      await service.update({ ...parsed.data, id })
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
