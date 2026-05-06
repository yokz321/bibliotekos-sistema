"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorSchema, AuthorDTO } from "@/dto/author-dto"
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
import { saveAuthorAction } from "@/actions/author-actions"
import { toast } from "sonner"

interface AuthorFormProps {
  defaultValues?: AuthorDTO
  id?: string
  onComplete: () => void
}

export function AuthorForm({ defaultValues, id, onComplete }: AuthorFormProps) {
  const form = useForm<AuthorDTO>({
    resolver: zodResolver(authorSchema),
    defaultValues: defaultValues || {
      firstName: "",
      lastName: "",
      biography: "",
    },
  })

  async function onSubmit(values: AuthorDTO) {
    const res = await saveAuthorAction(values, id)
    if (res.success) {
      toast.success("Autorius išsaugotas!")
      onComplete()
    } else {
      toast.error(res.error || "Klaida išsaugant")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        {}
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vardas</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Įveskite vardą" />
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
                  <Input {...field} placeholder="Įveskite pavardę" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="biography"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Biografija</FormLabel>
              <FormControl>
                {}
                <textarea
                  {...field}
                  value={field.value ?? ""}
                  rows={5}
                  placeholder="Trumpa biografija (nebūtina)"
                  disabled={form.formState.isSubmitting}
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "Saugoma..." : "Išsaugoti"}
        </Button>
      </form>
    </Form>
  )
}
