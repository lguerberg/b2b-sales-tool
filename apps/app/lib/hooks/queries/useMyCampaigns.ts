'use client'

import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
import { Paginated } from '@api/infrastructure/types/paginate'
import api from '@app/lib/api'
import { PAGE_SIZE } from '@app/lib/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function useMyCampaigns() {
  const [page, setPage] = useState(0)
  const {
    data: campaigns,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['MyCampaigns', page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await api.get<Paginated<GetCampaignDetailsResponse>>(
        `me/campaigns?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`,
      )
      return response.data
    },
    refetchInterval: 10000,
  })
  return { campaigns, isLoading, isFetching, page, setPage }
}
