import { Subscriber } from "@/models/subscriber-model"
import type { ISubscriber } from "@/types/subscriber-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

type LeanSubscriber = ISubscriber & { _id: Types.ObjectId }

export class SubscriberService {
  async getAll(): Promise<ISubscriber[]> {
    await connectMongoose()

    const subscribers = (await Subscriber.find()
      .sort({ lastName: 1 })
      .lean()) as unknown as LeanSubscriber[]

    return subscribers.map((sub) => ({
      ...sub,
      id: sub._id.toString(),
    })) as ISubscriber[]
  }

  async save(subscriber: Omit<ISubscriber, "id">): Promise<void> {
    await connectMongoose()
    await Subscriber.create(subscriber)
  }

  async update(subscriber: ISubscriber): Promise<void> {
    await connectMongoose()

    const { id, ...updateData } = subscriber

    if (!id) throw new Error("Atnaujinimui reikalingas ID")

    await Subscriber.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Subscriber.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
