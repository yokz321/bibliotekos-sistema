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
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import {
  saveSubscriberAction,
  getNextTicketNumberAction,
} from "@/actions/subscriber-actions"
import { subscriberSchema, type SubscriberDTO } from "@/dto/subscriber-dto"
import { TextField } from "@/components/parts/text-field"
import type { ISubscriber } from "@/types/subscriber-t"
import type { ICity } from "@/types/city-t"
import type { ISubscriberType } from "@/types/metadata-t"

type IProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingItem: ISubscriber | undefined
  onSuccess: (msg?: string) => void
  cities: ICity[]
  subscriberTypes: ISubscriberType[]
}

export function SubscriberDialog(props: IProps) {
  const {
    isOpen,
    onOpenChange,
    editingItem,
    onSuccess,
    cities,
    subscriberTypes,
  } = props

  const [isLoadingNumber, setIsLoadingNumber] = useState(false)
  const [generatedNumber, setGeneratedNumber] = useState("")

  const form = useForm<SubscriberDTO>({
    resolver: zodResolver(subscriberSchema),
    mode: "onBlur",
    values: editingItem
      ? {
          firstName: editingItem.firstName,
          lastName: editingItem.lastName,
          ticketNumber: editingItem.ticketNumber,
          city: editingItem.city,
          street: editingItem.street,
          houseNumber: editingItem.houseNumber,
          apartmentNumber: editingItem.apartmentNumber ?? "",
          phone: editingItem.phone,
          subscriberType: editingItem.subscriberType,
          isActive: editingItem.isActive,
        }
      : {
          firstName: "",
          lastName: "",
          ticketNumber: generatedNumber,
          city: "",
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          phone: "",
          subscriberType: "",
          isActive: true,
        },
  })

  useEffect(() => {
    if (isOpen && !editingItem) {
      const fetchNextNumber = async () => {
        setIsLoadingNumber(true)
        try {
          const nextNumber = await getNextTicketNumberAction()
          setGeneratedNumber(nextNumber)
        } finally {
          setIsLoadingNumber(false)
        }
      }
      fetchNextNumber()
    }
  }, [isOpen, editingItem])

  const onSubmit = async (values: SubscriberDTO) => {
    const res = await saveSubscriberAction(values, editingItem?.id)

    if (res.success) {
      toast.success(res.message || "Abonentas išsaugotas")
      onSuccess(res.message)
    } else {
      form.setError("root", {
        type: "server",
        message: res.error,
      })
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open) setGeneratedNumber("")
    onOpenChange(open)
  }

  const dialogTitle = editingItem ? "Redaguoti abonentą" : "Naujas abonentas"
  const isSubmitting = form.formState.isSubmitting
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
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
              <TextField
                control={form.control}
                name="firstName"
                label="Vardas"
                disabled={isSubmitting}
              />
              <TextField
                control={form.control}
                name="lastName"
                label="Pavardė"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="subscriberType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Abonento tipas</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isSubmitting}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pasirinkite tipą" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {(subscriberTypes ?? []).map((type) => (
                          <SelectItem key={type.id} value={type.name}>
                            {type.name}
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
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4 bg-slate-50/50">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="cursor-pointer">
                        Aktyvus abonentas
                      </FormLabel>
                    </div>
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
              <TextField
                control={form.control}
                name="street"
                label="Gatvė"
                disabled={isSubmitting}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <TextField
                control={form.control}
                name="houseNumber"
                label="Namo nr."
                disabled={isSubmitting}
              />
              <TextField
                control={form.control}
                name="apartmentNumber"
                label="Buto nr."
                disabled={isSubmitting}
              />
              <TextField
                control={form.control}
                name="phone"
                label="Telefonas"
                disabled={isSubmitting}
              />
            </div>

            <TextField
              control={form.control}
              name="ticketNumber"
              label="Abonento Nr."
              disabled={isLoadingNumber || isSubmitting}
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
              {isSubmitting ? "Saugoma..." : "Išsaugoti"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
