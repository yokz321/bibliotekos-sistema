import type { Types } from "mongoose"

export interface ISubscriber {
  id: string
  ticketNumber: string
  firstName: string
  lastName: string
  city: string
  street: string
  houseNumber: string
  apartmentNumber?: string
  phone: string
}

export type ILeanSubscriber = ISubscriber & { _id: Types.ObjectId }
