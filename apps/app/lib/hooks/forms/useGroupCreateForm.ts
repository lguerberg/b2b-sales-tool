'use client'

import { CreateGroupBody, createGroupBody } from '@api/infrastructure/schemas/group/create-group.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import useGroupCreate from '../mutations/useGroupCreate'

export default function useGroupCreateForm() {
  const { createGroup, isCreating } = useGroupCreate()
  const form = useForm<CreateGroupBody>({
    resolver: zodResolver(createGroupBody),
    defaultValues: {
      name: '',
      description: '',
      leadsIds: [],
    },
  })

  const onSubmit = (values: CreateGroupBody) => createGroup(values)

  const setLeadIds = (leadIds: string[]) => {
    form.reset({ ...form.getValues(), leadsIds: leadIds })
  }

  return { form, isCreating, onSubmit, setLeadIds, leadIds: form.getValues('leadsIds') }
}
