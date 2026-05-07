import { Publisher } from "@/models/publisher-model"
import { IPublisher } from "@/types/book-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

type LeanPublisher = {
  _id: Types.ObjectId
  name: string
  location?: string
}

export class PublisherService {
  async getAll(): Promise<IPublisher[]> {
    await connectMongoose()

    const publishers = (await Publisher.find()
      .sort({ name: 1 })
      .lean()) as unknown as LeanPublisher[]

    return publishers.map((pub) => ({
      ...pub,
      id: pub._id.toString(),
    })) as IPublisher[]
  }

  async save(publisher: Omit<IPublisher, "id">): Promise<void> {
    await connectMongoose()

    const existing = await Publisher.findOne({
      name: { $regex: new RegExp(`^${publisher.name}$`, "i") },
    })
    if (existing) throw new Error("Tokia leidykla jau egzistuoja!")

    await Publisher.create(publisher)
  }

  async update(publisher: IPublisher): Promise<void> {
    await connectMongoose()

    const { id, ...updateData } = publisher

    if (!id) throw new Error("Atnaujinimui reikalingas ID")

    await Publisher.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Publisher.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
