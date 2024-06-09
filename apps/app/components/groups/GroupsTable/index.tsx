'use client'

import { DataTable } from '@app/components/table'
import useMyGroups from '@app/lib/hooks/queries/useMyGroups'
import { ReloadIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import GroupDetails from './GroupDetails'
import { columns } from './columns'

export default function GroupsTable() {
  const { groups, isLoading, page, isFetching, setPage } = useMyGroups()

  const [groupSelected, setGroupSelected] = useState('')

  if (isLoading || isFetching || groups === undefined) return <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />

  return (
    <>
      <div className="h-screen">
        <DataTable
          columns={columns(setGroupSelected)}
          data={groups.data || []}
          paginate
          onNextPage={() => setPage(page + 1)}
          onPreviousPage={() => setPage(page - 1)}
          isFirstPage={page === 0}
          hasMoreResults={groups.hasMore}
        />
      </div>
      <GroupDetails open={groupSelected !== ''} groupId={groupSelected} onClose={() => setGroupSelected('')} />
    </>
  )
}
