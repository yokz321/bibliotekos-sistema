"use server"

import { borrowingSchema, type BorrowingDTO } from "@/dto/borrowing-dto"
import { revalidatePath } from "next/cache"
import { BorrowingService } from "@/services/borrowing-service"
import type { IState } from "@/types/shared-t"

export async function saveBorrowingAction(data: BorrowingDTO): Promise<IState> {
  const parse = borrowingSchema.safeParse(data)
  if (!parse.success) {
    return { success: false, error: "Užpildykite visus privalomus laukus!" }
  }

  const service = new BorrowingService()
  try {
    await service.save(parse.data)
    revalidatePath("/reservations")
    return { success: true, message: "Knyga išduota sėkmingai" }
  } catch (error) {
    let message = "Serverio klaida saugant"
    if (error instanceof Error) message = error.message
    return { success: false, error: message }
  }
}

export async function returnBookAction(id: string): Promise<IState> {
  const service = new BorrowingService()
  try {
    await service.returnBook(id)
    revalidatePath("/reservations")
    return { success: true, message: "Knyga grąžinta" }
  } catch {
    return { success: false, error: "Nepavyko užregistruoti grąžinimo" }
  }
}

export async function deleteBorrowingAction(id: string): Promise<IState> {
  const service = new BorrowingService()
  try {
    await service.delete(id)
    revalidatePath("/reservations")
    return { success: true, message: "Rezervacija ištrinta" }
  } catch {
    return { success: false, error: "Nepavyko ištrinti įrašo" }
  }
}
