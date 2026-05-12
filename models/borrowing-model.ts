import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"

export type IBorrowing = {
  id?: string
  bookId: Types.ObjectId | IBook
  subscriberId: Types.ObjectId | ISubscriber
  borrowDate: Date
  dueDate: Date
  returnDate?: Date
  isReturned: boolean
}

type IReturnType = WithStringId<IBorrowing>

const BorrowingSchema = new Schema<IBorrowing>(
  {
    bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
    subscriberId: {
      type: Schema.Types.ObjectId,
      ref: "Subscriber",
      required: true,
    },
    borrowDate: { type: Date, default: Date.now, required: true },
    dueDate: { type: Date, required: true },
    returnDate: { type: Date },
    isReturned: { type: Boolean, default: false, required: true },
  },
  {
    timestamps: true,
    collection: "borrowings",
    toJSON: {
      virtuals: true,
      transform: (
        doc: unknown,
        ret: IBorrowing & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Borrowing: Model<IBorrowing> =
  models.Borrowing || model("Borrowing", BorrowingSchema)
