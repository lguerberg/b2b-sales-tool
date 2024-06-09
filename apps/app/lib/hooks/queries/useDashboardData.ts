'use client'

import { GetUserMetricsResponse } from '@api/infrastructure/schemas/user/get-user-metrics.schema'
import api from '@app/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function useDashboardData() {
  const { data, isLoading } = useQuery({
    queryKey: ['DashboardData'],
    queryFn: async () => {
      const response = await api.get<GetUserMetricsResponse>('auth/me/metrics')
      return response.data
    },
    refetchInterval: 60000,
  })
  return { data, isLoading }
}
