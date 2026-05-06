import { Book, IBook } from "@/models/book-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class BookService {
  async getAll(): Promise<IBook[]> {
    await connectMongoose()
    return await Book.find()
      .populate("author")
      .populate("publisher")
      .sort({ title: 1 })
  }

  async save(book: IBook): Promise<void> {
    await connectMongoose()
    await Book.create(book)
  }

  async update(book: IBook): Promise<void> {
    await connectMongoose()
    const id = book.id ?? ""
    delete book.id
    await Book.updateOne({ _id: new Types.ObjectId(id) }, book)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Book.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
