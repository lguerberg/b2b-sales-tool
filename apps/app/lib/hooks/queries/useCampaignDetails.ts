import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
import api from '@app/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function useCampaignDetails(campaignId: string) {
  const { data: campaign, isLoading } = useQuery({
    queryKey: ['CampaignDetails', campaignId],
    queryFn: async () => {
      const response = await api.get<GetCampaignDetailsResponse>(`campaigns/${campaignId}`)
      return response.data
    },
    enabled: campaignId !== '',
  })
  return { campaign, isLoading }
}
