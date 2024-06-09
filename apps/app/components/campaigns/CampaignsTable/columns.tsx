import { GetCampaignDetailsResponse } from '@api/infrastructure/schemas/campaign/get-campaign-details.schema'
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

const statusClasses = {
  PENDING: 'text-orange-500',
  CREATING: 'text-blue-500',
  SENDING: 'text-purple-500',
  SENT: 'text-green-500',
}

export const columns: (
  onEditCampaign: (campaignId: string) => void,
) => ColumnDef<GetCampaignDetailsResponse>[] = onEditCampaign => [
  {
    id: 'id',
    accessorKey: 'id',
    hidden: true,
    header: () => <div className="text-center">Identifier</div>,
    cell: ({ row }) => <div className="text-center">{row.getValue('id')}</div>,
  },
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
    id: 'groupName',
    accessorKey: 'group',
    header: () => <div className="text-center">Group Name</div>,
    cell: ({ row }) => <div className="text-center">test</div>,
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
            <DropdownMenuItem className="cursor-pointer" onClick={() => onEditCampaign(row.getValue('id'))}>
              See details
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
