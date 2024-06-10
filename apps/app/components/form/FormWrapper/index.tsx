import TextButton from '@app/components/buttons/TextButton'
import { Form } from '@app/components/ui/form'

import { FormWrapperProps } from './types'

export default function FormWrapper({ buttonText, children, form, onSubmit }: FormWrapperProps) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {children}
        {buttonText && (
          <TextButton className="w-full mt-5" type="submit">
            {buttonText || 'Submit'}
          </TextButton>
        )}
      </form>
    </Form>
  )
}
