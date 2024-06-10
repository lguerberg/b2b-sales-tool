import { CheckboxInput } from '@app/components/inputs/CheckboxInput'
import PasswordInput from '@app/components/inputs/PasswordInput'
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
  disabled,
  onChange,
  ...field
}: FormInputProps) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      {description && <FormDescription>{description}</FormDescription>}
      <FormControl>
        <>
          {type === 'text' && (
            <Input onChange={onChange} placeholder={placeholder} disabled={disabled} value={value} {...field} />
          )}
          {type === 'password' && <PasswordInput onChange={onChange} {...field} />}
          {type === 'select' && <SelectInput onChange={onChange} options={options} />}
          {type === 'checkbox' && <CheckboxInput onChange={onChange} value={value} />}
        </>
      </FormControl>
      <FormMessage />
    </FormItem>
  )
}
