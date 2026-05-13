"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { publisherSchema, type PublisherDTO } from "@/dto/publisher-dto"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { TextField } from "@/components/parts/text-field"
import type { IPublisher } from "@/types/publisher-t"
import { postApi, putApi } from "@/utils/server-api"

type IProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingPublisher: IPublisher | undefined
  onSuccess: (msg?: string) => void
}

export function PublisherFormDialog(props: IProps) {
  const { isOpen, onOpenChange, editingPublisher, onSuccess } = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PublisherDTO>({
    resolver: zodResolver(publisherSchema),
    mode: "onBlur",
    values: {
      name: editingPublisher?.name ?? "",
      location: editingPublisher?.location ?? "",
    },
  })

  const onSubmit = async (values: PublisherDTO) => {
    setIsSubmitting(true)

    const res = editingPublisher
      ? await putApi<{ message?: string; error?: string }>(
          `/api/publishers/${editingPublisher.id}`,
          values
        )
      : await postApi<{ message?: string; error?: string }>(
          "/api/publishers",
          values
        )

    if (res && !res.error) {
      toast.success(res.message || "Leidykla išsaugota!")
      onSuccess(res.message)
    } else {
      form.setError("root", {
        type: "manual",
        message: res?.error || "Įvyko klaida saugant duomenis",
      })
    }

    setIsSubmitting(false)
  }

  const dialogTitle = editingPublisher
    ? "Redaguoti leidyklą"
    : "Pridėti leidyklą"
  const submitBtnText = isSubmitting ? "Saugoma..." : "Išsaugoti"
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Įveskite leidyklos duomenis.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
            noValidate
          >
            <TextField
              control={form.control}
              name="name"
              label="Pavadinimas"
              placeholder="Leidyklos pavadinimas"
              disabled={isSubmitting}
            />

            <TextField
              control={form.control}
              name="location"
              label="Miestas / Adresas"
              placeholder="Miestas (nebūtina)"
              disabled={isSubmitting}
            />

            {rootError && (
              <div className="p-2 text-sm font-medium text-red-500 bg-red-50 border border-red-200 rounded-md">
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
