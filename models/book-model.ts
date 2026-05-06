import mongoose, { Schema, model, models, Types, Model } from "mongoose"
import { WithStringId } from "./model-t"

export interface IBook {
  id?: string
  title: string
  author: any
  publisher: any
  year: number
  isbn?: string
  summary?: string
  pages?: number
  quantity?: number
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
    isbn: { type: String, unique: true, sparse: true },
    summary: { type: String },
    pages: { type: Number },
    quantity: { type: Number, default: 1 },
  },
  {
    timestamps: true,
    collection: "books",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IBook & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Book: Model<IBook> = models.Book || model("Book", BookSchema)
