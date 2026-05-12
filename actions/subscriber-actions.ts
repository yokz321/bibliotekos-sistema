"use server"

import { SubscriberService } from "@/services/subscriber-service"
import { subscriberSchema, type SubscriberDTO } from "@/dto/subscriber-dto"
import { revalidatePath } from "next/cache"
import type { IState } from "@/types/shared-t"

export async function saveSubscriberAction(
  data: SubscriberDTO,
  id?: string
): Promise<IState> {
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
    return {
      success: true,
      message: id ? "Atnaujinta sėkmingai" : "Pridėta sėkmingai",
    }
  } catch (error) {
    let message = "Serverio klaida"
    if (error instanceof Error) message = error.message
    return { success: false, error: message }
  }
}

export async function deleteSubscriberAction(id: string): Promise<IState> {
  const service = new SubscriberService()
  try {
    await service.delete(id)
    revalidatePath("/subscribers")
    return { success: true, message: "Abonentas pašalintas" }
  } catch {
    return { success: false, error: "Nepavyko ištrinti abonento" }
  }
}

export async function getNextTicketNumberAction(): Promise<string> {
  const service = new SubscriberService()
  return await service.getNextTicketNumber()
}
