"use server"

import { SubscriberService } from "@/services/subscriber-service"
import { subscriberSchema } from "@/dto/subscriber-dto"
import { revalidatePath } from "next/cache"
import { connectMongoose } from "@/utils/mongoose-client"
import { Subscriber } from "@/models/subscriber-model"

export async function saveSubscriberAction(data: any, id?: string) {
  const parse = subscriberSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Užpildykite visus privalomus laukus!" }
  }
  const dto = parse.data

  await connectMongoose()

  try {
    const query: any = {
      firstName: { $regex: new RegExp(`^${dto.firstName}$`, "i") },
      lastName: { $regex: new RegExp(`^${dto.lastName}$`, "i") },
      city: { $regex: new RegExp(`^${dto.city}$`, "i") },
      street: { $regex: new RegExp(`^${dto.street}$`, "i") },
      houseNumber: dto.houseNumber,
    }

    if (id) query._id = { $ne: id }

    const existingPerson = await Subscriber.findOne(query)
    if (existingPerson) {
      return {
        success: false,
        error: "Asmuo su tokiu vardu, pavarde ir adresu jau egzistuoja!",
      }
    }

    const ticketQuery: any = { ticketNumber: dto.ticketNumber }
    if (id) ticketQuery._id = { $ne: id }

    const existingTicket = await Subscriber.findOne(ticketQuery)
    if (existingTicket) {
      return { success: false, error: "Abonento numeris jau užimtas!" }
    }

    const service = new SubscriberService()
    if (id) {
      await service.update({ ...dto, id })
    } else {
      await service.save(dto)
    }

    revalidatePath("/subscribers")
    return { success: true }
  } catch (error: any) {
    return { success: false, error: "Serverio klaida: " + error.message }
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

export async function getNextTicketNumberAction() {
  await connectMongoose()
  const lastSub = await Subscriber.findOne().sort({ ticketNumber: -1 }).lean()

  if (!lastSub || !lastSub.ticketNumber) return "1001"

  const nextNumber = parseInt(lastSub.ticketNumber, 10) + 1
  return isNaN(nextNumber) ? "1001" : nextNumber.toString()
}
