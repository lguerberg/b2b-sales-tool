import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'

export type CampaignDetailsProps = {
  open: boolean
  campaign: GetCampaignDetailsResponse | null
  onClose: () => void
}
