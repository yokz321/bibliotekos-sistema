"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, BookHeart, TriangleAlert } from "lucide-react"
import { PopularBooksTable, LateSubscribersTable } from "./analytics-lists"
import type { IPopularBook, ILateSubscriber } from "@/types/borrowing-t"

type IProps = {
  popularBooks: IPopularBook[]
  lateReturners: ILateSubscriber[]
  totalValue: number
}

export function AnalyticsClient(props: IProps) {
  const { popularBooks, lateReturners, totalValue } = props

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold tracking-tight">
          Bibliotekos analitika
        </h1>
        <p className="text-muted-foreground text-sm">
          Sistemos sugeneruota statistika apie fondo vertę ir skaitytojų
          aktyvumą.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-orange-200 bg-orange-50/30 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-orange-800">
              Bendra fondo vertė
            </CardTitle>
            <Coins className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-orange-950">
              {totalValue.toLocaleString("lt-LT", {
                style: "currency",
                currency: "EUR",
              })}
            </div>
            <p className="text-xs text-orange-700/70 mt-1 font-medium">
              Visų užregistruotų knygų kainų suma
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="bg-red-100 p-1.5 rounded-md">
              <BookHeart className="h-5 w-5 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Populiariausios knygos
            </h2>
          </div>
          <PopularBooksTable items={popularBooks} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <div className="bg-orange-100 p-1.5 rounded-md">
              <TriangleAlert className="h-5 w-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              Dažniausiai vėluojantys
            </h2>
          </div>
          <LateSubscribersTable items={lateReturners} />
        </div>
      </div>
    </div>
  )
}
