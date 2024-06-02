import { ApiRouter } from '@api/router'
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client'

export const trpc = createTRPCProxyClient<ApiRouter>({
  links: [
    httpBatchLink({
      // TODO: Move to env var
      url: 'http://localhost:4000/trpc',
    }),
  ],
})
