import type { Metadata } from "next"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ReactNode } from "react"
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="lt" className={cn("font-sans", geist.variable)}>
      <body className="container mx-auto max-w-screen-xl">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
