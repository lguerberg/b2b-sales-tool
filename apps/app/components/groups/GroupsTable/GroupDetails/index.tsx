import { Dialog, DialogContent } from '@app/components/ui/dialog'
import { useState } from 'react'

import CampaignCreate from './components/CampaignCreate'
import GroupLeads from './components/GroupLeads'
import { DialogSteps, GroupDetailsProps } from './types'

export default function GroupDetails({ open, onClose, groupId }: GroupDetailsProps) {
  const [currentStep, setCurrentStep] = useState<DialogSteps>('view_leads')

  const handleOpenChange = () => {
    if (open) {
      setCurrentStep('view_leads')
      onClose()
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="h-[512px]">
        {currentStep === 'view_leads' ? (
          <GroupLeads groupId={groupId} onCampaignCreateClick={() => setCurrentStep('create_campaign')} />
        ) : (
          <CampaignCreate groupId={groupId} onCreateSuccess={handleOpenChange} />
        )}
      </DialogContent>
    </Dialog>
  )
}
