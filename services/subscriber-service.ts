import { Subscriber } from "@/models/subscriber-model"
import type { ISubscriber, ILeanSubscriber } from "@/types/subscriber-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class SubscriberService {
  private async checkUniqueness(
    data: Omit<ISubscriber, "id">,
    id?: string
  ): Promise<void> {
    const query: Record<string, unknown> = {
      firstName: { $regex: new RegExp(`^${data.firstName}$`, "i") },
      lastName: { $regex: new RegExp(`^${data.lastName}$`, "i") },
      city: { $regex: new RegExp(`^${data.city}$`, "i") },
      street: { $regex: new RegExp(`^${data.street}$`, "i") },
      houseNumber: data.houseNumber,
    }
    if (id) {
      query._id = { $ne: new Types.ObjectId(id) }
    }

    const existing = await Subscriber.findOne(query)
    if (existing) {
      throw new Error("Asmuo su tokiu vardu, pavarde ir adresu jau egzistuoja!")
    }
  }

  async getAll(): Promise<ISubscriber[]> {
    await connectMongoose()
    const subscribers = (await Subscriber.find()
      .sort({ lastName: 1 })
      .lean()) as unknown as ILeanSubscriber[]

    return subscribers.map((sub) => ({
      ...sub,
      id: sub._id.toString(),
    }))
  }

  async save(dto: Omit<ISubscriber, "id">): Promise<void> {
    await connectMongoose()
    await this.checkUniqueness(dto)
    await Subscriber.create(dto)
  }

  async update(dto: ISubscriber): Promise<void> {
    await connectMongoose()
    const { id, ...updateData } = dto
    if (!id) throw new Error("Atnaujinimui reikalingas ID")

    await this.checkUniqueness(updateData, id)
    await Subscriber.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Subscriber.deleteOne({ _id: new Types.ObjectId(id) })
  }

  async getNextTicketNumber(): Promise<string> {
    await connectMongoose()
    const lastSub = await Subscriber.findOne().sort({ ticketNumber: -1 }).lean()
    if (!lastSub || !lastSub.ticketNumber) return "1001"
    const nextNumber = parseInt(lastSub.ticketNumber, 10) + 1
    return isNaN(nextNumber) ? "1001" : nextNumber.toString()
  }
}
