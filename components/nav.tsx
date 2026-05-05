"use client"

import { DesktopNav } from "./parts/desktop-nav"
import { MobileNav } from "./parts/mobile-nav"

export function Nav() {
  return (
    <div className="flex items-center">
      <DesktopNav />
      <MobileNav />
    </div>
  )
}
