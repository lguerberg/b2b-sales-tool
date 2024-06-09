import TextButton from '@app/components/buttons/TextButton'
import { DialogDescription, DialogHeader, DialogTitle } from '@app/components/ui/dialog'
import { ScrollArea } from '@app/components/ui/scroll-area'

import { GroupLeadsProps } from './types'

export default function GroupLeads({ leads, onCampaignCreateClick }: GroupLeadsProps) {
  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-lg">Group details</DialogTitle>
        <DialogDescription className="text-md">
          Here is a list of the leads in this group. You can create a campaign for them.
        </DialogDescription>
      </DialogHeader>
      <ScrollArea className="h-72 rounded-md border">
        {leads.map((lead, index) => (
          <div key={index} className="flex justify-between items-center p-2 border-b border-gray-200">
            <div className="flex-1 text-left text-sm font-semibold text-gray-700">{lead.name}</div>
            <div className="flex-1 text-center text-sm text-gray-500">{lead.role}</div>
            <div
              className={`flex-1 text-right text-sm font-medium ${lead.seniority === 'Senior' ? 'text-red-500' : lead.seniority === 'Mid' ? 'text-yellow-500' : 'text-green-500'}`}
            >
              {lead.seniority}
            </div>
          </div>
        ))}
      </ScrollArea>
      <TextButton className="w-full mt-5" onClick={onCampaignCreateClick}>
        Configure campaign
      </TextButton>
    </>
  )
}
