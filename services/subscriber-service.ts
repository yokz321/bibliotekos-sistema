import { Subscriber } from "@/models/subscriber-model"
import { ISubscriber } from "@/types/subscriber-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class SubscriberService {
  async getAll(): Promise<ISubscriber[]> {
    await connectMongoose()
    const subscribers = await Subscriber.find().sort({ lastName: 1 }).lean()
    return subscribers.map((sub: any) => ({
      ...sub,
      id: sub._id.toString(),
      _id: sub._id.toString(),
    })) as unknown as ISubscriber[]
  }

  async save(subscriber: Omit<ISubscriber, "id">): Promise<void> {
    await connectMongoose()
    await Subscriber.create(subscriber)
  }

  async update(subscriber: ISubscriber): Promise<void> {
    await connectMongoose()
    const { id, ...updateData } = subscriber
    await Subscriber.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Subscriber.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
