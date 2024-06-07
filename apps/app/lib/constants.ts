export const ROUTES = {
  LOGIN: {
    name: 'login',
    path: '/login',
    private: false,
  },
  DASHBOARD: {
    name: 'Dashboard',
    path: '/',
    private: true,
  },
  CAMPAIGNS: {
    name: 'Campaigns',
    path: '/campaigns',
    private: true,
  },
  CAMPAIGN_DETAIL: {
    name: 'Campaign detail',
    path: '/campaigns/[id]',
    private: true,
  },
  INTEGRATIONS: {
    name: 'Integrations',
    path: '/integrations',
    private: true,
  },
  GROUPS: {
    name: 'Groups',
    path: '/groups',
    private: true,
  },
  GROUP_DETAIL: {
    name: 'Group detail',
    path: '/groups/[id]',
    private: true,
  },
  PROSPECT: {
    name: 'Prospect',
    path: '/prospect',
    private: true,
  },
  PROFILE: {
    name: 'Profile',
    path: '/profile',
    private: true,
  },
} as const

export const USER_COOKIE = 'auth_token'
