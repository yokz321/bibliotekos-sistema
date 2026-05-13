import { getApi } from "@/utils/server-api"
import { BooksClient } from "@/components/books/books-client"
import type { IPublisher } from "@/types/publisher-t"
import type { IAuthor } from "@/types/author-t"
import type { IBook } from "@/types/book-t"
import type { ICategory, ILanguage } from "@/types/metadata-t"

export default async function BooksPage() {
  const [books, authors, publishers, categories, languages] = await Promise.all(
    [
      getApi<IBook[]>("/api/books"),
      getApi<IAuthor[]>("/api/authors"),
      getApi<IPublisher[]>("/api/publishers"),
      getApi<ICategory[]>("/api/categories"),
      getApi<ILanguage[]>("/api/languages"),
    ]
  )

  return (
    <BooksClient
      initialBooks={books ?? []}
      authors={authors ?? []}
      publishers={publishers ?? []}
      categories={categories ?? []}
      languages={languages ?? []}
    />
  )
}
