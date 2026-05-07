import { Model, model, models, Schema, Types } from "mongoose"
import { WithStringId } from "./model-t"
import { ICity } from "@/types/city-t"

type IReturnType = WithStringId<ICity>

const CitySchema = new Schema<ICity>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "cities",
    strict: true,
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        _doc: unknown,
        ret: ICity & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const City: Model<ICity> = models.City || model("City", CitySchema)
