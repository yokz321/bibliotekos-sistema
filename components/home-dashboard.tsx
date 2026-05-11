import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, Users, CalendarCheck, Building2, MapPin } from "lucide-react"

export function HomeDashboard() {
  const categories = [
    {
      title: "Autoriai",
      href: "/authors",
      icon: Users,
      description: "Klasifikatorius: Autorių sąrašas ir valdymas",
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
  ]

  return (
    <main className="container py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="transition-transform hover:scale-105"
          >
            <Card className="h-full cursor-pointer hover:border-primary">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl font-bold">
                  {item.title}
                </CardTitle>
                <item.icon className="h-6 w-6 text-orange-600" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </main>
  )
}
