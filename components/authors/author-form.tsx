"use client"

import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorSchema, type AuthorDTO } from "@/dto/author-dto"
import {
  Form,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/parts/text-field"
import { Textarea } from "@/components/ui/textarea"
import { postApi, putApi } from "@/utils/server-api"

type IProps = {
  defaultValues?: AuthorDTO
  id?: string
  onComplete: (msg?: string) => void
}

export function AuthorForm(props: IProps) {
  const { defaultValues, id, onComplete } = props

  const form = useForm<AuthorDTO>({
    resolver: zodResolver(authorSchema),
    mode: "onBlur",
    values: defaultValues ?? {
      firstName: "",
      lastName: "",
      biography: "",
    },
  })

  async function onSubmit(values: AuthorDTO) {
    const res = id
      ? await putApi<{ message?: string; error?: string }>(
          `/api/authors/${id}`,
          values
        )
      : await postApi<{ message?: string; error?: string }>(
          "/api/authors",
          values
        )

    if (res && !res.error) {
      onComplete(res.message)
    } else {
      form.setError("root", {
        type: "manual",
        message: res?.error || "Įvyko klaida saugant duomenis",
      })
    }
  }

  const isSubmitting = form.formState.isSubmitting
  const rootError = form.formState.errors.root

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 pt-4"
        noValidate
      >
        <div className="grid grid-cols-2 gap-4">
          <TextField
            control={form.control}
            name="firstName"
            label="Vardas"
            placeholder="Vardas"
            disabled={isSubmitting}
          />
          <TextField
            control={form.control}
            name="lastName"
            label="Pavardė"
            placeholder="Pavardė"
            disabled={isSubmitting}
          />
        </div>

        <Controller
          control={form.control}
          name="biography"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className={fieldState.error ? "text-destructive" : ""}>
                Biografija
              </FormLabel>
              <FormControl>
                <Textarea
                  {...field}
                  value={field.value ?? ""}
                  className="resize-y"
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
          {isSubmitting ? "Saugoma..." : "Išsaugoti"}
        </Button>
      </form>
    </Form>
  )
}
