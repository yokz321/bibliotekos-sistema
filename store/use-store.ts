import { useState, useEffect } from "react"
import { IStoreState, useBoundStore } from "./use-bound-store"
import { useShallow } from "zustand/shallow"

const useStore = <F>(callback: (state: IStoreState) => F): F => {
  const result = useBoundStore(callback)
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [result])

  return data ?? result
}

export { useStore, useShallow }
