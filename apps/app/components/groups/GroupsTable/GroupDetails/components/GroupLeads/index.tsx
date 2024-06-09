import TextButton from '@app/components/buttons/TextButton'
import { DataTable } from '@app/components/table'
import { DialogDescription, DialogHeader, DialogTitle } from '@app/components/ui/dialog'
import { ScrollArea } from '@app/components/ui/scroll-area'
import { Skeleton } from '@app/components/ui/skeleton'
import useGroupLeads from '@app/lib/hooks/queries/useGroupLeads'

import { columns } from './columns'
import { GroupLeadsProps } from './types'

export default function GroupLeads({ groupId, onCampaignCreateClick }: GroupLeadsProps) {
  const { leads, isLoading } = useGroupLeads(groupId)
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg">Group details</DialogTitle>
        <DialogDescription className="text-md">
          Here is a list of the leads in this group. You can create a campaign for them.
        </DialogDescription>
      </DialogHeader>
      {isLoading || leads === undefined ? (
        <Skeleton className="w-full h-[300px] rounded" />
      ) : (
        <ScrollArea className="h-72 rounded-md border">
          <DataTable
            columns={columns}
            data={leads.map(lead => ({
              name: `${lead.firstName} ${lead.lastName}`,
              seniority: lead.currentPosition.seniority,
              jobTitle: lead.currentPosition.jobTitle,
            }))}
          />
        </ScrollArea>
      )}
      <TextButton className="w-full mt-5" onClick={onCampaignCreateClick}>
        Configure campaign
      </TextButton>
    </>
  )
}
