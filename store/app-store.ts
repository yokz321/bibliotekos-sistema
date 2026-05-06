import { create } from "zustand"
import { persist } from "zustand/middleware"
import { createNavigationSlice } from "./navigation-slice"
import { INavSlice, INotificationSlice } from "./store-t"
import { createNotificationSlice } from "./notification-slice"

export type IStoreState = INotificationSlice & INavSlice

export const useBoundStore = create<IStoreState>()(
  persist(
    (...a) => ({
      ...createNotificationSlice(...a),
      ...createNavigationSlice(...a),
    }),
    {
      name: "bound-store",
      // storage: createJSONStorage(() => localStorage),
    },
  ),
)
