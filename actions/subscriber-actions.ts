"use server"

import { SubscriberService } from "@/services/subscriber-service"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const subscriberSchema = z.object({
  firstName: z.string().min(1, "Vardas privalomas"),
  lastName: z.string().min(1, "Pavardė privaloma"),
  email: z.string().email("Neteisingas el. paštas"),
  address: z.string().min(1, "Adresas privalomas"),
  ticketNumber: z.string().min(1, "Bilieto numeris privalomas"),
  phone: z.string().optional(),
})

export async function saveSubscriberAction(data: any, id?: string) {
  const parse = subscriberSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Užpildykite visus privalomus laukus!" }
  }

  const service = new SubscriberService()
  try {
    if (id) {
      await service.update({ ...parse.data, id })
    } else {
      await service.save(parse.data)
    }
    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}

export async function deleteSubscriberAction(id: string) {
  const service = new SubscriberService()
  try {
    await service.delete(id)
    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Klaida šalinant" }
  }
}
