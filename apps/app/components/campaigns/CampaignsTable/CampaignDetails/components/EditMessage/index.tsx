import TextButton from '@app/components/buttons/TextButton'
import FormInput from '@app/components/form/FormInput'
import FormWrapper from '@app/components/form/FormWrapper'
import { FormField } from '@app/components/ui/form'
import useEditMessageForm from '@app/lib/hooks/forms/useEditMessageForm'

import { EditMessageProps } from './types'

export default function EditMessage({ campaignId, email, onSuccess }: EditMessageProps) {
  const { onSubmit, isEditing, form } = useEditMessageForm(campaignId, email, onSuccess)

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="items-center justify-center">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => <FormInput label="Message" {...field} />}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => <FormInput disabled label="Subject" {...field} />}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => <FormInput disabled label="Email" {...field} />}
        />
        <TextButton type="submit" className="w-full mt-5" loading={isEditing}>
          Edit
        </TextButton>
      </div>
    </FormWrapper>
  )
}
