import { Book } from "@/models/book-model"
import { Author } from "@/models/author-model"
import { Publisher } from "@/models/publisher-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"
import type { IBook, ILeanPopulatedBook } from "@/types/book-t"
import type { BookDTO } from "@/dto/book-dto"
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"

type ITotalValueResult = {
  total: number
}

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
      category: dto.category,
      language: dto.language,
      pageCount: dto.pageCount,
    }
  }

  private mapBook(book: ILeanPopulatedBook): IBook {
    const { _id, author, publisher, ...rest } = book

    const mappedAuthor: IAuthor =
      author && author._id
        ? {
            id: author._id.toString(),
            firstName: author.firstName,
            lastName: author.lastName,
            biography: author.biography,
          }
        : { id: "", firstName: "Nežinomas", lastName: "Autorius" }

    const mappedPublisher: IPublisher =
      publisher && publisher._id
        ? {
            id: publisher._id.toString(),
            name: publisher.name,
            location: publisher.location,
          }
        : { id: "", name: "Nenurodyta" }

    return {
      ...rest,
      id: _id.toString(),
      author: mappedAuthor,
      publisher: mappedPublisher,
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

      return books.map((book) => this.mapBook(book))
    } catch (error) {
      console.error("KLAIDA BOOK SERVICE:", error)
      throw error
    }
  }

  async getInventoryReport(filters: {
    authorId?: string
    publisherId?: string
  }): Promise<IBook[]> {
    await connectMongoose()

    const query: Record<string, unknown> = {}

    if (filters.authorId) {
      query.author = new Types.ObjectId(filters.authorId)
    }

    if (filters.publisherId) {
      query.publisher = new Types.ObjectId(filters.publisherId)
    }

    const books = (await Book.find(query)
      .populate({ path: "author", model: Author })
      .populate({ path: "publisher", model: Publisher })
      .sort({ title: 1 })
      .lean()) as unknown as ILeanPopulatedBook[]

    return books.map((book) => this.mapBook(book))
  }

  async getBookCountByAuthor(authorId: string): Promise<number> {
    await connectMongoose()
    return await Book.countDocuments({
      author: new Types.ObjectId(authorId),
    })
  }

  async getTotalLibraryValue(): Promise<number> {
    await connectMongoose()
    const result = (await Book.aggregate([
      {
        $group: {
          _id: undefined,
          total: { $sum: "$price" },
        },
      },
    ])) as ITotalValueResult[]

    const firstResult = result[0]
    if (firstResult) {
      return firstResult.total
    }

    return 0
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
