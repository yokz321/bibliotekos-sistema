"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  LayoutGrid,
  Users,
  Building2,
  Book,
  UserCog,
  CalendarCheck,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function Nav() {
  const pathname = usePathname()

  // Pagalbinė funkcija stiliams, kad nebūtų violetinės spalvos
  const getDesktopLinkClass = (path: string) =>
    cn(
      navigationMenuTriggerStyle(),
      "bg-transparent hover:bg-transparent focus:bg-transparent data-[active]:bg-transparent data-[state=open]:bg-transparent",
      pathname === path
        ? "!text-orange-600 font-bold"
        : "!text-slate-600 hover:!text-orange-600"
    )

  return (
    <div className="flex items-center">
      {/* --- DESKTOP NAVIGACIJA --- */}
      <nav className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-1">
            {/* 1. Klasifikatoriai Dropdown */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent",
                  pathname === "/authors" || pathname === "/leidyklos"
                    ? "!text-orange-600 font-bold"
                    : "!text-slate-600 hover:!text-orange-600"
                )}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Klasifikatoriai
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[220px] gap-1 p-2 bg-white border shadow-lg rounded-lg">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/authors"
                        className={cn(
                          "flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          pathname === "/authors"
                            ? "bg-orange-50 !text-orange-600 font-bold"
                            : "!text-slate-600 hover:bg-orange-50 hover:!text-orange-600"
                        )}
                      >
                        <Users className="h-4 w-4" />
                        <span className="text-sm">Autoriai</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/leidyklos"
                        className={cn(
                          "flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
                          pathname === "/leidyklos"
                            ? "bg-orange-50 !text-orange-600 font-bold"
                            : "!text-slate-600 hover:bg-orange-50 hover:!text-orange-600"
                        )}
                      >
                        <Building2 className="h-4 w-4" />
                        <span className="text-sm">Leidyklos</span>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 2. Knygos - PATAISYTA (pašalintas legacyBehavior) */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={getDesktopLinkClass("/knygos")}
              >
                <Link href="/knygos">
                  <Book className="h-4 w-4 mr-2" />
                  Knygos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 3. Abonentai - PATAISYTA */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={getDesktopLinkClass("/abonentai")}
              >
                <Link href="/abonentai">
                  <UserCog className="h-4 w-4 mr-2" />
                  Abonentai
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            {/* 4. Rezervacijos - PATAISYTA */}
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={getDesktopLinkClass("/rezervacijos")}
              >
                <Link href="/rezervacijos">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Rezervacijos
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* --- MOBILI NAVIGACIJA (Sheet) --- */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="hover:bg-orange-50">
              <Menu className="h-6 w-6 !text-slate-800" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left !text-orange-600 font-bold uppercase">
                BIBLIO MENIU
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-10">
              <div className="space-y-3 text-black">
                <p className="text-[10px] font-bold !text-slate-400 uppercase px-2 tracking-widest">
                  Klasifikatoriai
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/authors"
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md",
                      pathname === "/authors"
                        ? "bg-orange-50 !text-orange-600 font-bold"
                        : "hover:bg-accent"
                    )}
                  >
                    <Users className="h-5 w-5 !text-orange-600" /> Autoriai
                  </Link>
                  <Link
                    href="/leidyklos"
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md",
                      pathname === "/leidyklos"
                        ? "bg-orange-50 !text-orange-600 font-bold"
                        : "hover:bg-accent"
                    )}
                  >
                    <Building2 className="h-5 w-5 !text-orange-600" /> Leidyklos
                  </Link>
                </div>
              </div>
              <div className="space-y-1 border-t pt-6 text-black">
                <Link
                  href="/knygos"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/knygos"
                      ? "bg-orange-50 !text-orange-600 font-bold"
                      : "hover:bg-accent"
                  )}
                >
                  <Book className="h-5 w-5 !text-orange-600" /> Knygos
                </Link>
                <Link
                  href="/abonentai"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/abonentai"
                      ? "bg-orange-50 !text-orange-600 font-bold"
                      : "hover:bg-accent"
                  )}
                >
                  <UserCog className="h-5 w-5 !text-orange-600" /> Abonentai
                </Link>
                <Link
                  href="/rezervacijos"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/rezervacijos"
                      ? "bg-orange-50 !text-orange-600 font-bold"
                      : "hover:bg-accent"
                  )}
                >
                  <CalendarCheck className="h-5 w-5 !text-orange-600" />{" "}
                  Rezervacijos
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}
