import { Borrowing, type IBorrowing } from "@/models/borrowing-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"

export class BorrowingService {
  async getAll() {
    await connectMongoose()

    const results = await Borrowing.find()
      .populate("bookId")
      .populate("subscriberId")
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(results))
  }

  async save(data: Omit<IBorrowing, "id">) {
    await connectMongoose()

    return await Borrowing.create(data)
  }

  async returnBook(id: string) {
    await connectMongoose()

    await Borrowing.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        isReturned: true,
        returnDate: new Date(),
      }
    )
  }

  async delete(id: string) {
    await connectMongoose()
    await Borrowing.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
