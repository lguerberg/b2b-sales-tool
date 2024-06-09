import { Button } from '@app/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@app/components/ui/dropdown-menu'
import { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'

import { CampaingEmailColumn } from '../types'

const statusClasses = {
  PENDING: 'text-orange-500',
  FAILED: 'text-red-500',
  SENDING: 'text-purple-500',
  SUCCESS: 'text-green-500',
}

export const columns: (
  onEditMessageClick: (emailId: string) => void,
) => ColumnDef<CampaingEmailColumn>[] = onEditMessageClick => [
  {
    id: 'id',
    accessorKey: 'id',
    hidden: true,
    header: () => <div>Identifier</div>,
    cell: ({ row }) => <div>{row.getValue('id')}</div>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <div>Name</div>,
    accessorFn: row => row.name,
    cell: ({ row }) => <div className="text-ellipsis">{row.getValue('name')}</div>,
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: () => <div>Status</div>,
    accessorFn: row => row.status,
    cell: ({ row }) => (
      <div className={`font-bold ${statusClasses[row.getValue('status') as keyof typeof statusClasses]}`}>
        {row.getValue('status')}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              disabled={row.getValue('status') !== 'PENDING'}
              className="cursor-pointer"
              onClick={() => onEditMessageClick(row.getValue('id'))}
            >
              Edit message
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
