import { getApi } from "@/utils/server-api"
import { AuthorListWrapper } from "@/components/authors/author-list-wrapper"
import type { IAuthor } from "@/types/author-t"

export default async function AuthorsPage() {
  const authors = await getApi<IAuthor[]>("/api/authors")

  return <AuthorListWrapper initialData={authors ?? []} />
}
