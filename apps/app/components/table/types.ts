import { ColumnDef } from '@tanstack/react-table'

export type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowSelect?: (rowId: string) => void
  paginate?: boolean
  onNextPage?: () => void
  onPreviousPage?: () => void
  isFirstPage?: boolean
  hasMoreResults?: boolean
}
