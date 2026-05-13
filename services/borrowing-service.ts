import { Borrowing } from "@/models/borrowing-model"
import { connectMongoose } from "@/utils/mongoose-client"
import { Types } from "mongoose"
import type { BorrowingDTO } from "@/dto/borrowing-dto"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"
import type {
  IBorrowingPopulated,
  IPopularBook,
  ILateSubscriber,
} from "@/types/borrowing-t"

type LeanResult = {
  _id: Types.ObjectId
  bookId?: { _id: Types.ObjectId; title: string; inventoryNumber: string }
  subscriberId?: {
    _id: Types.ObjectId
    firstName: string
    lastName: string
    ticketNumber: string
  }
  borrowDate: Date
  dueDate: Date
  returnDate?: Date
  isReturned: boolean
}

export class BorrowingService {
  private mapResult(result: LeanResult): IBorrowingPopulated {
    const { _id, bookId, subscriberId, ...rest } = result

    const mappedBook = bookId
      ? ({
          ...bookId,
          id: bookId._id.toString(),
        } as unknown as IBook)
      : undefined

    const mappedSubscriber = subscriberId
      ? ({
          ...subscriberId,
          id: subscriberId._id.toString(),
        } as unknown as ISubscriber)
      : undefined

    return {
      ...rest,
      id: _id.toString(),
      bookId: mappedBook,
      subscriberId: mappedSubscriber,
      borrowDate: rest.borrowDate.toISOString(),
      dueDate: rest.dueDate.toISOString(),
      returnDate: rest.returnDate?.toISOString(),
    }
  }

  async getAll(): Promise<IBorrowingPopulated[]> {
    await connectMongoose()
    const results = await Borrowing.find()
      .populate("bookId")
      .populate("subscriberId")
      .sort({ createdAt: -1 })
      .lean()

    const leanResults = results as unknown as LeanResult[]
    return leanResults.map((result) => this.mapResult(result))
  }

  async getReportData(filters: {
    subscriberId?: string
    bookId?: string
    onlyOverdue?: boolean
  }): Promise<IBorrowingPopulated[]> {
    await connectMongoose()
    const query: Record<string, unknown> = {}

    if (filters.subscriberId && filters.subscriberId.length === 24) {
      query.subscriberId = new Types.ObjectId(filters.subscriberId)
    }

    if (filters.bookId && filters.bookId.length === 24) {
      query.bookId = new Types.ObjectId(filters.bookId)
    }

    if (filters.onlyOverdue) {
      query.isReturned = false
      query.dueDate = { $lt: new Date() }
    }

    const results = await Borrowing.find(query)
      .populate("bookId")
      .populate("subscriberId")
      .sort({ dueDate: 1 })
      .lean()

    const leanResults = results as unknown as LeanResult[]
    return leanResults.map((result) => this.mapResult(result))
  }

  async getMostBorrowedBooks(): Promise<IPopularBook[]> {
    await connectMongoose()
    const results = await Borrowing.aggregate([
      { $group: { _id: "$bookId", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookInfo",
        },
      },
      { $unwind: "$bookInfo" },
    ])

    return results.map((res) => ({
      id: (res._id as Types.ObjectId).toString(),
      title: (res.bookInfo.title as string) || "Nežinoma",
      borrowCount: (res.borrowCount as number) || 0,
    }))
  }

  async getFrequentLateReturners(): Promise<ILateSubscriber[]> {
    await connectMongoose()
    const today = new Date()

    const results = await Borrowing.aggregate([
      {
        $match: {
          $or: [
            { isReturned: false, dueDate: { $lt: today } },
            { $expr: { $gt: ["$returnDate", "$dueDate"] } },
          ],
        },
      },
      { $group: { _id: "$subscriberId", lateCount: { $sum: 1 } } },
      { $sort: { lateCount: -1 } },
      {
        $lookup: {
          from: "subscribers",
          localField: "_id",
          foreignField: "_id",
          as: "subInfo",
        },
      },
      { $unwind: "$subInfo" },
    ])

    return results.map((res) => ({
      id: (res._id as Types.ObjectId).toString(),
      firstName: (res.subInfo.firstName as string) || "",
      lastName: (res.subInfo.lastName as string) || "",
      ticketNumber: (res.subInfo.ticketNumber as string) || "",
      lateCount: (res.lateCount as number) || 0,
    }))
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
