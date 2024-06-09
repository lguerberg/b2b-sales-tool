'use client'

import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
import { DataTable } from '@app/components/table'
import useMyCampaigns from '@app/lib/hooks/queries/useMyCampaigns'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import CampaignDetails from './CampaignDetails'
import { columns } from './columns'

export default function CampaignsTable() {
  const { campaigns, isLoading } = useMyCampaigns()

  const [campaignSelected, setCampaignSelected] = useState<GetCampaignDetailsResponse | null>(null)

  if (isLoading || campaigns === undefined) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />

  return (
    <>
      <DataTable
        columns={columns}
        data={campaigns.map(c => ({
          name: c.name || 'test',
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
