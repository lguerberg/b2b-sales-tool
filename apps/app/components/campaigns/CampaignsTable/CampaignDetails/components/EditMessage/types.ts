import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'

export type EditMessageProps = {
  campaignId: string
  email: GetCampaignDetailsResponse['emails'][0]
  onSuccess: () => void
}
