"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAVIGATION_MENU } from "@/constants/navigation"
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

  const getLinkStyle = (href?: string) =>
    cn(
      "bg-transparent hover:bg-transparent focus:bg-transparent",
      pathname === href
        ? "!text-orange-600 font-bold"
        : "!text-slate-600 hover:!text-orange-600"
    )

  return (
    <nav className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList className="gap-1">
          {NAVIGATION_MENU.map((item) => (
            <NavigationMenuItem key={item.title}>
              {item.children ? (
                <>
                  <NavigationMenuTrigger className={getLinkStyle(item.href)}>
                    <item.icon className="h-4 w-4 mr-2" /> {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-1 p-2 bg-white border shadow-md rounded-md">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href}
                              className={cn(
                                "flex items-center gap-2 p-3 rounded-md transition-colors",
                                pathname === child.href
                                  ? "bg-orange-50 text-orange-600 font-bold"
                                  : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                              )}
                            >
                              <child.icon className="h-4 w-4" /> {child.title}
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </>
              ) : (
                <NavigationMenuLink
                  asChild
                  className={cn(
                    navigationMenuTriggerStyle(),
                    getLinkStyle(item.href)
                  )}
                >
                  <Link href={item.href || "#"}>
                    <item.icon className="h-4 w-4 mr-2" />
                    {item.title}
                  </Link>
                </NavigationMenuLink>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  )
}
