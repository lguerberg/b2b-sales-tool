import { Dialog, DialogContent } from '@app/components/ui/dialog'
import { useState } from 'react'

import CampaignCreate from './components/CampaignCreate'
import GroupLeads from './components/GroupLeads'
import { DialogSteps, GroupDetailsProps } from './types'

const leads = [
  { name: 'Alice Johnson', role: 'Software Engineer', seniority: 'Junior' },
  { name: 'Bob Smith', role: 'Product Manager', seniority: 'Senior' },
  { name: 'Cathy Williams', role: 'Data Scientist', seniority: 'Mid' },
  { name: 'David Brown', role: 'UX Designer', seniority: 'Senior' },
  { name: 'Eva Davis', role: 'QA Engineer', seniority: 'Junior' },
  { name: 'Frank Miller', role: 'Backend Developer', seniority: 'Mid' },
  { name: 'Grace Wilson', role: 'DevOps Engineer', seniority: 'Senior' },
  { name: 'Hank Martinez', role: 'Mobile Developer', seniority: 'Junior' },
  { name: 'Ivy Anderson', role: 'Frontend Developer', seniority: 'Mid' },
  { name: 'Jack Thomas', role: 'Cloud Architect', seniority: 'Senior' },
  { name: 'Karen Lee', role: 'Database Administrator', seniority: 'Mid' },
  { name: 'Leo Perez', role: 'Technical Writer', seniority: 'Junior' },
  { name: 'Mona Clark', role: 'Cybersecurity Specialist', seniority: 'Senior' },
  { name: 'Nina Lewis', role: 'Business Analyst', seniority: 'Mid' },
  { name: 'Oscar Walker', role: 'Scrum Master', seniority: 'Senior' },
  { name: 'Paula Hall', role: 'System Administrator', seniority: 'Mid' },
  { name: 'Quinn Young', role: 'Network Engineer', seniority: 'Junior' },
  { name: 'Rachel Allen', role: 'AI Engineer', seniority: 'Senior' },
  { name: 'Steve King', role: 'Machine Learning Engineer', seniority: 'Mid' },
  { name: 'Tina Wright', role: 'Full Stack Developer', seniority: 'Senior' },
  { name: 'Uma Scott', role: 'SEO Specialist', seniority: 'Junior' },
  { name: 'Victor Green', role: 'Content Strategist', seniority: 'Mid' },
  { name: 'Wendy Adams', role: 'Graphic Designer', seniority: 'Senior' },
  { name: 'Xander Baker', role: 'Operations Manager', seniority: 'Mid' },
  { name: 'Yara Edwards', role: 'Sales Engineer', seniority: 'Senior' },
  { name: 'Zachary Turner', role: 'IT Support Specialist', seniority: 'Junior' },
  { name: 'Amber Morris', role: 'Project Coordinator', seniority: 'Mid' },
  { name: 'Brian Rogers', role: 'Marketing Specialist', seniority: 'Junior' },
  { name: 'Cynthia Reed', role: 'Customer Success Manager', seniority: 'Senior' },
  { name: 'Dennis Collins', role: 'Technical Support Engineer', seniority: 'Mid' },
]

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
          <GroupLeads leads={leads} onCampaignCreateClick={() => setCurrentStep('create_campaign')} />
        ) : (
          <CampaignCreate groupId={groupId} />
        )}
      </DialogContent>
    </Dialog>
  )
}
