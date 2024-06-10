export type SelectInputProps = {
  onChange: (value: string) => void
  options?: {
    label: string
    value: string | number | boolean
  }[]
}
