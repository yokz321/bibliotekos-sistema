import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface IAuthor {
  id?: string
  name: string
  biography?: string
}

type IReturnType = WithStringId<IAuthor>

const AuthorSchema = new Schema<IAuthor>(
  {
    name: { type: String, required: true },
    biography: { type: String },
  },
  {
    timestamps: true,
    collection: "authors",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
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
