import { getApi } from "@/utils/server-api"
import { InventoryClient } from "@/components/reports/inventory-client"
import type { IAuthor } from "@/types/author-t"
import type { IPublisher } from "@/types/publisher-t"
import type { IBook } from "@/types/book-t"
import type { IBorrowingPopulated } from "@/types/borrowing-t"

type IPageProps = {
  searchParams: Promise<{
    authorId?: string
    publisherId?: string
    bookId?: string
  }>
}

export default async function InventoryReportPage(props: IPageProps) {
  const params = await props.searchParams
  const bookId = params.bookId || ""

  const [authors, publishers, allBooks] = await Promise.all([
    getApi<IAuthor[]>("/api/authors"),
    getApi<IPublisher[]>("/api/publishers"),
    getApi<IBook[]>("/api/books"),
  ])

  let reportData: any[] = []
  if (bookId) {
    reportData =
      (await getApi<IBorrowingPopulated[]>(
        `/api/reports/borrowings?bookId=${bookId}`
      )) ?? []
  } else {
    const query = `authorId=${params.authorId || ""}&publisherId=${
      params.publisherId || ""
    }`
    reportData =
      (await getApi<IBook[]>(`/api/reports/inventory?${query}`)) ?? []
  }

  return (
    <InventoryClient
      authors={authors ?? []}
      publishers={publishers ?? []}
      allBooks={allBooks ?? []}
      reportData={reportData}
      isHistoryView={!!bookId}
    />
  )
}
