import { GetLeadDetailsResponse } from '@api/infrastructure/schemas/lead/get-lead-details.schema'
import api from '@app/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function useGroupLeads(groupId: string) {
  const { data: leads, isLoading } = useQuery({
    queryKey: ['GroupLeads', groupId],
    queryFn: async () => {
      const response = await api.get<GetLeadDetailsResponse[]>(`groups/${groupId}/leads`)
      return response.data
    },
    enabled: groupId !== '',
  })
  return { leads, isLoading }
}
