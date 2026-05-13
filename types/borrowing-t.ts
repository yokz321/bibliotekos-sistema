import type { IBook } from "./book-t"
import type { ISubscriber } from "./subscriber-t"

export type IBorrowingPopulated = {
  id: string
  bookId: IBook | undefined
  subscriberId: ISubscriber | undefined
  borrowDate: string
  dueDate: string
  returnDate?: string
  isReturned: boolean
}

export type IPopularBook = {
  id: string
  title: string
  borrowCount: number
}

export type ILateSubscriber = {
  id: string
  firstName: string
  lastName: string
  ticketNumber: string
  lateCount: number
}
