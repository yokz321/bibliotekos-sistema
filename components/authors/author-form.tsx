"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { authorSchema, AuthorDTO } from "@/dto/author-dto"
import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { TextField } from "@/components/parts/text-field"
import { saveAuthor } from "@/actions/author-actions"
import { toast } from "sonner"

export function AuthorForm({ defaultValues, id, onComplete }: any) {
  const form = useForm<AuthorDTO>({
    resolver: zodResolver(authorSchema),
    defaultValues: defaultValues || { name: "", biography: "" },
  })

  async function onSubmit(values: AuthorDTO) {
    await saveAuthor(values, id)
    toast.success("Išsaugota!")
    onComplete()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
        <TextField control={form.control} name="name" label="Vardas Pavardė" />
        <TextField control={form.control} name="biography" label="Biografija" />
        <Button type="submit" className="w-full bg-orange-600">
          Išsaugoti
        </Button>
      </form>
    </Form>
  )
}
