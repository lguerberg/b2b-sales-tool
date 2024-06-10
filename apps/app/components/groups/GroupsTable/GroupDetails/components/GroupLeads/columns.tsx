import { ColumnDef } from '@tanstack/react-table'

import { GroupLeadColumn } from '../../../types'

export const seniorityText = {
  JR: 'Junior',
  SSR: 'Semi-Senior',
  SR: 'Senior',
  STAFF: 'Staff',
  MANAGER: 'Manager',
  C_LEVEL: 'C-Level',
}

export const seniorityClasses = {
  JR: 'text-blue-400',
  SSR: 'text-green-400',
  SR: 'text-yellow-400',
  STAFF: 'text-orange-400',
  MANAGER: 'text-red-400',
  C_LEVEL: 'text-purple-400',
}

export const columns: ColumnDef<GroupLeadColumn>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    accessorFn: row => row.name,
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('name')}</div>,
  },
  {
    id: 'jobTitle',
    accessorKey: 'jobTitle',
    accessorFn: row => row.jobTitle,
    header: () => <div className="text-center">Job Title</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('jobTitle')}</div>,
  },
  {
    id: 'seniority',
    accessorKey: 'seniority',
    accessorFn: row => row.seniority,
    header: () => <div className="text-center">Seniority</div>,
    cell: ({ row }) => (
      <div
        className={`text-center font-bold ${seniorityClasses[row.getValue('seniority') as keyof typeof seniorityClasses]}`}
      >
        {seniorityText[row.getValue('seniority') as keyof typeof seniorityText]}
      </div>
    ),
  },
]
