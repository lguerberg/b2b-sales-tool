import Typesense from 'typesense'

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

export const searchPropspects = async (params: Partial<ProspectSchema>, page: number) =>
  client
    .collections('leads')
    .documents()
    .search({
      q: '*',
      filter_by: Object.entries(params)
        .map(([key, value]) => `${key}:${value}`)
        .join(' && '),
      group_limit: 1,
      sort_by: 'desc',
      page: page,
      prefix: true,
      per_page: 18,
      num_typos: 2,
      min_len_1typo: 3,
      min_len_2typo: 6,
      typo_tokens_threshold: 3,
      drop_tokens_threshold: 3,
    })
