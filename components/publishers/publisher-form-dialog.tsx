"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { IPublisher } from "@/types/publisher-t"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingPublisher: IPublisher | null
  onSuccess: () => void
}

export function PublisherFormDialog({
  isOpen,
  onOpenChange,
  editingPublisher,
  onSuccess,
}: Props) {
  const [name, setName] = useState("")
  const [location, setLocation] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Sinchronizuojam formą su redaguojamu įrašu
  useEffect(() => {
    if (editingPublisher) {
      setName(editingPublisher.name)
      setLocation(editingPublisher.location || "")
    } else {
      setName("")
      setLocation("")
    }
  }, [editingPublisher, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    const method = editingPublisher ? "PUT" : "POST"
    const url = editingPublisher
      ? `/api/publishers/${editingPublisher.id}`
      : "/api/publishers"

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success(
          editingPublisher ? "Leidykla atnaujinta!" : "Leidykla pridėta!"
        )
        onSuccess()
      } else {
        toast.error(data.error || "Klaida išsaugant")
      }
    } catch {
      toast.error("Tinklo klaida")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Nauja leidykla
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingPublisher ? "Redaguoti leidyklą" : "Pridėti leidyklą"}
          </DialogTitle>
          <DialogDescription>Įveskite leidyklos duomenis.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="pub-name">Pavadinimas</Label>
            <Input
              id="pub-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="pub-loc">Miestas / Adresas</Label>
            <Input
              id="pub-loc"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-orange-600 hover:bg-orange-700"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Saugoma..." : "Išsaugoti"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
