import { mongooseConnect } from "@/lib/mongoose"
import { Book } from "@/models/book"
import { Author } from "@/models/author"
import { Publisher } from "@/models/publisher"
import { BooksClient } from "@/components/books/booksClient"

async function getInitialData() {
  await mongooseConnect()
  const [books, authors, publishers] = await Promise.all([
    Book.find()
      .populate("author", "name")
      .populate("publisher", "name")
      .sort({ createdAt: -1 })
      .lean(),
    Author.find().lean(),
    Publisher.find().lean(),
  ])
  // Serializacija būtina Server Components
  return {
    books: JSON.parse(JSON.stringify(books)),
    authors: JSON.parse(JSON.stringify(authors)),
    publishers: JSON.parse(JSON.stringify(publishers)),
  }
}

export default async function KnygosPage() {
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
