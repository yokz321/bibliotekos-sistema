import { Model, model, models, Schema, Types } from "mongoose"
import type { WithStringId } from "./model-t"
import type { ILanguage } from "@/types/metadata-t"

type IReturnType = WithStringId<ILanguage>

const LanguageSchema = new Schema<ILanguage>(
  {
    name: { type: String, required: true },
  },
  {
    timestamps: false,
    collection: "languages",
    toJSON: {
      versionKey: false,
      virtuals: true,
      transform: (
        doc: unknown,
        ret: ILanguage & { _id: Types.ObjectId }
      ): IReturnType => {
        const { _id, ...rest } = ret
        return { ...rest, id: _id.toString() }
      },
    },
  }
)

export const Language: Model<ILanguage> =
  models.Language || model("Language", LanguageSchema)
