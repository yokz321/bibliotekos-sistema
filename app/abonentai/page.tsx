"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { SubscriberTable } from "./parts/subscriber-table"
import { SubscriberDialog } from "./parts/subscriber-dialog"

export default function SubscribersPage() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [editing, setEditing] = useState<any>(null)
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    ticketNumber: "",
    phone: "",
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const res = await fetch("/api/subscribers", { cache: "no-store" })
      const data = await res.json()
      if (Array.isArray(data)) setItems(data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    const method = editing ? "PUT" : "POST"
    const url = editing ? `/api/subscribers/${editing._id}` : "/api/subscribers"
    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })

    if (res.ok) {
      toast.success(editing ? "Atnaujinta!" : "Pridėta!")
      setIsOpen(false)
      setEditing(null)
      setForm({
        firstName: "",
        lastName: "",
        email: "",
        ticketNumber: "",
        phone: "",
      })
      fetchData()
    } else {
      const err = await res.json()
      toast.error(err.error || "Klaida")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Abonentai</h1>
          <p className="text-muted-foreground text-sm">Skaitytojų valdymas</p>
        </div>
        <Button
          className="bg-orange-600"
          onClick={() => {
            setEditing(null)
            setIsOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Naujas abonentas
        </Button>
      </div>

      <Card className="overflow-hidden border shadow-sm">
        {loading ? (
          <div className="py-20 flex justify-center">
            <Loader2 className="animate-spin text-orange-600" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center text-muted-foreground">
            Sąrašas tuščias
          </div>
        ) : (
          <SubscriberTable
            items={items}
            onEdit={(item) => {
              setEditing(item)
              setForm({ ...item, phone: item.phone || "" })
              setIsOpen(true)
            }}
            onDelete={async (id) => {
              if (confirm("Šalinti?")) {
                await fetch(`/api/subscribers/${id}`, { method: "DELETE" })
                fetchData()
              }
            }}
          />
        )}
      </Card>

      <SubscriberDialog
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        editingItem={editing}
        form={form}
        setForm={setForm}
        onSave={handleSave}
      />
    </div>
  )
}
