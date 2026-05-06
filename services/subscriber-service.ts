import { Subscriber, ISubscriber } from "@/models/subscriber-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class SubscriberService {
  async getAll(): Promise<ISubscriber[]> {
    await connectMongoose()
    const subscribers = await Subscriber.find().sort({ lastName: 1 })
    return subscribers
  }

  async save(subscriber: ISubscriber): Promise<void> {
    await connectMongoose()
    await Subscriber.create(subscriber)
  }

  async update(subscriber: ISubscriber): Promise<void> {
    await connectMongoose()
    const id = subscriber.id ?? ""
    delete subscriber.id
    await Subscriber.updateOne({ _id: new Types.ObjectId(id) }, subscriber)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Subscriber.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
