import type { Types } from "mongoose"

export type IPublisher = {
  id: string
  name: string
  location?: string
}

export type ILeanPublisher = {
  _id: Types.ObjectId
  name: string
  location?: string
}
