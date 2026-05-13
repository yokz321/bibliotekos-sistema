import type { Types } from "mongoose"

export type ILanguage = {
  id: string
  name: string
}

export type ICategory = {
  id: string
  name: string
}

export type ISubscriberType = {
  id: string
  name: string
}

export type ILeanLanguage = { _id: Types.ObjectId; name: string }
export type ILeanCategory = { _id: Types.ObjectId; name: string }
export type ILeanSubscriberType = { _id: Types.ObjectId; name: string }
