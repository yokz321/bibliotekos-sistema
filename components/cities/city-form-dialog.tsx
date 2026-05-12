"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { citySchema, type CityDTO } from "@/dto/city-dto"
import { saveCityAction } from "@/actions/city-actions"
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
import type { ICity } from "@/types/city-t"

interface IProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  editingCity: ICity | undefined
  onSuccess: (msg?: string) => void
}

export function CityFormDialog(props: IProps) {
  const { isOpen, onOpenChange, editingCity, onSuccess } = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CityDTO>({
    resolver: zodResolver(citySchema),
    mode: "onBlur",
    values: {
      name: editingCity?.name ?? "",
    },
  })

  const onSubmit = async (values: CityDTO) => {
    setIsSubmitting(true)
    const res = await saveCityAction(values, editingCity?.id)

    if (res.success) {
      toast.success(res.message || "Operacija sėkminga")
      onSuccess(res.message)
    } else {
      form.setError("root", { type: "server", message: res.error })
    }
    setIsSubmitting(false)
  }

  const dialogTitle = editingCity ? "Redaguoti miestą" : "Pridėti miestą"
  const submitBtnText = isSubmitting ? "Saugoma..." : "Išsaugoti"
  const rootError = form.formState.errors.root

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Naujas miestas
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>Įveskite miesto pavadinimą.</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pavadinimas</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Miestas"
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
