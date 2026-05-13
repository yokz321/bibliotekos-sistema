import type { Types } from "mongoose"

export type ISubscriber = {
  id: string
  ticketNumber: string
  firstName: string
  lastName: string
  city: string
  street: string
  houseNumber: string
  apartmentNumber?: string
  phone: string
  subscriberType: string
  isActive: boolean
}

export type ILeanSubscriber = ISubscriber & { _id: Types.ObjectId }
