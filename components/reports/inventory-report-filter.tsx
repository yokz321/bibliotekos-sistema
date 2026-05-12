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
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { IBook } from "@/types/book-t"

type IProps = {
  authors: IAuthor[]
  publishers: IPublisher[]
  books: IBook[]
}

export function InventoryReportFilter(props: IProps) {
  const { authors, publishers, books } = props
  const router = useRouter()
  const searchParams = useSearchParams()

  const currentAuthor = searchParams.get("authorId") || "all"
  const currentPublisher = searchParams.get("publisherId") || "all"
  const currentBook = searchParams.get("bookId") || "all"

  const updateFilters = (name: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())

    if (value === "all") {
      params.delete(name)
    } else {
      params.set(name, value)
      if (name !== "bookId") params.delete("bookId")
    }

    router.push(`?${params.toString()}`)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 bg-muted/30 rounded-lg border">
      <div className="space-y-2">
        <Label>Filtras pagal autorių</Label>
        <Select
          value={currentAuthor}
          onValueChange={(v) => updateFilters("authorId", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Visi autoriai" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Visi autoriai</SelectItem>
            {authors.map((a) => (
              <SelectItem key={a.id} value={a.id}>
                {a.firstName} {a.lastName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Filtras pagal leidyklą</Label>
        <Select
          value={currentPublisher}
          onValueChange={(v) => updateFilters("publisherId", v)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Visos leidyklos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Visos leidyklos</SelectItem>
            {publishers.map((p) => (
              <SelectItem key={p.id} value={p.id}>
                {p.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Pasirinkite konkrečią knygą</Label>
        <Select
          value={currentBook}
          onValueChange={(v) => updateFilters("bookId", v)}
        >
          <SelectTrigger className="border-orange-200 focus:ring-orange-500">
            <SelectValue placeholder="Pasirinkite knygą istorijai..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              -- Knygų sąrašas (be istorijos) --
            </SelectItem>
            {books.map((b) => (
              <SelectItem key={b.id} value={b.id ?? ""}>
                {b.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
