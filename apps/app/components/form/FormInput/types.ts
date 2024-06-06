export type FormInputProps = {
  label: string
  placeholder?: string
  description?: string
  type?: 'text' | 'select'
  options?: {
    label: string
    value: string
  }[]
}
