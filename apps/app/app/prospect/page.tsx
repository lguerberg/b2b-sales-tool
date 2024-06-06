'use client'

import FormInput from '@app/components/form/FormInput'
import FormWrapper from '@app/components/form/FormWrapper'
import SectionSubtitle from '@app/components/titles/SectionSubtitle'
import SectionTitle from '@app/components/titles/SectionTitle'
import { FormField } from '@app/components/ui/form'
import useProspectForm from '@app/lib/hooks/useProspectForm'

import { SENIORITIES } from './constants'

export default function Prospect() {
  const { form, onSubmit } = useProspectForm()

  return (
    <div className="w-full">
      <div className="mb-5">
        <SectionTitle>Search for leads and save them in groups</SectionTitle>
      </div>
      <FormWrapper form={form} onSubmit={onSubmit} buttonText="Search">
        <SectionSubtitle>By person</SectionSubtitle>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 mt-3 mb-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => <FormInput label="Name" placeholder="John Doe" {...field} />}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => <FormInput label="Email" placeholder="jdoe@gmail.com" {...field} />}
          />
          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => <FormInput label="Job Title" placeholder="Head of Engineering" {...field} />}
          />
          <FormField
            control={form.control}
            name="seniority"
            render={({ field }) => (
              <FormInput
                label="Seniority"
                type="select"
                {...field}
                options={SENIORITIES.map(seniority => ({
                  label: seniority,
                  value: seniority,
                }))}
              />
            )}
          />
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => <FormInput label="Language" placeholder="English" {...field} />}
          />
        </div>
        <SectionSubtitle>By company</SectionSubtitle>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3 my-3">
          <FormField
            control={form.control}
            name="industry"
            render={({ field }) => <FormInput label="Industry" placeholder="Fintech" {...field} />}
          />
          <FormField
            control={form.control}
            name="hqLocation"
            render={({ field }) => <FormInput label="HQ Location" placeholder="Alabama" {...field} />}
          />
          <FormField
            control={form.control}
            name="companyType"
            render={({ field }) => <FormInput label="Company type" placeholder="For profit" {...field} />}
          />
          <FormField
            control={form.control}
            name="companySize"
            render={({ field }) => <FormInput label="Company size" placeholder="201-500" {...field} />}
          />
          <FormField
            control={form.control}
            name="isDecisionMaker"
            render={({ field }) => (
              <FormInput
                label="Only decision makers"
                description="Only show leads that are decision makers"
                placeholder="Yes"
                {...field}
              />
            )}
          />
        </div>
      </FormWrapper>
    </div>
  )
}
