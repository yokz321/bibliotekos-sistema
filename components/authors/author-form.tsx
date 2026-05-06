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
    defaultValues: defaultValues || { name: "", biography: "" },
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
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Vardas Pavardė</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="Įveskite autoriaus vardą"
                  aria-invalid={fieldState.invalid}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="biography"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Biografija</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  value={field.value ?? ""}
                  placeholder="Trumpa biografija (nebūtina)"
                  aria-invalid={fieldState.invalid}
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
