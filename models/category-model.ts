import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { ICategory } from "@/types/metadata-t"

type IReturnType = WithStringId<ICategory>

const CategorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: "categories",
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        doc: unknown,
        ret: ICategory & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Category: Model<ICategory> =
  models.Category || model("Category", CategorySchema)
