"use client"

import type { UseFormReturn } from "react-hook-form"
import { TextField } from "@/components/parts/text-field"
import { SelectField } from "@/components/parts/select-field"
import { Checkbox } from "@/components/ui/checkbox"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import type { SubscriberDTO } from "@/dto/subscriber-dto"
import type { ICity } from "@/types/city-t"
import type { ISubscriberType } from "@/types/metadata-t"

type IProps = {
  form: UseFormReturn<SubscriberDTO>
  cities: ICity[]
  subscriberTypes: ISubscriberType[]
  isSubmitting: boolean
}

export function SubscriberFormFields(props: IProps) {
  const { form, cities, subscriberTypes, isSubmitting } = props

  return (
    <div className="space-y-4 pt-2">
      <div className="grid grid-cols-2 gap-4">
        <TextField
          control={form.control}
          name="firstName"
          label="Vardas"
          disabled={isSubmitting}
        />
        <TextField
          control={form.control}
          name="lastName"
          label="Pavardė"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          control={form.control}
          name="subscriberType"
          label="Abonento tipas"
          disabled={isSubmitting}
          options={subscriberTypes.map((t) => ({
            value: t.name,
            label: t.name,
          }))}
        />

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-end space-x-3 space-y-0 rounded-md border p-4 bg-slate-50/50">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={isSubmitting}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="cursor-pointer">
                  Aktyvus abonentas
                </FormLabel>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <SelectField
          control={form.control}
          name="city"
          label="Miestas"
          disabled={isSubmitting}
          options={cities.map((c) => ({ value: c.name, label: c.name }))}
        />
        <TextField
          control={form.control}
          name="street"
          label="Gatvė"
          disabled={isSubmitting}
        />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <TextField
          control={form.control}
          name="houseNumber"
          label="Namo nr."
          disabled={isSubmitting}
        />
        <TextField
          control={form.control}
          name="apartmentNumber"
          label="Buto nr."
          disabled={isSubmitting}
        />
        <TextField
          control={form.control}
          name="phone"
          label="Telefonas"
          disabled={isSubmitting}
        />
      </div>

      <TextField
        control={form.control}
        name="ticketNumber"
        label="Abonento Nr."
        disabled={isSubmitting}
      />
    </div>
  )
}
