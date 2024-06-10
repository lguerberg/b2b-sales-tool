import Typesense from 'typesense'

import { PAGE_SIZE } from './constants'
import { ProspectSchema } from './schemas/prospect'

const client = new Typesense.Client({
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_HOST || '',
      port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT || '8000'),
      protocol: process.env.NEXT_PUBLIC_TYPESENSE_PROTOCOL || 'https',
    },
  ],
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_API_KEY || '',
  connectionTimeoutSeconds: 2,
})

export const KEY_TO_FILTER = (value: string | number | boolean) => ({
  name: `name: ${value}`,
  email: `email: ${value}`,
  jobTitle: `jobTitle: ${value}`,
  seniority: `seniority:= ${value}`,
  language: `language:= ${value}`,
  industry: `industry: ${value}`,
  hqLocation: `hqLocation: ${value}`,
  companyType: `companyType: ${value}`,
  companySize: `companySize:= ${value}`,
  isDecisionMaker: `isDecisionMaker:= ${value === 'TRUE'}`,
})

export const searchLeads = async (params: Partial<ProspectSchema>, page: number) =>
  client
    .collections<ProspectSchema>('leads')
    .documents()
    .search({
      q: '*',
      filter_by: Object.entries(params)
        .filter(([_, value]) => value !== '' && value !== undefined)
        .map(([key, value]) => KEY_TO_FILTER(value)[key as keyof typeof KEY_TO_FILTER])
        .join(' && '),
      page,
      per_page: PAGE_SIZE,
      num_typos: 2,
      min_len_2typo: 6,
      typo_tokens_threshold: 3,
      drop_tokens_threshold: 3,
    })
