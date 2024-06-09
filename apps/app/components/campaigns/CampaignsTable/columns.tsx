import { ColumnDef } from '@tanstack/react-table'

import { CampaignColumn } from './types'

export const statusClasses = {
  PENDING: 'text-orange-500',
  CREATING: 'text-blue-500',
  SENDING: 'text-purple-500',
  SENT: 'text-green-500',
}

export const columns: ColumnDef<CampaignColumn>[] = [
  {
    id: 'Name',
    accessorKey: 'Name',
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('name')}</div>,
  },
  {
    id: 'description',
    accessorKey: 'description',
    header: () => <div className="text-center">Description</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('description')}</div>,
  },
  {
    id: 'groupName',
    accessorKey: 'groupName',
    header: () => <div className="text-center">Group Name</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('groupName')}</div>,
  },
  {
    id: 'leads',
    accessorKey: 'leads',
    header: () => <div className="text-center">Leads count</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('leads')}</div>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <div className={`text-center font-bold ${statusClasses[row.getValue('status') as keyof typeof statusClasses]}`}>
        {row.getValue('status')}
      </div>
    ),
  },
]
