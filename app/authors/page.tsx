import { getAuthors } from "@/actions/author-actions"
import { AuthorListWrapper } from "@/components/authors/author-list-wrapper" // Reikės šito mažo wrapperio modalui valdyti
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default async function AuthorsPage() {
  const authors = await getAuthors() // Krauname duomenis serveryje!

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Autoriai</h1>
      </div>

      <div className="rounded-md border bg-card shadow-sm overflow-hidden">
        {/* Šis komponentas valdys modalą ir rodys lentelę */}
        <AuthorListWrapper initialData={authors} />
      </div>
    </div>
  )
}
