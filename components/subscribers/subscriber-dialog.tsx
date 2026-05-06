"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { saveSubscriberAction } from "@/actions/subscriber-actions"
import { ISubscriber } from "@/types/subscriber-t"

const subscriberSchema = z.object({
  firstName: z.string().min(1, "Vardas privalomas"),
  lastName: z.string().min(1, "Pavardė privaloma"),
  email: z.string().email("Neteisingas el. pašto formatas"),
  ticketNumber: z.string().min(1, "Bilieto numeris privalomas"),
  phone: z.string().optional(),
})
type SubscriberDTO = z.infer<typeof subscriberSchema>

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingItem: ISubscriber | null
  onSuccess: () => void
}

export function SubscriberDialog({
  isOpen,
  onOpenChange,
  editingItem,
  onSuccess,
}: Props) {
  const form = useForm<SubscriberDTO>({
    resolver: zodResolver(subscriberSchema),
    defaultValues: editingItem || {
      firstName: "",
      lastName: "",
      email: "",
      ticketNumber: "",
      phone: "",
    },
  })

  const onSubmit = async (values: SubscriberDTO) => {
    const res = await saveSubscriberAction(values, editingItem?.id)
    if (res.success) {
      toast.success(editingItem ? "Atnaujinta!" : "Pridėta!")
      onSuccess()
    } else {
      toast.error(res.error || "Klaida išsaugant")
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent
        key={editingItem?.id || "new"}
        className="sm:max-w-[500px]"
      >
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Redaguoti abonentą" : "Naujas abonentas"}
          </DialogTitle>
          {}
          <DialogDescription className="hidden">
            Abonento forma
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vardas</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pavardė</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>El. paštas</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ticketNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bilieto Nr.</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefonas</FormLabel>
                    <FormControl>
                      <Input {...field} value={field.value ?? ""} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saugoma..." : "Išsaugoti"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
