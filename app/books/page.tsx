import { BookService } from "@/services/book-service"
import { AuthorService } from "@/services/author-service"
import { PublisherService } from "@/services/publisher-service"
import { BooksClient } from "@/components/books/books-client"

export default async function BooksPage() {
  const bookService = new BookService()
  const authorService = new AuthorService()
  const publisherService = new PublisherService()

  const [books, authors, publishers] = await Promise.all([
    bookService.getAll(),
    authorService.getAll(),
    publisherService.getAll(),
  ])

  return (
    <BooksClient
      initialBooks={books as any}
      initialAuthors={authors as any}
      initialPublishers={publishers as any}
    />
  )
}
