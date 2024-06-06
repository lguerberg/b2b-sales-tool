import { CheckboxInput } from '@app/components/inputs/CheckboxInput'
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
  value,
  onChange,
  ...field
}: FormInputProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {description && <FormDescription>{description}</FormDescription>}
      <FormControl>
        <>
          {type === 'text' && <Input placeholder={placeholder} {...field} />}
          {type === 'select' && <SelectInput options={options} />}
          {type === 'checkbox' && <CheckboxInput value={value} onChange={onChange} />}
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
