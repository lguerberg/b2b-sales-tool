import { ColumnDef } from '@tanstack/react-table'

import { Group } from './types'

export const columns: ColumnDef<Group>[] = [
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
]
