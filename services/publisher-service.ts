import { Publisher, IPublisher } from "@/models/publisher-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class PublisherService {
  async getAll(): Promise<IPublisher[]> {
    await connectMongoose()
    return await Publisher.find().sort({ createdAt: -1 })
  }

  async save(publisher: IPublisher): Promise<void> {
    await connectMongoose()

    const existing = await Publisher.findOne({
      name: { $regex: new RegExp(`^${publisher.name}$`, "i") },
    })
    if (existing) throw new Error("Tokia leidykla jau egzistuoja!")

    await Publisher.create(publisher)
  }

  async update(publisher: IPublisher): Promise<void> {
    await connectMongoose()
    const id = publisher.id ?? ""

    const existing = await Publisher.findOne({
      name: { $regex: new RegExp(`^${publisher.name}$`, "i") },
      _id: { $ne: new Types.ObjectId(id) },
    })
    if (existing) throw new Error("Leidykla tokiu pavadinimu jau egzistuoja!")

    delete publisher.id
    await Publisher.updateOne({ _id: new Types.ObjectId(id) }, publisher)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Publisher.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
