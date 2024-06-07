'use client'

import TextButton from '@app/components/buttons/TextButton'
import FormInput from '@app/components/form/FormInput'
import FormWrapper from '@app/components/form/FormWrapper'
import { Card } from '@app/components/ui/card'
import { FormField } from '@app/components/ui/form'
import useLoginForm from '@app/lib/hooks/forms/useLoginForm'

export default function Login() {
  const { form, loading, onSubmit } = useLoginForm()

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="flex h-screen w-full items-center justify-center">
        <Card className="mx-auto w-full max-w-md p-10">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => <FormInput label="Email" placeholder="jdoe@gmail.com" {...field} />}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => <FormInput type="password" label="Password" {...field} />}
          />
          <TextButton type="submit" className="w-full mt-5" loading={loading}>
            Login
          </TextButton>
        </Card>
      </div>
    </FormWrapper>
  )
}
