import { Publisher, IPublisher } from "@/models/publisher-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class PublisherService {
  async getAll(): Promise<IPublisher[]> {
    await connectMongoose()
    const publishers = await Publisher.find().sort({ createdAt: -1 })
    return publishers
  }

  async save(publisher: IPublisher): Promise<void> {
    await connectMongoose()
    await Publisher.create(publisher)
  }

  async update(publisher: IPublisher): Promise<void> {
    await connectMongoose()
    const id = publisher.id ?? ""
    delete publisher.id
    await Publisher.updateOne({ _id: new Types.ObjectId(id) }, publisher)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Publisher.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
