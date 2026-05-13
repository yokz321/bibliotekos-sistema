import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { ISubscriberType } from "@/types/metadata-t"

type IReturnType = WithStringId<ISubscriberType>

const SubscriberTypeSchema = new Schema<ISubscriberType>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: "subscriber_types",
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        doc: unknown,
        ret: ISubscriberType & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const SubscriberType: Model<ISubscriberType> =
  models.SubscriberType || model("SubscriberType", SubscriberTypeSchema)
