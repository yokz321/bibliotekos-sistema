import { getApi } from "@/utils/server-api"
import { BooksClient } from "@/components/books/books-client"
import { IBook, IAuthor, IPublisher } from "@/types/book-t"

export default async function BooksPage() {
  const [books, authors, publishers] = await Promise.all([
    getApi<IBook[]>("/api/books"),
    getApi<IAuthor[]>("/api/authors"),
    getApi<IPublisher[]>("/api/publishers"),
  ])

  return (
    <BooksClient
      initialBooks={books ?? []}
      initialAuthors={authors ?? []}
      initialPublishers={publishers ?? []}
    />
  )
}
