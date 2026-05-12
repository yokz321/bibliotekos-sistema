import type { Types } from "mongoose"

export type ICity = {
  id: string
  name: string
}

export type ILeanCity = {
  _id: Types.ObjectId
  name: string
}
