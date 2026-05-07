import { Book } from "@/models/book-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"
import { IBook, IAuthor, IPublisher } from "@/types/book-t"

type LeanPopulatedBook = Omit<IBook, "author" | "publisher"> & {
  _id: Types.ObjectId
  author?: IAuthor & { _id: Types.ObjectId }
  publisher?: IPublisher & { _id: Types.ObjectId }
}

export class BookService {
  async getAll(): Promise<IBook[]> {
    await connectMongoose()

    const books = (await Book.find()
      .populate("author")
      .populate("publisher")
      .sort({ title: 1 })
      .lean()) as unknown as LeanPopulatedBook[]

    return books.map((book) => ({
      ...book,
      id: book._id.toString(),
      author: book.author
        ? {
            ...book.author,
            id: book.author._id.toString(),
          }
        : undefined,
      publisher: book.publisher
        ? {
            ...book.publisher,
            id: book.publisher._id.toString(),
          }
        : undefined,
    })) as unknown as IBook[]
  }

  async save(book: Omit<IBook, "id">): Promise<void> {
    await connectMongoose()
    await Book.create(book)
  }

  async update(book: IBook): Promise<void> {
    await connectMongoose()

    const { id, ...updateData } = book

    if (!id) throw new Error("Atnaujinimui reikalingas ID")

    await Book.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Book.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
