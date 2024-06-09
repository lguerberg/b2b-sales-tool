'use client'

import { DataTable } from '@app/components/table'
import useMyCampaigns from '@app/lib/hooks/queries/useMyCampaigns'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import CampaignDetails from './CampaignDetails'
import { columns } from './columns'

export default function CampaignsTable() {
  const { campaigns, isLoading, isFetching, page, setPage } = useMyCampaigns()

  const [campaignSelected, setCampaignSelected] = useState('')

  if (isLoading || isFetching || campaigns === undefined) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />

  return (
    <>
      <div className="h-screen">
        <DataTable
          columns={columns(setCampaignSelected)}
          data={campaigns.data || []}
          paginate
          onNextPage={() => setPage(page + 1)}
          onPreviousPage={() => setPage(page - 1)}
          isFirstPage={page === 0}
          hasMoreResults={campaigns.hasMore}
        />
      </div>
      <CampaignDetails
        open={campaignSelected !== ''}
        campaignId={campaignSelected}
        onClose={() => setCampaignSelected('')}
      />
    </>
  )
}
