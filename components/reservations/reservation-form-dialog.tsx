"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Form,
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { borrowingSchema, type BorrowingDTO } from "@/dto/borrowing-dto"
import { TextField } from "@/components/parts/text-field"
import { postApi } from "@/utils/server-api"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"

type IProps = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  books: IBook[]
  subscribers: ISubscriber[]
  onSuccess: (msg?: string) => void
}

export function ReservationFormDialog(props: IProps) {
  const { isOpen, onOpenChange, books, subscribers, onSuccess } = props

  const form = useForm<BorrowingDTO>({
    resolver: zodResolver(borrowingSchema),
    mode: "onBlur",
    values: {
      subscriberId: "",
      bookId: "",
      borrowDate: new Date().toISOString().split("T")[0] ?? "",
      dueDate: "",
      isReturned: false,
    },
  })

  const onSubmit = async (values: BorrowingDTO) => {
    const res = await postApi<{ message?: string; error?: string }>(
      "/api/borrowings",
      values
    )

    if (res && !res.error) {
      toast.success(res.message || "Rezervacija sukurta")
      form.reset()
      onSuccess(res.message)
    } else {
      form.setError("root", {
        type: "server",
        message: res?.error || "Klaida saugant",
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const currentYear = new Date().getFullYear()
  const minDate = `${currentYear}-01-01`
  const maxDate = `${currentYear + 10}-12-31`

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Knygos išdavimas</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 pt-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="subscriberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abonentas</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pasirinkite..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subscribers.map((s) => (
                        <SelectItem key={s.id} value={s.id}>
                          {s.firstName} {s.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <TextField
                control={form.control}
                name="borrowDate"
                label="Pasiėmimo data"
                type="date"
                min={minDate}
                max={maxDate}
                disabled={isSubmitting}
              />
              <TextField
                control={form.control}
                name="dueDate"
                label="Grąžinimo terminas"
                type="date"
                min={minDate}
                max={maxDate}
                disabled={isSubmitting}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-600 hover:bg-orange-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Registruojama..." : "Registruoti išdavimą"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
