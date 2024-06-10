'use client'

import {
  RowSelectionState,
  Updater,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  selectRowsFn,
  useReactTable,
} from '@tanstack/react-table'
import { useEffect, useMemo, useState } from 'react'

import { Button } from '../ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { DataTableProps } from './types'

export function DataTable<TData, TValue>({
  columns,
  data,
  paginate = false,
  onNextPage = () => {},
  onPreviousPage = () => {},
  onRowSelect,
  hasMoreResults,
  isFirstPage,
}: DataTableProps<TData, TValue>) {
  const includeSelect = useMemo(() => !!columns.find(c => c.id === 'select'), [columns])
  const [rowSelection, setRowSelection] = useState({})

  const handleNextPage = () => {
    onNextPage()
    table.nextPage()
  }

  const handlePreviousPage = () => {
    onPreviousPage()
    table.previousPage()
  }

  useEffect(() => {
    if (onRowSelect) {
      const selectedRows = table
        .getRowModel()
        .rows.filter(row => row.getIsSelected())
        .map(row => parseInt(row.id))
      onRowSelect(selectedRows.map(rowId => (data[rowId] as { id: string })['id']))
    }
  }, [rowSelection])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: includeSelect ? setRowSelection : undefined,
    getPaginationRowModel: paginate ? getPaginationRowModel() : undefined,
    state: {
      rowSelection: includeSelect ? rowSelection : undefined,
    },
  })

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  className="cursor-pointer"
                  key={row.id}
                  data-state={includeSelect ? row.getIsSelected() && 'selected' : undefined}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {paginate && (
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            className="cursor-pointer"
            size="sm"
            onClick={handlePreviousPage}
            disabled={isFirstPage}
          >
            Previous
          </Button>
          <Button
            className="cursor-pointer"
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!hasMoreResults}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
