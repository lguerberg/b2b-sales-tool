import { ProspectSchema } from '@app/lib/schemas/prospect'
import { searchLeads } from '@app/lib/typesense'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function useLeadsSearch(values: Partial<ProspectSchema>) {
  const [page, setPage] = useState(0)
  const { data: leads, isLoading } = useQuery({
    queryKey: ['Leads', page, values],
    queryFn: async () =>
      searchLeads(
        {
          ...values,
          isDecisionMaker: !values.isDecisionMaker ? undefined : (values.isDecisionMaker as any) === 'TRUE',
        },
        page,
      ),
  })
  return { leads, isLoading, page, setPage }
}
