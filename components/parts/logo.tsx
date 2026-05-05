import Link from "next/link"
import { Library } from "lucide-react"

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <Library className="h-6 w-6 text-orange-600 transition-transform group-hover:scale-110" />
      <span className="font-bold text-xl tracking-tight text-orange-600 uppercase">
        Biblio
      </span>
    </Link>
  )
}
