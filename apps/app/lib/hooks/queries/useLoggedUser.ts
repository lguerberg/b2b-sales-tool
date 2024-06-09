'use client'

import { MeResponse } from '@api/infrastructure/schemas/auth/me.schema'
import api from '@app/lib/api'
import { useQuery } from '@tanstack/react-query'

export default function useLoggedUser() {
  const { data: loggedUser, isLoading } = useQuery({
    queryKey: ['LoggedUser'],
    queryFn: async () => {
      const response = await api.get<MeResponse>('auth/me')
      return response.data
    },
  })
  return { loggedUser, isLoading }
}
