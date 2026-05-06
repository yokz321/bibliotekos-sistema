"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid } from "lucide-react"
import { cn } from "@/lib/utils"
import { CLASSIFIER_ITEMS, MAIN_NAV_ITEMS } from "@/constants/app-constants"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function DesktopNav() {
  const pathname = usePathname()

  const getStyle = (path: string) =>
    cn(
      "bg-transparent hover:bg-transparent focus:bg-transparent",
      pathname === path
        ? "!text-orange-600 font-bold"
        : "!text-slate-600 hover:!text-orange-600"
    )

  return (
    <nav className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          <NavigationMenuItem>
            <NavigationMenuTrigger className={getStyle("")}>
              <LayoutGrid className="h-4 w-4 mr-2" /> Klasifikatoriai
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[200px] gap-1 p-2 bg-white border shadow-md rounded-md">
                {CLASSIFIER_ITEMS.map((item) => (
                  <li key={item.href}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 p-3 rounded-md transition-colors",
                          pathname === item.href
                            ? "bg-orange-50 text-orange-600 font-bold"
                            : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                        )}
                      >
                        <item.icon className="h-4 w-4" /> {item.title}
                      </Link>
                    </NavigationMenuLink>
                  </li>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          {MAIN_NAV_ITEMS.map((item) => (
            <NavigationMenuItem key={item.href}>
              <NavigationMenuLink
                asChild
                className={cn(
                  navigationMenuTriggerStyle(),
                  getStyle(item.href)
                )}
              >
                <Link href={item.href}>
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
