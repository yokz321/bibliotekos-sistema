import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "Bibliotekos Sistema",
  description: "Knygų ir abonentų valdymo sistema.",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="lt">
      <body className="container mx-auto max-w-screen-xl">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
