import type { Types } from "mongoose"

export type IAuthor = {
  id: string
  firstName: string
  lastName: string
  biography?: string
}

export type ILeanAuthor = {
  _id: Types.ObjectId
  firstName: string
  lastName: string
  biography?: string
}
