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

type IProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  isFloat?: boolean
  disabled?: boolean
}

export function NumberField<T extends FieldValues>(props: IProps<T>) {
  const { control, name, label, isFloat = false, disabled } = props

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type="number"
              step={isFloat ? "0.01" : "1"}
              {...field}
              onChange={(e) => {
                const val = e.target.value
                field.onChange(
                  isFloat ? parseFloat(val) || 0 : parseInt(val, 10) || 0
                )
              }}
              disabled={disabled}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
