import { BooksClient } from "@/components/books/BooksClient"
import type { Book, Author, Publisher } from "@/types/book-t"

async function getInitialData() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  try {
    const [booksRes, authorsRes, publishersRes] = await Promise.all([
      fetch(`${baseUrl}/api/books`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/authors`, { cache: "no-store" }),
      fetch(`${baseUrl}/api/publishers`, { cache: "no-store" }),
    ])
    return {
      books: booksRes.ok ? await booksRes.json() : [],
      authors: authorsRes.ok ? await authorsRes.json() : [],
      publishers: publishersRes.ok ? await publishersRes.json() : [],
    }
  } catch {
    return { books: [], authors: [], publishers: [] }
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
