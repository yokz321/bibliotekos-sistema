import type { Types } from "mongoose"
import type { IAuthor } from "./author-t"
import type { IPublisher } from "./publisher-t"

export interface IBook {
  id?: string
  inventoryNumber: string
  isbn: string
  title: string
  author: IAuthor
  publisher: IPublisher
  year: number
  price: number
  annotation?: string
}

export type ILeanPopulatedBook = Omit<IBook, "author" | "publisher"> & {
  _id: Types.ObjectId
  author?: (IAuthor & { _id: Types.ObjectId }) | undefined
  publisher?: (IPublisher & { _id: Types.ObjectId }) | undefined
}
