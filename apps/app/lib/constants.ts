export const ROUTES = {
  LOGIN: {
    name: 'login',
    path: '/login',
  },
  DASHBOARD: {
    name: 'Dashboard',
    path: '/',
  },
  CAMPAIGNS: {
    name: 'Campaigns',
    path: '/campaigns',
  },
  CAMPAIGN_DETAIL: {
    name: 'Campaign detail',
    path: '/campaigns/[id]',
  },
  INTEGRATIONS: {
    name: 'Integrations',
    path: '/integrations',
  },
  GROUPS: {
    name: 'Groups',
    path: '/groups',
  },
  GROUP_DETAIL: {
    name: 'Group detail',
    path: '/groups/[id]',
  },
  PROSPECT: {
    name: 'Prospect',
    path: '/prospect',
  },
  PROFILE: {
    name: 'Profile',
    path: '/profile',
  },
} as const
