"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { CLASSIFIER_ITEMS, MAIN_NAV_ITEMS } from "@/constants/navigation"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

export function MobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)

  // Pagalbinė funkcija stiliui, kad nereikėtų kartoti !text-orange...
  const getStyle = (path: string) =>
    cn(
      "flex items-center gap-3 p-2 rounded-md transition-colors",
      pathname === path
        ? "bg-orange-50 !text-orange-600 font-bold"
        : "!text-slate-700 hover:bg-accent"
    )

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="hover:bg-orange-50">
            <Menu className="h-6 w-6 !text-slate-800" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle className="text-left !text-orange-600 font-bold uppercase">
              Biblio Meniu
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col gap-6 mt-10">
            {/* Klasifikatoriai */}
            <div className="space-y-3">
              <p className="text-[10px] font-bold !text-slate-400 uppercase px-2 tracking-widest">
                Klasifikatoriai
              </p>
              <div className="flex flex-col gap-1">
                {CLASSIFIER_ITEMS.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)} // Uždarom meniu paspaudus
                    className={getStyle(item.href)}
                  >
                    <item.icon className="h-5 w-5 !text-orange-600" />
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Pagrindiniai puslapiai */}
            <div className="space-y-1 border-t pt-6">
              {MAIN_NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={getStyle(item.href)}
                >
                  <item.icon className="h-5 w-5 !text-orange-600" />
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
