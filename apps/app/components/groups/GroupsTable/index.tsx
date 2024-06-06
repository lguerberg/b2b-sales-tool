'use client'

import { DataTable } from '@app/components/table'
import { useState } from 'react'

import GroupDetails from './GroupDetails'
import { columns } from './columns'

export default function GroupsTable() {
  const [groupSelected, setGroupSelected] = useState('')
  return (
    <>
      <DataTable
        columns={columns}
        onRowSelect={setGroupSelected}
        data={[
          { id: '1', name: 'Group 1', description: 'Description 1' },
          { id: '2', name: 'Group 2', description: 'Description 2' },
          { id: '3', name: 'Group 3', description: 'Description 3' },
          { id: '4', name: 'Group 4', description: 'Description 4' },
          { id: '5', name: 'Group 5', description: 'Description 5' },
        ]}
      />
      <GroupDetails open={groupSelected !== ''} groupId={groupSelected} onClose={() => setGroupSelected('')} />
    </>
  )
}
