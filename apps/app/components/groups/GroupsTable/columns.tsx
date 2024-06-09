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

import { Group } from './types'

export const columns: (onViewLeads: (rowId: string) => void) => ColumnDef<Group>[] = onViewLeads => [
  {
    id: 'name',
    accessorKey: 'name',
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
            <DropdownMenuItem className="cursor-pointer" onClick={() => onViewLeads(row.id)}>
              View leads
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
