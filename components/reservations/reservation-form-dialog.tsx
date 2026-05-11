"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
  DialogTrigger,
} from "@/components/ui/dialog"

import { borrowingSchema, type BorrowingDTO } from "@/dto/borrowing-dto"
import { saveBorrowingAction } from "@/actions/borrowing-actions"
import type { IBook } from "@/types/book-t"
import type { ISubscriber } from "@/types/subscriber-t"

interface Props {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  books: IBook[]
  subscribers: ISubscriber[]
  onSuccess: () => void
}

export function ReservationFormDialog({
  isOpen,
  onOpenChange,
  books,
  subscribers,
  onSuccess,
}: Props) {
  const form = useForm<BorrowingDTO>({
    resolver: zodResolver(borrowingSchema),
    mode: "onBlur",
    defaultValues: {
      subscriberId: "",
      bookId: "",
      borrowDate: new Date().toISOString().split("T")[0] ?? "",
      dueDate: "",
      isReturned: false,
    },
  })

  const onSubmit = async (values: BorrowingDTO) => {
    const res = await saveBorrowingAction(values)

    if (res.success) {
      toast.success("Rezervacija sėkmingai sukurta!")
      form.reset()
      onSuccess()
    } else {
      form.setError("root", { type: "server", message: res.error })
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const rootError = form.formState.errors.root

  const currentYear = new Date().getFullYear()
  const minDate = `${currentYear}-01-01`
  const maxDate = `${currentYear + 10}-12-31`

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-orange-600 hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Nauja registracija
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Knygos išdavimo registracija</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((v) => onSubmit(v))}
            className="space-y-4 pt-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="subscriberId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Abonentas</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pasirinkite abonentą" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subscribers.map((s) => (
                        <SelectItem
                          key={s.id ?? "unknown-sub"}
                          value={s.id ?? ""}
                        >
                          {s.firstName} {s.lastName} ({s.ticketNumber})
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
              name="bookId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Knyga</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pasirinkite knygą" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {books.map((b) => (
                        <SelectItem
                          key={b.id ?? "unknown-book"}
                          value={b.id ?? ""}
                        >
                          {b.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="borrowDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pasiėmimo data</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grąžinimo terminas</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        min={minDate}
                        max={maxDate}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

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
              {isSubmitting ? "Registruojama..." : "Registruoti išdavimą"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
