import { Publisher } from "@/models/publisher-model"
import { IPublisher } from "@/types/book-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class PublisherService {
  async getAll(): Promise<IPublisher[]> {
    await connectMongoose()
    const publishers = await Publisher.find().sort({ name: 1 }).lean()

    return publishers.map((pub: any) => ({
      ...pub,
      id: pub._id.toString(),
      _id: pub._id.toString(),
    })) as unknown as IPublisher[]
  }
  async save(publisher: Omit<IPublisher, "id">): Promise<void> {
    await connectMongoose()
    await Publisher.create(publisher)
  }

  async update(publisher: IPublisher): Promise<void> {
    await connectMongoose()
    const { id, ...updateData } = publisher
    await Publisher.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Publisher.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
