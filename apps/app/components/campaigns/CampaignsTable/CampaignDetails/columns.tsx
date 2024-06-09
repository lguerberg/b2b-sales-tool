import { ColumnDef } from '@tanstack/react-table'

import { statusClasses } from '../columns'
import { CampaingEmailColumn } from '../types'

export const columns: ColumnDef<CampaingEmailColumn>[] = [
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('email')}</div>,
  },
  {
    id: 'Subject',
    accessorKey: 'Subject',
    header: () => <div className="text-center">Subject</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('subject')}</div>,
  },
  {
    id: 'body',
    accessorKey: 'body',
    header: () => <div className="text-center">Body</div>,
    cell: ({ row }) => <div className="text-center text-ellipsis">{row.getValue('body')}</div>,
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
