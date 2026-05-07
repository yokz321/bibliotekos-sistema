import { AuthorService } from "@/services/author-service"
import { AuthorListWrapper } from "@/components/authors/author-list-wrapper"

export default async function AuthorsPage() {
  const service = new AuthorService()
  const authors = await service.getAll()
  return <AuthorListWrapper initialData={authors} />
}
