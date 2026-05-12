import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { IAuthor } from "@/types/author-t"

type IReturnType = WithStringId<IAuthor>

const AuthorSchema = new Schema<IAuthor>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    biography: { type: String },
  },
  {
    timestamps: true,
    collection: "authors",
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        doc: unknown,
        ret: IAuthor & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Author: Model<IAuthor> =
  models.Author || model("Author", AuthorSchema)
