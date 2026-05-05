"use server"

import { revalidatePath } from "next/cache"
import { mongooseConnect } from "@/lib/mongoose"
import { Subscriber } from "@/models/subscriber"
import { z } from "zod"
import type { Subscriber as SubscriberType } from "@/types/subscriber-t"

const subscriberSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  ticketNumber: z.string().min(1),
  phone: z.string().optional(),
})

export async function getSubscribers(): Promise<SubscriberType[]> {
  await mongooseConnect()
  const data = await Subscriber.find().sort({ createdAt: -1 }).lean()
  return JSON.parse(JSON.stringify(data))
}

export async function saveSubscriber(
  data: z.infer<typeof subscriberSchema>,
  id?: string
) {
  const parsed = subscriberSchema.safeParse(data)
  if (!parsed.success) return { success: false, error: "Validacijos klaida" }
  try {
    await mongooseConnect()
    if (id) await Subscriber.findByIdAndUpdate(id, parsed.data)
    else await Subscriber.create(parsed.data)
    revalidatePath("/abonentai")
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Serverio klaida" }
  }
}

export async function deleteSubscriber(id: string) {
  try {
    await mongooseConnect()
    await Subscriber.findByIdAndDelete(id)
    revalidatePath("/abonentai")
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message || "Klaida šalinant" }
  }
}
