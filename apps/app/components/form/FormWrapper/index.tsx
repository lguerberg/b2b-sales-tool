import { Button } from '@app/components/ui/button'
import { Form } from '@app/components/ui/form'

import { FormWrapperProps } from './types'

export default function FormWrapper({ children, form, onSubmit }: FormWrapperProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
      <Button className="mt-5" type="submit">
        Submit
      </Button>
    </Form>
  )
}
