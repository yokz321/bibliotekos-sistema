"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingItem: any | null
  form: any
  setForm: (form: any) => void
  onSave: (e: React.FormEvent) => void
}

export function SubscriberDialog({
  isOpen,
  onOpenChange,
  editingItem,
  form,
  setForm,
  onSave,
}: Props) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Redaguoti" : "Pridėti naują"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={onSave} className="space-y-4 pt-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>Vardas</Label>
              <Input
                value={form.firstName}
                onChange={(e) =>
                  setForm({ ...form, firstName: e.target.value })
                }
                required
              />
            </div>
            <div className="grid gap-2">
              <Label>Pavardė</Label>
              <Input
                value={form.lastName}
                onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label>El. paštas</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label>Pažymėjimo Nr.</Label>
            <Input
              value={form.ticketNumber}
              onChange={(e) =>
                setForm({ ...form, ticketNumber: e.target.value })
              }
              required
              placeholder="PVZ-12345"
            />
          </div>
          <Button type="submit" className="w-full bg-orange-600">
            Išsaugoti
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
