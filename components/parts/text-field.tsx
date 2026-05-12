"use client"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { Control, FieldValues, Path } from "react-hook-form"
import type { InputHTMLAttributes } from "react"

interface IProps<T extends FieldValues>
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "name"> {
  control: Control<T>
  name: Path<T>
  label: string
}

export function TextField<T extends FieldValues>(props: IProps<T>) {
  const { control, name, label, placeholder, type = "text", ...rest } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input type={type} placeholder={placeholder} {...field} {...rest} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
