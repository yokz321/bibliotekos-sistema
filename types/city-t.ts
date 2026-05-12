import type { Types } from "mongoose"

export interface ICity {
  id: string
  name: string
}

export type ILeanCity = {
  _id: Types.ObjectId
  name: string
}
