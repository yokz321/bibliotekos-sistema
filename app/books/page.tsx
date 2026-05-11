import { getApi } from "@/utils/server-api"
import { BooksClient } from "@/components/books/books-client"
import type { IAuthor, IPublisher } from "@/types/book-t"

export default async function BooksPage() {
  const [authors, publishers] = await Promise.all([
    getApi<IAuthor[]>("/api/authors"),
    getApi<IPublisher[]>("/api/publishers"),
  ])

  return <BooksClient authors={authors ?? []} publishers={publishers ?? []} />
}
