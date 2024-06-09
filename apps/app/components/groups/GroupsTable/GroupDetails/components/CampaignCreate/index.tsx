import TextButton from '@app/components/buttons/TextButton'
import FormInput from '@app/components/form/FormInput'
import FormWrapper from '@app/components/form/FormWrapper'
import { FormField } from '@app/components/ui/form'
import useCampaignCreateForm from '@app/lib/hooks/forms/useCampaignCreateForm'

import { CampaingCreateProps } from './types'

export default function CampaignCreate({ groupId }: CampaingCreateProps) {
  const { form, onSubmit } = useCampaignCreateForm(groupId)

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <div className="h-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => <FormInput label="Name" placeholder="Special discount" {...field} />}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormInput
                label="Description"
                placeholder="Promo for fintech only, 50% special discount just for this summer."
                {...field}
              />
            )}
          />
          <FormField
            control={form.control}
            name="subject"
            render={({ field }) => (
              <FormInput label="Subject" placeholder="Check this promo just for you!" {...field} />
            )}
          />
        </div>
        <div className="w-full">
          <TextButton type="submit" className="w-full mt-5">
            Create campaign
          </TextButton>
        </div>
      </div>
    </FormWrapper>
  )
}
