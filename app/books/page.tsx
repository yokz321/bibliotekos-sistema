import { BookService } from "@/services/book-service"
import { AuthorService } from "@/services/author-service"
import { PublisherService } from "@/services/publisher-service"
import { BooksClient } from "@/components/books/books-client"

async function getInitialData() {
  const bookService = new BookService()
  const authorService = new AuthorService()
  const publisherService = new PublisherService()

  const [books, authors, publishers] = await Promise.all([
    bookService.getAll(),
    authorService.getAll(),
    publisherService.getAll(),
  ])

  return {
    books: JSON.parse(JSON.stringify(books)),
    authors: JSON.parse(JSON.stringify(authors)),
    publishers: JSON.parse(JSON.stringify(publishers)),
  }
}

export default async function BooksPage() {
  const { books, authors, publishers } = await getInitialData()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knygos</h1>
          <p className="text-muted-foreground text-sm">
            Bibliotekos fondo valdymas
          </p>
        </div>
      </div>
      <BooksClient
        initialBooks={books}
        initialAuthors={authors}
        initialPublishers={publishers}
      />
    </div>
  )
}
