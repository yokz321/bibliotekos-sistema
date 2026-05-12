import { Book } from "@/models/book-model"
import { Author } from "@/models/author-model"
import { Publisher } from "@/models/publisher-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"
import type { IBook, ILeanPopulatedBook } from "@/types/book-t"
import type { BookDTO } from "@/dto/book-dto"

export class BookService {
  private mapDtoToDb(dto: BookDTO) {
    return {
      title: dto.title,
      author: new Types.ObjectId(dto.authorId),
      publisher: new Types.ObjectId(dto.publisherId),
      inventoryNumber: dto.inventoryNumber,
      isbn: dto.isbn,
      price: dto.price,
      year: dto.year,
      annotation: dto.annotation,
    }
  }

  async getAll(): Promise<IBook[]> {
    try {
      await connectMongoose()
      const books = (await Book.find()
        .populate({ path: "author", model: Author })
        .populate({ path: "publisher", model: Publisher })
        .sort({ title: 1 })
        .lean()) as unknown as ILeanPopulatedBook[]

      return books.map((book) => ({
        ...book,
        id: book._id.toString(),
        author:
          book.author && book.author._id
            ? { ...book.author, id: book.author._id.toString() }
            : undefined,
        publisher:
          book.publisher && book.publisher._id
            ? { ...book.publisher, id: book.publisher._id.toString() }
            : undefined,
      })) as unknown as IBook[]
    } catch (error) {
      console.error("KLAIDA BOOK SERVICE:", error)
      throw error
    }
  }

  async save(dto: BookDTO): Promise<void> {
    await connectMongoose()
    const dbData = this.mapDtoToDb(dto)
    await Book.create(dbData)
  }

  async update(id: string, dto: BookDTO): Promise<void> {
    await connectMongoose()
    const dbData = this.mapDtoToDb(dto)
    await Book.updateOne({ _id: new Types.ObjectId(id) }, dbData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Book.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
