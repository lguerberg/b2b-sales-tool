import { Campaign } from '../campaign'

export interface Group {
  id: string
  name: string
  description: string
  campaign: Campaign
}
