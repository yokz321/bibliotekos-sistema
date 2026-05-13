"use client"

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
import { saveSubscriberAction } from "@/actions/subscriber-actions"
import { subscriberSchema, type SubscriberDTO } from "@/dto/subscriber-dto"
import { SubscriberFormFields } from "./subscriber-form-fields"
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
  nextTicketNumber: string
}

export function SubscriberDialog(props: IProps) {
  const {
    isOpen,
    onOpenChange,
    editingItem,
    onSuccess,
    cities,
    subscriberTypes,
    nextTicketNumber,
  } = props

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
          ticketNumber: nextTicketNumber,
          city: "",
          street: "",
          houseNumber: "",
          apartmentNumber: "",
          phone: "",
          subscriberType: "",
          isActive: true,
        },
  })

  async function onSubmit(values: SubscriberDTO) {
    const res = await saveSubscriberAction(values, editingItem?.id)

    if (res.success) {
      toast.success(res.message || "Abonentas išsaugotas")
      onSuccess(res.message)
    } else {
      form.setError("root", { type: "server", message: res.error })
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {editingItem ? "Redaguoti abonentą" : "Naujas abonentas"}
          </DialogTitle>
          <DialogDescription className="hidden">
            Abonento formos pildymas
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
            <SubscriberFormFields
              form={form}
              cities={cities}
              subscriberTypes={subscriberTypes}
              isSubmitting={isSubmitting}
            />

            {rootError && (
              <div className="p-2 mt-4 text-sm text-red-600 bg-red-100 rounded-md">
                {rootError.message}
              </div>
            )}

            <Button
              type="submit"
              className="w-full mt-6 bg-orange-600 hover:bg-orange-700"
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
