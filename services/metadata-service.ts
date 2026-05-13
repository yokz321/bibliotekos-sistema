import { Language } from "@/models/language-model"
import { Category } from "@/models/category-model"
import { SubscriberType } from "@/models/subscriber-type-model"
import { connectMongoose } from "@/utils/mongoose-client"
import type {
  ILanguage,
  ICategory,
  ISubscriberType,
  ILeanLanguage,
  ILeanCategory,
  ILeanSubscriberType,
} from "@/types/metadata-t"

export class MetadataService {
  async getLanguages(): Promise<ILanguage[]> {
    await connectMongoose()
    const results = (await Language.find()
      .sort({ name: 1 })
      .lean()) as unknown as ILeanLanguage[]

    return results.map((item) => {
      const { _id, ...rest } = item
      return {
        ...rest,
        id: _id.toString(),
      }
    })
  }

  async getCategories(): Promise<ICategory[]> {
    await connectMongoose()
    const results = (await Category.find()
      .sort({ name: 1 })
      .lean()) as unknown as ILeanCategory[]

    return results.map((item) => {
      const { _id, ...rest } = item
      return {
        ...rest,
        id: _id.toString(),
      }
    })
  }

  async getSubscriberTypes(): Promise<ISubscriberType[]> {
    await connectMongoose()
    const results = (await SubscriberType.find()
      .sort({ name: 1 })
      .lean()) as unknown as ILeanSubscriberType[]

    return results.map((item) => {
      const { _id, ...rest } = item
      return {
        ...rest,
        id: _id.toString(),
      }
    })
  }
}
