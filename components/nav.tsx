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
  ChevronDown,
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

  return (
    <div className="flex items-center">
      {/* --- DESKTOP NAVIGACIJA (Naudojame NavigationMenu sklandžiam hover) --- */}
      <nav className="hidden md:block">
        <NavigationMenu>
          <NavigationMenuList className="gap-2">
            {/* 1. Klasifikatoriai (Dropdown su sklandžiu Hover) */}
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "group bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[active]:bg-transparent",
                  pathname === "/authors" || pathname === "/leidyklos"
                    ? "text-orange-600 font-bold"
                    : "text-muted-foreground hover:text-orange-600"
                )}
              >
                <LayoutGrid className="h-4 w-4 mr-2" />
                Klasifikatoriai
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[200px] gap-2 p-4 bg-white border shadow-md rounded-md">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/authors"
                        className={cn(
                          "flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600",
                          pathname === "/authors"
                            ? "text-orange-600 bg-orange-50 font-bold"
                            : "text-muted-foreground"
                        )}
                      >
                        <Users className="h-4 w-4" />
                        <div className="text-sm font-medium leading-none">
                          Autoriai
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/leidyklos"
                        className={cn(
                          "flex items-center gap-2 select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600 focus:bg-orange-50 focus:text-orange-600",
                          pathname === "/leidyklos"
                            ? "text-orange-600 bg-orange-50 font-bold"
                            : "text-muted-foreground"
                        )}
                      >
                        <Building2 className="h-4 w-4" />
                        <div className="text-sm font-medium leading-none">
                          Leidyklos
                        </div>
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            {/* 2. Knygos */}
            <NavigationMenuItem>
              <Link href="/knygos" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    pathname === "/knygos"
                      ? "text-orange-600 font-bold"
                      : "text-muted-foreground hover:text-orange-600"
                  )}
                >
                  <Book className="h-4 w-4 mr-2" />
                  Knygos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* 3. Abonentai */}
            <NavigationMenuItem>
              <Link href="/abonentai" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    pathname === "/abonentai"
                      ? "text-orange-600 font-bold"
                      : "text-muted-foreground hover:text-orange-600"
                  )}
                >
                  <UserCog className="h-4 w-4 mr-2" />
                  Abonentai
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            {/* 4. Rezervacijos */}
            <NavigationMenuItem>
              <Link href="/rezervacijos" legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent hover:bg-transparent focus:bg-transparent",
                    pathname === "/rezervacijos"
                      ? "text-orange-600 font-bold"
                      : "text-muted-foreground hover:text-orange-600"
                  )}
                >
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  Rezervacijos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </nav>

      {/* --- MOBILI NAVIGACIJA (Liekame prie Sheet) --- */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left text-orange-600 font-bold uppercase">
                BIBLIO MENIU
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-6 mt-10">
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-muted-foreground uppercase px-2 tracking-widest">
                  Klasifikatoriai
                </p>
                <div className="flex flex-col gap-1">
                  <Link
                    href="/authors"
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md",
                      pathname === "/authors"
                        ? "bg-orange-50 text-orange-600 font-bold"
                        : "text-black hover:bg-accent"
                    )}
                  >
                    <Users className="h-5 w-5 text-orange-600" /> Autoriai
                  </Link>
                  <Link
                    href="/leidyklos"
                    className={cn(
                      "flex items-center gap-3 p-2 rounded-md",
                      pathname === "/leidyklos"
                        ? "bg-orange-50 text-orange-600 font-bold"
                        : "text-black hover:bg-accent"
                    )}
                  >
                    <Building2 className="h-5 w-5 text-orange-600" /> Leidyklos
                  </Link>
                </div>
              </div>
              <div className="space-y-1 border-t pt-6 text-black">
                <Link
                  href="/knygos"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/knygos"
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "hover:bg-accent"
                  )}
                >
                  <Book className="h-5 w-5 text-orange-600" /> Knygos
                </Link>
                <Link
                  href="/abonentai"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/abonentai"
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "hover:bg-accent"
                  )}
                >
                  <UserCog className="h-5 w-5 text-orange-600" /> Abonentai
                </Link>
                <Link
                  href="/rezervacijos"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md",
                    pathname === "/rezervacijos"
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "hover:bg-accent"
                  )}
                >
                  <CalendarCheck className="h-5 w-5 text-orange-600" />{" "}
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
