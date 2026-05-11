"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorSchema, type AuthorDTO } from "@/dto/author-dto"
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
import { Textarea } from "@/components/ui/textarea"
import { saveAuthorAction } from "@/actions/author-actions"

interface AuthorFormProps {
  defaultValues?: AuthorDTO
  id?: string
  onComplete: () => void
}

const EMPTY_AUTHOR: AuthorDTO = {
  firstName: "",
  lastName: "",
  biography: "",
}

export function AuthorForm({ defaultValues, id, onComplete }: AuthorFormProps) {
  const form = useForm<AuthorDTO>({
    resolver: zodResolver(authorSchema),
    mode: "onBlur",
    defaultValues: defaultValues || EMPTY_AUTHOR,
  })

  async function onSubmit(values: AuthorDTO) {
    const res = await saveAuthorAction(values, id)

    if (res.success) {
      onComplete()
    } else {
      form.setError("root", {
        type: "manual",
        message: res.error,
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const submitBtnText = isSubmitting ? "Saugoma..." : "Išsaugoti"
  const rootError = form.formState.errors.root

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vardas</FormLabel>
                <FormControl>
                  <Input {...field} />
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
                  <Input {...field} />
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
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="resize-y"
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
  )
}
