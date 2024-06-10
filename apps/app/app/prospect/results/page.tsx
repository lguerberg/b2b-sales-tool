'use client'

import TextButton from '@app/components/buttons/TextButton'
import FormInput from '@app/components/form/FormInput'
import FormWrapper from '@app/components/form/FormWrapper'
import { DataTable } from '@app/components/table'
import { Dialog, DialogContent } from '@app/components/ui/dialog'
import { FormField } from '@app/components/ui/form'
import useGroupCreateForm from '@app/lib/hooks/forms/useGroupCreateForm'
import useLeadsSearch from '@app/lib/hooks/queries/useLeadsSearch'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

import { columns } from './columns'

export default function ProspectResults() {
  const [isCreatingGroup, setIsCreatingGroup] = useState(false)
  const { form, isCreating, onSubmit, setLeadIds, leadIds } = useGroupCreateForm()

  const params = useSearchParams()
  const { leads, isLoading } = useLeadsSearch({
    name: params.get('name') || undefined,
    email: params.get('email') || undefined,
    jobTitle: params.get('jobTitle') || undefined,
    seniority: params.get('seniority') || undefined,
    language: params.get('language') || undefined,
    industry: params.get('industry') || undefined,
    hqLocation: params.get('hqLocation') || undefined,
    companyType: params.get('companyType') || undefined,
    companySize: params.get('companySize') || undefined,
    isDecisionMaker: params.get('isDecisionMaker') === 'TRUE' || undefined,
  })

  if (isLoading) {
    return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
  }

  return (
    <>
      <div className="flex flex-col gap-5">
        <TextButton loading={isCreating} disabled={leadIds.length === 0} onClick={() => setIsCreatingGroup(true)}>
          Create group
        </TextButton>
        <DataTable columns={columns} data={leads?.hits?.map(hit => hit.document) || []} onRowSelect={setLeadIds} />
      </div>
      <Dialog open={isCreatingGroup} onOpenChange={() => setIsCreatingGroup(false)}>
        <DialogContent className="h-[512px]">
          <FormWrapper form={form} onSubmit={onSubmit}>
            <div className="h-full flex flex-col items-center justify-between">
              <div className="w-full flex flex-col gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => <FormInput label="Name" placeholder="Fintech" {...field} />}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormInput
                      label="Description"
                      placeholder="Potential fintech leads to target in spring."
                      {...field}
                    />
                  )}
                />
              </div>
              <TextButton type="submit" className="w-full mt-5" loading={isCreating}>
                Create group
              </TextButton>
            </div>
          </FormWrapper>
        </DialogContent>
      </Dialog>
    </>
  )
}
