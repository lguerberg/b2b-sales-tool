'use client'

import { CreateCampaignBody, createCampaignBody } from '@api/infrastructure/schemas/group/create-group-campaign.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export default function useCampaignCreateForm(groupId: string) {
  const form = useForm<CreateCampaignBody>({
    resolver: zodResolver(createCampaignBody),
    defaultValues: {
      name: '',
      subject: '',
      description: '',
    },
  })

  const onSubmit = (values: CreateCampaignBody) => {}

  return { form, onSubmit }
}
