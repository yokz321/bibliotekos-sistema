import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IAuthor {
  id?: string
  firstName: string
  lastName: string
  biography?: string
}

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
      transform: (
        _doc,
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
