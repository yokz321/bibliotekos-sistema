import { AuthNav } from "./auth-nav"
import { Nav } from "./nav"
import Link from "next/link"
import { Library } from "lucide-react"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-screen-xl flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <Library className="h-6 w-6 text-orange-600 transition-transform group-hover:scale-110" />
            <span className="font-bold text-xl tracking-tight text-orange-600 uppercase">
              Biblio
            </span>
          </Link>

          <Nav />
        </div>

        <div className="flex items-center gap-2">
          <AuthNav />
        </div>
      </div>
    </header>
  )
}
