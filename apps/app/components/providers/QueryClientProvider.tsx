'use client'

import { QueryClientProvider as Provider, QueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const QueryClientProvider = ({ children }: { children: React.ReactNode }) => {
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
