'use client'

import {
  EditCampaignMessageBody,
  editCampaignMessageBody,
} from '@api/infrastructure/schemas/campaign/edit-campaign-message.schema'
import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import useMessageEdit from '../mutations/useMessageEdit'

export default function useEditMessageForm(
  campaignId: string,
  email: GetCampaignDetailsResponse['emails'][0],
  onEditSuccess: () => void,
) {
  const { editMessage, isEditing } = useMessageEdit(campaignId, email.lead.id, onEditSuccess)

  const form = useForm<
    EditCampaignMessageBody & {
      subject: string
      email: string
    }
  >({
    resolver: zodResolver(editCampaignMessageBody),
    defaultValues: {
      message: '',
      subject: '',
      email: '',
    },
  })

  const { reset } = form

  useEffect(() => {
    if (email) {
      reset({
        message: email.message ?? '',
        subject: email.subject ?? '',
        email: email.lead.email ?? '',
      })
    }
  }, [email, reset])

  const onSubmit = (values: EditCampaignMessageBody) => editMessage(values)

  return { form, isEditing, onSubmit }
}
