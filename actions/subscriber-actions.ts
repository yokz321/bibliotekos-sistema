"use server"

import { SubscriberService } from "@/services/subscriber-service"
import { revalidatePath } from "next/cache"

export async function saveSubscriberAction(data: any, id?: string) {
  const service = new SubscriberService()
  try {
    if (id) {
      await service.update({ ...data, id })
    } else {
      await service.save(data)
    }
    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Klaida išsaugant abonentą" }
  }
}

export async function deleteSubscriberAction(id: string) {
  const service = new SubscriberService()
  try {
    await service.delete(id)
    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Klaida šalinant abonentą" }
  }
}
