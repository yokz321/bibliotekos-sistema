import { AuthorService } from "@/services/author-service"
import { AuthorListWrapper } from "@/components/authors/author-list-wrapper"

export default async function AuthorsPage() {
  const service = new AuthorService()
  const authors = await service.getAll()
  const safeAuthors = JSON.parse(JSON.stringify(authors))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Autoriai</h1>
      </div>
      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        <AuthorListWrapper initialData={safeAuthors} />
      </div>
    </div>
  )
}
