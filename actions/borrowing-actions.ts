"use server"

import { connectMongoose } from "@/utils/mongoose-client"
import { Borrowing } from "@/models/borrowing-model"
import { borrowingSchema, type BorrowingDTO } from "@/dto/borrowing-dto"
import { revalidatePath } from "next/cache"
import { Types } from "mongoose"
import { BorrowingService } from "@/services/borrowing-service"

export async function saveBorrowingAction(data: BorrowingDTO) {
  const parse = borrowingSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Užpildykite visus privalomus laukus!" }
  }

  const dto = parse.data
  await connectMongoose()

  try {
    const today = new Date()

    const overdueBorrowing = await Borrowing.findOne({
      subscriberId: new Types.ObjectId(dto.subscriberId),
      isReturned: false,
      dueDate: { $lt: today },
    })

    if (overdueBorrowing) {
      return {
        success: false,
        error:
          "Abonentas negali pasiimti naujos knygos, nes turi vėluojančių negrąžintų knygų!",
      }
    }

    await Borrowing.create({
      subscriberId: new Types.ObjectId(dto.subscriberId),
      bookId: new Types.ObjectId(dto.bookId),
      borrowDate: new Date(dto.borrowDate),
      dueDate: new Date(dto.dueDate),
      isReturned: dto.isReturned,
    })

    revalidatePath("/reservations")
    return { success: true }
  } catch {
    return { success: false, error: "Serverio klaida saugant" }
  }
}

export async function returnBookAction(id: string) {
  const service = new BorrowingService()
  try {
    await service.returnBook(id)
    revalidatePath("/reservations")
    return { success: true }
  } catch {
    return { success: false, error: "Nepavyko užregistruoti grąžinimo" }
  }
}

export async function deleteBorrowingAction(id: string) {
  const service = new BorrowingService()
  try {
    await service.delete(id)
    revalidatePath("/reservations")
    return { success: true }
  } catch {
    return { success: false, error: "Nepavyko ištrinti knygos" }
  }
}
