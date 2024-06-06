import { UseFormReturn } from 'react-hook-form'

export type FormWrapperProps = {
  form: UseFormReturn<any>
  onSubmit: (values: any) => void
  children: React.ReactNode
}
