import {
  Users,
  Building2,
  Book,
  UserCog,
  CalendarCheck,
  LayoutGrid,
  MapPin,
  type LucideIcon,
} from "lucide-react"

export interface NavItem {
  title: string
  href?: string
  icon: LucideIcon
  children?: { title: string; href: string; icon: LucideIcon }[]
}

export const NAVIGATION_MENU: NavItem[] = [
  {
    title: "Klasifikatoriai",
    icon: LayoutGrid,
    children: [
      { title: "Autoriai", href: "/authors", icon: Users },
      { title: "Leidyklos", href: "/publishers", icon: Building2 },
      { title: "Miestai", href: "/cities", icon: MapPin }, // NAUJA EILUTĖ
    ],
  },
  { title: "Knygos", href: "/books", icon: Book },
  { title: "Abonentai", href: "/subscribers", icon: UserCog },
  { title: "Rezervacijos", href: "/reservations", icon: CalendarCheck },
]
