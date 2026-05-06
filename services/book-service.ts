import { Book, IBook } from "@/models/book-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class BookService {
  async getAll(): Promise<IBook[]> {
    await connectMongoose()
    return await Book.find()
      .populate("author")
      .populate("publisher")
      .sort({ createdAt: -1 })
  }

  async save(data: IBook): Promise<void> {
    await connectMongoose()
    await Book.create(data)
  }

  async update(id: string, data: IBook): Promise<void> {
    await connectMongoose()
    const objectId = new Types.ObjectId(id)
    await Book.updateOne({ _id: objectId }, data)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Book.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
