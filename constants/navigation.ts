import {
  Users,
  Building2,
  Book,
  UserCog,
  CalendarCheck,
  LayoutGrid,
  MapPin,
} from "lucide-react"
import type { NavItem } from "@/types/nav-t"

export const NAVIGATION_MENU: NavItem[] = [
  {
    title: "Klasifikatoriai",
    icon: LayoutGrid,
    children: [
      { title: "Autoriai", href: "/authors", icon: Users },
      { title: "Leidyklos", href: "/publishers", icon: Building2 },
      { title: "Miestai", href: "/cities", icon: MapPin },
    ],
  },
  { title: "Knygos", href: "/books", icon: Book },
  { title: "Abonentai", href: "/subscribers", icon: UserCog },
  { title: "Rezervacijos", href: "/reservations", icon: CalendarCheck },
]
