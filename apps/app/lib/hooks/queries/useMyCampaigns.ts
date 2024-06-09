'use client'

import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
import api from '@app/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function useMyCampaigns() {
  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['MyCampaigns'],
    queryFn: async () => {
      const response = await api.get<GetCampaignDetailsResponse[]>('me/campaigns')
      return response.data
    },
  })
  return { campaigns, isLoading }
}
