import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { IPublisher } from "@/types/book-t"

type IReturnType = WithStringId<IPublisher>

const PublisherSchema = new Schema<IPublisher>(
  {
    name: { type: String, required: true },
    location: { type: String },
  },
  {
    timestamps: true,
    collection: "publishers",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: IPublisher & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Publisher: Model<IPublisher> =
  models.Publisher || model("Publisher", PublisherSchema)
