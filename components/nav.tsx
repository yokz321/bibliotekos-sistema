"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Menu,
  ChevronDown,
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Nav() {
  const pathname = usePathname()
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

  // Apsauga nuo mirgėjimo: naudojame paprastą funkciją stiliams
  const linkStyles = (path: string) =>
    cn(
      "flex items-center gap-1 transition-colors outline-none select-none py-1 text-sm font-medium",
      pathname === path
        ? "text-orange-600 font-bold"
        : "text-muted-foreground hover:text-orange-600"
    )

  return (
    <div className="flex items-center">
      {/* --- DESKTOP NAVIGACIJA --- */}
      <nav className="hidden md:flex items-center gap-6">
        {/* KLASIFIKATORIAI: Apgaubiame div'u, kuris valdo HOVER būseną be mirgėjimo */}
        <div
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
          className="relative inline-block"
        >
          <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
            {/* onPointerDown apsaugo nuo "double pop" efekto gavus fokusą */}
            <DropdownMenuTrigger
              onPointerDown={(e) => e.preventDefault()}
              onClick={(e) => e.preventDefault()}
              className={cn(
                "flex items-center gap-1 transition-colors outline-none select-none py-2 text-sm font-medium",
                pathname === "/authors" ||
                  pathname === "/leidyklos" ||
                  isDropdownOpen
                  ? "text-orange-600"
                  : "text-muted-foreground hover:text-orange-600"
              )}
            >
              <LayoutGrid className="h-4 w-4 mr-1" />
              Klasifikatoriai
              <ChevronDown
                className={cn(
                  "h-3 w-3 opacity-50 transition-transform duration-200",
                  isDropdownOpen && "rotate-180"
                )}
              />
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align="start"
              className="w-[200px] p-2 mt-[-5px]" // mt-[-5px] panaikina tarpą tarp triggerio ir meniu, kad pelė "nepasimestų"
              onMouseEnter={() => setIsDropdownOpen(true)}
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/authors"
                  className="flex items-center gap-2 cursor-pointer w-full text-muted-foreground hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:text-orange-600 outline-none p-2 rounded-sm"
                >
                  <Users className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">Autoriai</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/leidyklos"
                  className="flex items-center gap-2 cursor-pointer w-full text-muted-foreground hover:text-orange-600 hover:bg-orange-50 focus:bg-orange-50 focus:text-orange-600 outline-none p-2 rounded-sm"
                >
                  <Building2 className="h-4 w-4 text-orange-600" />
                  <span className="font-medium">Leidyklos</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* KNYGOS */}
        <Link href="/knygos" className={linkStyles("/knygos")}>
          <Book className="h-4 w-4 mr-1" />
          Knygos
        </Link>

        {/* ABONENTAI */}
        <Link href="/abonentai" className={linkStyles("/abonentai")}>
          <UserCog className="h-4 w-4 mr-1" />
          Abonentai
        </Link>

        {/* REZERVACIJOS */}
        <Link href="/rezervacijos" className={linkStyles("/rezervacijos")}>
          <CalendarCheck className="h-4 w-4 mr-1" />
          Rezervacijos
        </Link>
      </nav>

      {/* --- MOBILI NAVIGACIJA --- */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left text-orange-600 font-bold uppercase tracking-tight">
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
                      "flex items-center gap-3 p-2 rounded-md transition-colors",
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
                      "flex items-center gap-3 p-2 rounded-md transition-colors",
                      pathname === "/leidyklos"
                        ? "bg-orange-50 text-orange-600 font-bold"
                        : "text-black hover:bg-accent"
                    )}
                  >
                    <Building2 className="h-5 w-5 text-orange-600" /> Leidyklos
                  </Link>
                </div>
              </div>
              <div className="space-y-1 border-t pt-6">
                <Link
                  href="/knygos"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md transition-colors",
                    pathname === "/knygos"
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "text-black hover:bg-accent"
                  )}
                >
                  <Book className="h-5 w-5 text-orange-600" /> Knygos
                </Link>
                <Link
                  href="/abonentai"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md transition-colors",
                    pathname === "/abonentai"
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "text-black hover:bg-accent"
                  )}
                >
                  <UserCog className="h-5 w-5 text-orange-600" /> Abonentai
                </Link>
                <Link
                  href="/rezervacijos"
                  className={cn(
                    "flex items-center gap-3 p-2 rounded-md transition-colors",
                    pathname === "/rezervacijos"
                      ? "bg-orange-50 text-orange-600 font-bold"
                      : "text-black hover:bg-accent"
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
