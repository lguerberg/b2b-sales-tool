import MetricsCard from '@app/components/dashboard/MetricsCard'
import { DataTable } from '@app/components/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@app/components/ui/dialog'
import { ScrollArea } from '@app/components/ui/scroll-area'
import useCampaignDetails from '@app/lib/hooks/queries/useCampaignDetails'
import { Headset, Mail, MailOpen, MousePointerClick } from 'lucide-react'
import { useMemo, useState } from 'react'

import { columns } from './columns'
import EditMessage from './components/EditMessage'
import { CampaignDetailsProps } from './types'

export default function CampaignDetails({ open, onClose, campaignId }: CampaignDetailsProps) {
  const { campaign, isLoading } = useCampaignDetails(campaignId)
  const [messageToEditId, setMessageToEditId] = useState('')

  const messageToEdit = useMemo(() => {
    return campaign?.emails.find(email => email.id === messageToEditId)
  }, [messageToEditId, campaign])

  const handleOpenChange = () => {
    if (open) {
      onClose()
    }
  }

  if (!campaign) return null

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="p-5">
        <DialogHeader>
          <DialogTitle className="text-lg">Campaign details</DialogTitle>
          <DialogDescription className="text-md">
            {' '}
            Check you campaign results and edit non-send messages.{' '}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-5">
          <div className="flex-1">
            <ScrollArea className="h-[150px] md:h-[300px]">
              {messageToEdit ? (
                <EditMessage campaignId={campaignId} email={messageToEdit} onSuccess={() => setMessageToEditId('')} />
              ) : (
                <DataTable
                  data={campaign.emails.map(email => ({
                    id: email.id,
                    name: email.lead.name,
                    status: email.status,
                  }))}
                  columns={columns(setMessageToEditId)}
                />
              )}
            </ScrollArea>
          </div>
          <div className="flex-1">
            <DialogDescription className="text-md mb-1">Current results</DialogDescription>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <MetricsCard isLoading={isLoading} title={'Emails sent'} Icon={Mail}>
                <div>{campaign.analytics.emailsSentCount}</div>
              </MetricsCard>
              <MetricsCard isLoading={isLoading} title={'Emails opened'} Icon={MailOpen}>
                <div>{campaign.analytics.emailsOpenedCount}</div>
              </MetricsCard>
              <MetricsCard isLoading={isLoading} title={'Emails clicked'} Icon={MousePointerClick}>
                <div>{campaign.analytics.emailsClickedCount}</div>
              </MetricsCard>
              <MetricsCard isLoading={isLoading} title={'Meetings scheduled'} Icon={Headset}>
                <div>{campaign.analytics.meetingsScheduledCount}</div>
              </MetricsCard>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
