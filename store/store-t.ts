import type { INav } from "@/types/nav-t"

export type INotificationSlice = {
  messages: string[]
  setMessage: (message: string) => void
}

export type INavSlice = {
  menu: INav[]
  setMenu: (menu: INav[]) => void
}
