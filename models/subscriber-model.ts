import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"

export interface ISubscriber {
  id?: string
  firstName: string
  lastName: string
  email: string
  ticketNumber: string
  phone?: string
}

type IReturnType = WithStringId<ISubscriber>

const SubscriberSchema = new Schema<ISubscriber>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    ticketNumber: { type: String, required: true, unique: true },
    phone: { type: String },
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
