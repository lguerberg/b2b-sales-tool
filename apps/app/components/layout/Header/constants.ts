import { ROUTES } from '@app/lib/constants'

export const HEADER_ITEMS = [
  {
    id: ROUTES.DASHBOARD.name,
    path: ROUTES.DASHBOARD.path,
  },
  {
    id: ROUTES.PROSPECT.name,
    path: ROUTES.PROSPECT.path,
  },
  {
    id: ROUTES.GROUPS.name,
    path: ROUTES.GROUPS.path,
  },
  {
    id: ROUTES.CAMPAIGNS.name,
    path: ROUTES.CAMPAIGNS.path,
  },
  {
    id: ROUTES.INTEGRATIONS.name,
    path: ROUTES.INTEGRATIONS.path,
  },
] as const
