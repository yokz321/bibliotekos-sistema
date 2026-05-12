import { Borrowing } from "@/models/borrowing-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"
import type { BorrowingDTO } from "@/dto/borrowing-dto"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

export class BorrowingService {
  async getAll(): Promise<IBorrowingPopulated[]> {
    await connectMongoose()
    const results = await Borrowing.find()
      .populate("bookId")
      .populate("subscriberId")
      .sort({ createdAt: -1 })
      .lean()

    return JSON.parse(JSON.stringify(results)) as IBorrowingPopulated[]
  }

  async save(data: BorrowingDTO): Promise<void> {
    await connectMongoose()

    const today = new Date()

    const overdueBorrowing = await Borrowing.findOne({
      subscriberId: new Types.ObjectId(data.subscriberId),
      isReturned: false,
      dueDate: { $lt: today },
    })

    if (overdueBorrowing) {
      throw new Error(
        "Abonentas negali pasiimti naujos knygos, nes turi vėluojančių negrąžintų knygų!"
      )
    }

    await Borrowing.create({
      subscriberId: new Types.ObjectId(data.subscriberId),
      bookId: new Types.ObjectId(data.bookId),
      borrowDate: new Date(data.borrowDate),
      dueDate: new Date(data.dueDate),
      isReturned: data.isReturned,
    })
  }

  async returnBook(id: string): Promise<void> {
    await connectMongoose()

    await Borrowing.updateOne(
      { _id: new Types.ObjectId(id) },
      {
        isReturned: true,
        returnDate: new Date(),
      }
    )
  }

  async delete(id: string): Promise<void> {
    await connectMongoose()
    await Borrowing.deleteOne({ _id: new Types.ObjectId(id) })
  }
}
