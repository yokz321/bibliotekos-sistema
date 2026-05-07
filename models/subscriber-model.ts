import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface ISubscriber {
  id?: string
  ticketNumber: string
  firstName: string
  lastName: string
  city: string
  street: string
  houseNumber: string
  apartmentNumber?: string
  phone: string
}

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
