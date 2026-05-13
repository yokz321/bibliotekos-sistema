import {
  Users,
  Building2,
  Book,
  UserCog,
  CalendarCheck,
  LayoutGrid,
  MapPin,
  FileText,
  ClipboardList,
  Library,
  ChartBar,
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
  {
    title: "Ataskaitos",
    icon: FileText,
    children: [
      {
        title: "Knygų išdavimai",
        href: "/reports/borrowings",
        icon: ClipboardList,
      },
      {
        title: "Fondo inventorizacija",
        href: "/reports/inventory",
        icon: Library,
      },
      { title: "Analitika", href: "/reports/analytics", icon: ChartBar }, // Naudojama nauja ikona
    ],
  },
]
