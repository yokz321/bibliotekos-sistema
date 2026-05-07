import { Author } from "@/models/author-model"
import { IAuthor } from "@/types/book-t"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class AuthorService {
  async getAll(): Promise<IAuthor[]> {
    await connectMongoose()
    const authors = await Author.find().sort({ lastName: 1 }).lean()

    return authors.map((author: any) => ({
      ...author,
      id: author._id.toString(),
      _id: author._id.toString(),
    })) as unknown as IAuthor[]
  }

  async save(author: Omit<IAuthor, "id">): Promise<void> {
    await connectMongoose()

    const existing = await Author.findOne({
      firstName: { $regex: new RegExp(`^${author.firstName}$`, "i") },
      lastName: { $regex: new RegExp(`^${author.lastName}$`, "i") },
    })
    if (existing) throw new Error("Toks autorius jau egzistuoja!")

    await Author.create(author)
  }

  async update(author: IAuthor): Promise<void> {
    await connectMongoose()

    const { id, ...updateData } = author

    await Author.updateOne({ _id: new Types.ObjectId(id) }, updateData)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Author.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
