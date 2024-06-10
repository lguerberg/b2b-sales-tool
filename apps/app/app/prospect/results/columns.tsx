import {
  seniorityClasses,
  seniorityText,
} from '@app/components/groups/GroupsTable/GroupDetails/components/GroupLeads/columns'
import { Checkbox } from '@app/components/ui/checkbox'
import { ProspectSchema } from '@app/lib/schemas/prospect'
import { ColumnDef } from '@tanstack/react-table'

import { COMPANY_SIZES } from '../constants'

export const columns: ColumnDef<ProspectSchema>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
        onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={value => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: () => <div className="text-center">Name</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('name')}</div>,
  },
  {
    id: 'jobTitle',
    accessorKey: 'jobTitle',
    header: () => <div className="text-center">Job Title</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('jobTitle')}</div>,
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: () => <div className="text-center">Email</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('email')}</div>,
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
  {
    id: 'language',
    accessorKey: 'language',
    header: () => <div className="text-center">Language</div>,
    cell: ({ row }) => <div className="text-center">{(row.getValue('language') as string).toUpperCase()}</div>,
  },
  {
    id: 'industry',
    accessorKey: 'industry',
    header: () => <div className="text-center">Industry</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('industry')}</div>,
  },
  {
    id: 'hqLocation',
    accessorKey: 'hqLocation',
    header: () => <div className="text-center">HQ Location</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('hqLocation')}</div>,
  },
  {
    id: 'companyType',
    accessorKey: 'companyType',
    header: () => <div className="text-center">Company Type</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('companyType')}</div>,
  },
  {
    id: 'companySize',
    accessorKey: 'companySize',
    header: () => <div className="text-center">Company Size</div>,
    cell: ({ row }) => (
      <div className="text-center">{COMPANY_SIZES[row.getValue('companySize') as keyof typeof COMPANY_SIZES]}</div>
    ),
  },
  {
    id: 'isDecisionMaker',
    accessorKey: 'isDecisionMaker',
    header: () => <div className="text-center">Is Decision Maker</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('isDecisionMaker') ? 'Yes' : 'No'}</div>,
  },
]
