import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IBorrowing {
  id?: string
  bookId: any
  subscriberId: any
  borrowDate: Date
  returnDate?: Date
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
    borrowDate: { type: Date, default: Date.now },
    returnDate: { type: Date },
  },
  {
    collection: "borrowings",
    toJSON: {
      transform: (_doc, ret): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Borrowing: Model<IBorrowing> =
  models.Borrowing || model("Borrowing", BorrowingSchema)
