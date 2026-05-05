import {
  LayoutGrid,
  Users,
  Building2,
  Book,
  UserCog,
  CalendarCheck,
} from "lucide-react"

export const CLASSIFIER_ITEMS = [
  { title: "Autoriai", href: "/authors", icon: Users },
  { title: "Leidyklos", href: "/leidyklos", icon: Building2 },
]

export const MAIN_NAV_ITEMS = [
  { title: "Knygos", href: "/knygos", icon: Book },
  { title: "Abonentai", href: "/abonentai", icon: UserCog },
  { title: "Rezervacijos", href: "/rezervacijos", icon: CalendarCheck },
]
