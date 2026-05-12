"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { ISubscriber } from "@/types/subscriber-t"

type IProps = {
  subscribers: ISubscriber[]
}

export function BorrowingReportFilter(props: IProps) {
  const { subscribers } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentSubscriber = searchParams.get("subscriberId") || "all"
  const isOverdueOnly = searchParams.get("overdue") === "true"

  const updateFilters = (name: string, value: string | boolean) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "all" || value === false) {
      params.delete(name)
    } else {
      params.set(name, String(value))
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 bg-muted/30 rounded-lg border items-end">
      <div className="space-y-2 w-full md:w-72">
        <Label>Pasirinkite abonentą</Label>
        <Select
          value={currentSubscriber}
          onValueChange={(v: string) => updateFilters("subscriberId", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Visi abonentai" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Visi abonentai</SelectItem>
            {subscribers.map((s) => (
              <SelectItem key={s.id} value={s.id}>
                {s.firstName} {s.lastName} ({s.ticketNumber})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2 pb-3">
        <Checkbox
          id="overdue"
          checked={isOverdueOnly}
          onCheckedChange={(checked: boolean | "indeterminate") =>
            updateFilters("overdue", checked === true)
          }
        />
        <Label
          htmlFor="overdue"
          className="cursor-pointer text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Rodyti tik vėluojančius grąžinti
        </Label>
      </div>
    </div>
  )
}
