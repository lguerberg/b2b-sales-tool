'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { ProspectSchema, prospectSchema } from '../../schemas/prospect'

export default function useProspectForm() {
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
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return { form, onSubmit }
}
