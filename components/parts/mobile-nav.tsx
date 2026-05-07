"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { NAVIGATION_MENU } from "@/constants/navigation"
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

  const getStyle = (path?: string) =>
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
            {NAVIGATION_MENU.map((group) => (
              <div
                key={group.title}
                className={cn("space-y-1", group.children && "border-b pb-4")}
              >
                {group.children ? (
                  <>
                    <p className="text-[10px] font-bold !text-slate-400 uppercase px-2 tracking-widest mb-2">
                      {group.title}
                    </p>
                    {group.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className={getStyle(child.href)}
                      >
                        <child.icon className="h-5 w-5 !text-orange-600" />
                        {child.title}
                      </Link>
                    ))}
                  </>
                ) : (
                  <Link
                    href={group.href || "#"}
                    onClick={() => setOpen(false)}
                    className={getStyle(group.href)}
                  >
                    <group.icon className="h-5 w-5 !text-orange-600" />
                    {group.title}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
