"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { NAVIGATION_MENU } from "@/constants/navigation"
import { ChevronDown } from "lucide-react"

export function DesktopNav() {
  const pathname = usePathname()

  const getLinkStyle = (href?: string) =>
    cn(
      "flex items-center gap-1 px-3 py-2 text-sm transition-colors rounded-md",
      pathname === href
        ? "text-orange-600 font-bold"
        : "text-slate-600 hover:text-orange-600"
    )

  return (
    <nav className="hidden md:block">
      <ul className="flex items-center gap-2">
        {NAVIGATION_MENU.map((item) => (
          <li key={item.title} className="relative group">
            {item.children ? (
              <>
                <button
                  className={cn(
                    getLinkStyle(item.href),
                    "cursor-default group-hover:text-orange-600"
                  )}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.title}
                  <ChevronDown className="h-3 w-3 ml-1 opacity-50 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                <div
                  className={cn(
                    "absolute top-full pt-2 opacity-0 invisible translate-y-1 transition-all duration-200 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 z-50",
                    item.title === "Ataskaitos" ? "right-0" : "left-0"
                  )}
                >
                  <div className="w-56 p-2 bg-white border border-slate-200 shadow-xl rounded-lg overflow-hidden">
                    <ul className="space-y-1">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className={cn(
                              "flex items-center gap-2 p-3 text-sm rounded-md transition-colors",
                              pathname === child.href
                                ? "bg-orange-50 text-orange-600 font-bold"
                                : "text-slate-600 hover:bg-orange-50 hover:text-orange-600"
                            )}
                          >
                            <child.icon className="h-4 w-4" />
                            {child.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </>
            ) : (
              <Link href={item.href || "#"} className={getLinkStyle(item.href)}>
                <item.icon className="h-4 w-4 mr-2" />
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}
