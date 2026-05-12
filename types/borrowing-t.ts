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
