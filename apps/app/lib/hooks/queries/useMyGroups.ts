'use client'

import { GroupDTO } from '@api/infrastructure/schemas/group/dto'
import { Paginated } from '@api/infrastructure/types/paginate'
import api from '@app/lib/api'
import { PAGE_SIZE } from '@app/lib/constants'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export default function useMyGroups() {
  const [page, setPage] = useState(0)
  const {
    data: groups,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['MyGroups', page],
    placeholderData: keepPreviousData,
    queryFn: async () => {
      const response = await api.get<Paginated<GroupDTO>>(`me/groups?limit=${PAGE_SIZE}&offset=${page * PAGE_SIZE}`)
      return response.data
    },
  })
  return { groups, isLoading, page, isFetching, setPage }
}
