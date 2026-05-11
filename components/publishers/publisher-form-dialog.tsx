"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { publisherSchema, PublisherDTO } from "@/dto/publisher-dto"
import { savePublisherAction } from "@/actions/publisher-actions"
import { toast } from "sonner"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { IPublisher } from "@/types/publisher-t"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingPublisher: IPublisher | undefined
  onSuccess: () => void
}

const EMPTY_PUBLISHER: PublisherDTO = {
  name: "",
  location: "",
}

export function PublisherFormDialog({
  isOpen,
  onOpenChange,
  editingPublisher,
  onSuccess,
}: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PublisherDTO>({
    resolver: zodResolver(publisherSchema),
    mode: "onBlur",
    defaultValues: EMPTY_PUBLISHER,
  })

  useEffect(() => {
    if (!isOpen) return

    if (editingPublisher) {
      form.reset({
        ...editingPublisher,
        location: editingPublisher.location ?? "",
      } as PublisherDTO)
    } else {
      form.reset(EMPTY_PUBLISHER)
    }
  }, [editingPublisher, isOpen, form])

  const onSubmit = async (values: PublisherDTO) => {
    setIsSubmitting(true)
    const res = await savePublisherAction(values, editingPublisher?.id)

    if (res.success) {
      const msg = editingPublisher
        ? "Leidykla atnaujinta!"
        : "Leidykla pridėta!"
      toast.success(msg)
      onSuccess()
    } else {
      form.setError("root", { type: "manual", message: res.error })
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
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Nauja leidykla
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Įveskite leidyklos duomenis.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pavadinimas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Leidyklos pavadinimas"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Miestas / Adresas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Miestas (nebūtina)"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
