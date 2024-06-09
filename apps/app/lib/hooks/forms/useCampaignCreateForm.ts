'use client'

import { CreateCampaignBody, createCampaignBody } from '@api/infrastructure/schemas/group/create-group-campaign.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import useCampaignCreate from '../mutations/useCampaignCreate'

export default function useCampaignCreateForm(groupId: string) {
  const { createCampaign, isCreating } = useCampaignCreate(groupId)

  const form = useForm<CreateCampaignBody>({
    resolver: zodResolver(createCampaignBody),
    defaultValues: {
      name: '',
      subject: '',
      description: '',
    },
  })

  const onSubmit = (values: CreateCampaignBody) => createCampaign(values)

  return { form, isCreating, onSubmit }
}
