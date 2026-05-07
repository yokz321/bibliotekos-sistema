import { StringSchemaDefinition } from "mongoose"

export interface ISubscriber {
  id?: string
  city: string
  street: string
  firstName: string
  lastName: string
  email: string
  ticketNumber: string
  phone?: string
  houseNumber: string
  apartmentNumber?: string
}
