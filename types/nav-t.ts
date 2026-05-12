import type { LucideIcon } from "lucide-react"

export type INav = {
  title: string
  slug: string
}

export type NavItem = {
  title: string
  href?: string
  icon: LucideIcon
  children?: { title: string; href: string; icon: LucideIcon }[]
}
