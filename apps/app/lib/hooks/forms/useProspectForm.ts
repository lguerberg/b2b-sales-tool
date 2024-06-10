'use client'

import { ROUTES } from '@app/lib/constants'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { ProspectSchema, prospectSchema } from '../../schemas/prospect'

export default function useProspectForm() {
  const router = useRouter()
  const form = useForm<ProspectSchema>({
    resolver: zodResolver(prospectSchema),
    defaultValues: {
      name: '',
      email: '',
      jobTitle: '',
      seniority: '',
      language: '',
      industry: '',
      hqLocation: '',
      companyType: '',
      companySize: '',
      isDecisionMaker: false,
    },
  })

  const onSubmit = (values: ProspectSchema) => {
    router.push(
      ROUTES.PROSPECT_RESULTS.path +
        '?' +
        new URLSearchParams({
          ...values,
          isDecisionMaker: values.isDecisionMaker ? 'TRUE' : 'FALSE',
        }).toString(),
    )
  }

  return { form, onSubmit }
}
