import { SelectInputProps } from '@app/components/inputs/SelectInput/types'

export type FormInputProps = {
  label: string
  placeholder?: string
  description?: string
  type?: 'text' | 'select' | 'checkbox' | 'password'
  value: any
  onChange: (value: any) => void
  options?: SelectInputProps['options']
  disabled?: boolean
}
