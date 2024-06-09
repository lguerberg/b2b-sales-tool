export type GroupDetailsProps = {
  open: boolean
  onClose: () => void
  groupId: string
}

export type DialogSteps = 'view_leads' | 'create_campaign'
