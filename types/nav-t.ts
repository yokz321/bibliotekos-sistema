import type { LucideIcon } from "lucide-react"

export interface INav {
  title: string
  slug: string
}

export interface NavItem {
  title: string
  href?: string
  icon: LucideIcon
  children?: { title: string; href: string; icon: LucideIcon }[]
}
