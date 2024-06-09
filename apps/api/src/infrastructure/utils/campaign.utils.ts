export const filterByMonthIndex = (campaigns: { createdAt: Date }[], monthIndex: number) =>
  campaigns.filter(campaign => campaign.createdAt.getMonth() === monthIndex)
