"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  saveSubscriberAction,
  getNextTicketNumberAction,
} from "@/actions/subscriber-actions"
import { subscriberSchema, type SubscriberDTO } from "@/dto/subscriber-dto"
import type { ISubscriber } from "@/types/subscriber-t"
import type { ICity } from "@/types/city-t"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingItem: ISubscriber | undefined
  onSuccess: () => void
  cities: ICity[]
}

export function SubscriberDialog({
  isOpen,
  onOpenChange,
  editingItem,
  onSuccess,
  cities,
}: Props) {
  const [isLoadingNumber, setIsLoadingNumber] = useState(false)

  const form = useForm<SubscriberDTO>({
    resolver: zodResolver(subscriberSchema),
    mode: "onBlur",
    defaultValues: {
      firstName: "",
      lastName: "",
      ticketNumber: "",
      city: "",
      street: "",
      houseNumber: "",
      apartmentNumber: "",
      phone: "",
    },
  })

  useEffect(() => {
    if (!isOpen) return

    if (editingItem) {
      form.reset({
        firstName: editingItem.firstName,
        lastName: editingItem.lastName,
        ticketNumber: editingItem.ticketNumber,
        city: editingItem.city,
        street: editingItem.street,
        houseNumber: editingItem.houseNumber,
        apartmentNumber: editingItem.apartmentNumber ?? "",
        phone: editingItem.phone,
      })
    } else {
      form.reset()

      setIsLoadingNumber(true)
      getNextTicketNumberAction().then((nextNumber: string) => {
        form.setValue("ticketNumber", nextNumber)
        setIsLoadingNumber(false)
      })
    }
  }, [isOpen, editingItem, form])

  const onSubmit = async (values: SubscriberDTO) => {
    const res = await saveSubscriberAction(values, editingItem?.id)

    if (res.success) {
      const msg = editingItem ? "Atnaujinta!" : "Pridėta!"
      toast.success(msg)
      onSuccess()
    } else {
      form.setError("root", {
        type: "server",
        message: res.error,
      })
    }
  }

  const dialogTitle = editingItem ? "Redaguoti abonentą" : "Naujas abonentas"
  const isSubmitting = form.formState.isSubmitting
  const submitBtnText = isSubmitting ? "Saugoma..." : "Išsaugoti"
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription className="hidden">
            Abonento formos pildymas
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-2"
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vardas</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
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
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Miestas</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pasirinkite miestą" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem
                            key={city.id ?? city.name}
                            value={city.name}
                          >
                            {city.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="street"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gatvė</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="houseNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Namo nr.</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apartmentNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Buto nr.</FormLabel>
                    <FormControl>
                      <Input {...field} disabled={isSubmitting} />
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
                      <Input {...field} disabled={isSubmitting} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ticketNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abonento Nr.</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isLoadingNumber || isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {rootError && (
              <div className="p-2 text-sm text-red-600 bg-red-100 rounded-md">
                {rootError.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {submitBtnText}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
