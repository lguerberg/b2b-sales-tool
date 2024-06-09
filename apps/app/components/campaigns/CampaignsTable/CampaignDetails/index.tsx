import MetricsCard from '@app/components/dashboard/MetricsCard'
import { DataTable } from '@app/components/table'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@app/components/ui/dialog'
import { ScrollArea } from '@app/components/ui/scroll-area'
import { Headset, Mail, MailOpen, MousePointerClick } from 'lucide-react'

import { columns } from './columns'
import { CampaignDetailsProps } from './types'

export default function CampaignDetails({ campaign, open, onClose }: CampaignDetailsProps) {
  const handleOpenChange = () => {
    if (open) {
      onClose()
    }
  }

  if (!campaign) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-max p-5">
        <DialogHeader>
          <DialogTitle className="text-lg">Campaign details</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-5 md:flex-row">
          <div className="flex-1 h-72">
            <DialogDescription className="text-md mb-1">Emails sent</DialogDescription>
            <ScrollArea className="h-full">
              <DataTable
                data={campaign.emails.map(email => ({
                  subject: email.subject,
                  email: 'test@test.com',
                  body: email.message,
                  status: email.status,
                }))}
                columns={columns}
              />
            </ScrollArea>
          </div>
          <div className="flex-1">
            <DialogDescription className="text-md mb-1">Current results</DialogDescription>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <MetricsCard title={'Emails sent'} Icon={Mail}>
                <div>{campaign.analytics.emailsSentCount}</div>
              </MetricsCard>
              <MetricsCard title={'Emails opened'} Icon={MailOpen}>
                <div>{campaign.analytics.emailsOpenedCount}</div>
              </MetricsCard>
              <MetricsCard title={'Emails clicked'} Icon={MousePointerClick}>
                <div>{campaign.analytics.emailsClickedCount}</div>
              </MetricsCard>
              <MetricsCard title={'Meetings scheduled'} Icon={Headset}>
                <div>{campaign.analytics.meetingsScheduledCount}</div>
              </MetricsCard>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
