'use client'

import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
import { DataTable } from '@app/components/table'
import { useState } from 'react'

import CampaignDetails from './CampaignDetails'
import { columns } from './columns'
import { mockCampaigns } from './mock'

export default function CampaignsTable() {
  const [campaignSelected, setCampaignSelected] = useState<GetCampaignDetailsResponse | null>(null)

  const onCampaignSelect = (index: string) => {
    const campaign = mockCampaigns[parseInt(index)]
    if (campaign) {
      setCampaignSelected(campaign)
    }
  }

  return (
    <>
      <DataTable
        columns={columns}
        data={mockCampaigns.map(c => ({
          name: c.name,
          description: c.description,
          status: c.status,
          groupName: c.group.name,
          leads: c.emails.length,
        }))}
      />
      <CampaignDetails
        open={campaignSelected !== null}
        campaign={campaignSelected}
        onClose={() => setCampaignSelected(null)}
      />
    </>
  )
}
