"use server"

import { SubscriberService } from "@/services/subscriber-service"
import { subscriberSchema, type SubscriberDTO } from "@/dto/subscriber-dto"
import { revalidatePath } from "next/cache"
import { connectMongoose } from "@/utils/mongoose-client"
import { Subscriber } from "@/models/subscriber-model"
import { ISubscriber } from "@/types/subscriber-t"

export async function saveSubscriberAction(data: SubscriberDTO, id?: string) {
  const parse = subscriberSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Užpildykite visus privalomus laukus!" }
  }
  const dto = parse.data

  await connectMongoose()

  try {
    const query: Record<string, unknown> = {
      firstName: { $regex: new RegExp(`^${dto.firstName}$`, "i") },
      lastName: { $regex: new RegExp(`^${dto.lastName}$`, "i") },
      city: { $regex: new RegExp(`^${dto.city}$`, "i") },
      street: { $regex: new RegExp(`^${dto.street}$`, "i") },
      houseNumber: dto.houseNumber,
    }

    if (id) {
      query._id = { $ne: id }
    }

    const existingPerson = await Subscriber.findOne(query)
    if (existingPerson) {
      return {
        success: false,
        error: "Asmuo su tokiu vardu, pavarde ir adresu jau egzistuoja!",
      }
    }

    const ticketQuery: Record<string, unknown> = {
      ticketNumber: dto.ticketNumber,
    }

    if (id) {
      ticketQuery._id = { $ne: id }
    }

    const existingTicket = await Subscriber.findOne(ticketQuery)
    if (existingTicket) {
      return { success: false, error: "Abonento numeris jau užimtas!" }
    }

    const service = new SubscriberService()
    if (id) {
      const toUpdate: ISubscriber = { ...dto, id }
      await service.update(toUpdate)
    } else {
      await service.save(dto)
    }

    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: unknown) {
    console.error("KLAIDA SAUGANT ABONENTĄ:", error)

    let errorMessage = "Serverio klaida"
    if (error instanceof Error) {
      errorMessage = error.message
    }

    return { success: false, error: errorMessage }
  }
}

export async function deleteSubscriberAction(id: string) {
  const service = new SubscriberService()
  try {
    await service.delete(id)
    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: unknown) {
    console.error("KLAIDA TRINANT ABONENTĄ:", error)
    return { success: false, error: "Nepavyko ištrinti abonento" }
  }
}

export async function getNextTicketNumberAction(): Promise<string> {
  await connectMongoose()
  const lastSub = await Subscriber.findOne().sort({ ticketNumber: -1 }).lean()

  if (!lastSub || !lastSub.ticketNumber) {
    return "1001"
  }

  const nextNumber = parseInt(lastSub.ticketNumber, 10) + 1
  return isNaN(nextNumber) ? "1001" : nextNumber.toString()
}
