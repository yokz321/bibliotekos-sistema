"use server"

import { CityService } from "@/services/city-service"
import { citySchema, type CityDTO } from "@/dto/city-dto"
import { revalidatePath } from "next/cache"
import type { ICity } from "@/types/city-t"
import type { IState } from "@/types/shared-t"

export async function saveCityAction(
  data: CityDTO,
  id?: string
): Promise<IState> {
  const parsed = citySchema.safeParse(data)

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message || "Validacijos klaida"
    return { success: false, error: firstError }
  }

  const service = new CityService()

  try {
    if (id) {
      const toUpdate: ICity = { ...parsed.data, id }
      await service.update(toUpdate)
    } else {
      await service.save(parsed.data)
    }

    revalidatePath("/cities")
    return { success: true, message: "Miestas išsaugotas" }
  } catch (error: unknown) {
    let errorMessage = "Serverio klaida"
    if (error instanceof Error) errorMessage = error.message
    return { success: false, error: errorMessage }
  }
}

export async function deleteCityAction(id: string): Promise<IState> {
  const service = new CityService()
  try {
    await service.delete(id)
    revalidatePath("/cities")
    return { success: true, message: "Miestas pašalintas" }
  } catch {
    return { success: false, error: "Nepavyko pašalinti miesto" }
  }
}
