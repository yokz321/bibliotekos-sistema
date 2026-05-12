import { getApi } from "@/utils/server-api"
import { BooksClient } from "@/components/books/books-client"
import type { IPublisher } from "@/types/publisher-t"
import type { IAuthor } from "@/types/author-t"

export default async function BooksPage() {
  const [authors, publishers] = await Promise.all([
    getApi<IAuthor[]>("/api/authors"),
    getApi<IPublisher[]>("/api/publishers"),
  ])

  return <BooksClient authors={authors ?? []} publishers={publishers ?? []} />
}
