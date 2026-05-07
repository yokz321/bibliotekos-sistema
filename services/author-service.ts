import { Author, IAuthor } from "@/models/author-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class AuthorService {
  async getAll(): Promise<IAuthor[]> {
    await connectMongoose()
    return await Author.find().sort({ lastName: 1 })
  }

  async save(author: IAuthor): Promise<void> {
    await connectMongoose()

    await Author.syncIndexes()

    const existing = await Author.findOne({
      firstName: { $regex: new RegExp(`^${author.firstName}$`, "i") },
      lastName: { $regex: new RegExp(`^${author.lastName}$`, "i") },
    })
    if (existing) throw new Error("Toks autorius jau egzistuoja!")

    await Author.create(author)
  }

  async update(author: IAuthor): Promise<void> {
    await connectMongoose()
    const id = author.id ?? ""
    delete author.id
    await Author.updateOne({ _id: new Types.ObjectId(id) }, author)
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Author.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
