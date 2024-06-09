import { z } from 'zod'

import { getCampaignDetailsResponse } from './get-campaign-details.schema'

export const getMyCampaignsResponse = z.array(getCampaignDetailsResponse)

export type GetMyCampaignsResponse = z.infer<typeof getMyCampaignsResponse>
