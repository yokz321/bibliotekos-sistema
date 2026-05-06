import { PublishersClient } from "@/components/publishers/publishers-client"

// Serverinis duomenų gavimas (veikia be "use client")
async function getPublishers() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
  const res = await fetch(`${baseUrl}/api/publishers`, { cache: "no-store" })
  if (!res.ok) return []
  return res.json()
}

export default async function LeidyklosPage() {
  const initialPublishers = await getPublishers()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Leidyklos</h1>
          <p className="text-muted-foreground text-sm">
            Klasifikatoriaus valdymas
          </p>
        </div>
      </div>
      {/* Visa interakcija perduodama klientiniam komponentui */}
      <PublishersClient initialData={initialPublishers} />
    </div>
  )
}
