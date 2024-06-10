import { PAGE_SIZE } from '@app/lib/constants'
import { ProspectSchema } from '@app/lib/schemas/prospect'
import { searchLeads } from '@app/lib/typesense'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function useLeadsSearch(values: Partial<ProspectSchema>) {
  const [page, setPage] = useState(0)
  const { data: leads, isLoading } = useQuery({
    queryKey: ['Leads', page, values],
    queryFn: async () => searchLeads(values, page),
  })
  return { leads, isLoading, page, setPage, hasMore: (leads?.found || 0) > (page + 1) * PAGE_SIZE }
}
