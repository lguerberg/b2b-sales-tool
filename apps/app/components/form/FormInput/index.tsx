import { SelectInput } from '@app/components/inputs/SelectInput'
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@app/components/ui/form'
import { Input } from '@app/components/ui/input'

import { FormInputProps } from './types'

export default function FormInput({
  label,
  placeholder,
  description,
  type = 'text',
  options,
  ...field
}: FormInputProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <>
          {type === 'text' && <Input placeholder={placeholder} {...field} />}
          {type === 'select' && <SelectInput options={options} />}
        </>
      </FormControl>
      {description && <FormDescription>{description}</FormDescription>}
      <FormMessage />
    </FormItem>
  )
}
