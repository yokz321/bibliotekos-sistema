import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { ISubscriber } from "@/types/subscriber-t"

type IReturnType = WithStringId<ISubscriber>

const SubscriberSchema = new Schema<ISubscriber>(
  {
    ticketNumber: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    city: { type: String, required: true },
    street: { type: String, required: true },
    houseNumber: { type: String, required: true },
    apartmentNumber: { type: String },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "subscribers",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ISubscriber & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Subscriber: Model<ISubscriber> =
  models.Subscriber || model("Subscriber", SubscriberSchema)
