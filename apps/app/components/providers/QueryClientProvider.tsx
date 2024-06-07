'use client'

import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import { useToast } from '../ui/use-toast'

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { toast } = useToast()

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  )
  return <Provider client={queryClient}>{children}</Provider>
}
