import { Schema, model, models, type Types, type Model } from "mongoose"
import type { WithStringId } from "./model-t"
import type { IAuthor, IPublisher } from "@/types/book-t"

export interface IBook {
  id?: string
  title: string
  author: Types.ObjectId | IAuthor
  publisher: Types.ObjectId | IPublisher
  year: number
  isbn?: string
  inventoryNumber: string
  price: number
  annotation?: string
}

type IReturnType = WithStringId<IBook>

const BookSchema = new Schema<IBook>(
  {
    title: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
    publisher: {
      type: Schema.Types.ObjectId,
      ref: "Publisher",
      required: true,
    },
    year: { type: Number, required: true },
    isbn: { type: String },
    inventoryNumber: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    annotation: { type: String },
  },
  {
    timestamps: true,
    collection: "books",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        doc: unknown,
        ret: IBook & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Book: Model<IBook> = models.Book || model("Book", BookSchema)
