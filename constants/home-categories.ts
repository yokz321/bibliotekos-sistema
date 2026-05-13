import {
  Book,
  Users,
  CalendarCheck,
  Building2,
  MapPin,
  ClipboardList,
  Library,
  type LucideIcon,
} from "lucide-react"

export type HomeCategory = {
  title: string
  href: string
  icon: LucideIcon
  description: string
}

export const HOME_CATEGORIES: HomeCategory[] = [
  {
    title: "Autoriai",
    href: "/authors",
    icon: Users,
    description: "Klasifikatorius: Autorių sąrašas ir valdymas",
  },
  {
    title: "Bibliotekos analitika",
    href: "/reports/analytics",
    icon: BarChart3,
    description: "Populiariausios knygos, skolininkų statistika ir fondo vertė",
  },
  {
    title: "Leidyklos",
    href: "/publishers",
    icon: Building2,
    description: "Klasifikatorius: Leidyklų sąrašas ir valdymas",
  },
  {
    title: "Miestai",
    href: "/cities",
    icon: MapPin,
    description: "Klasifikatorius: Miestų sąrašas ir valdymas",
  },
  {
    title: "Knygos",
    href: "/books",
    icon: Book,
    description: "Peržiūrėti ir valdyti knygų katalogą",
  },
  {
    title: "Abonentai",
    href: "/subscribers",
    icon: Users,
    description: "Bibliotekos lankytojų sąrašas ir duomenys",
  },
  {
    title: "Rezervacijos",
    href: "/reservations",
    icon: CalendarCheck,
    description: "Knygų užsakymų ir grąžinimų sekimas",
  },
  {
    title: "Išdavimų ataskaitos",
    href: "/reports/borrowings",
    icon: ClipboardList,
    description: "Skaitytojų turimos knygos ir skolininkai",
  },
  {
    title: "Fondo ataskaitos",
    href: "/reports/inventory",
    icon: Library,
    description: "Inventorinis sąrašas ir knygų judėjimas",
  },
]
