import React from 'react'
import { TableCell, TableRow } from './ui/table'
import Skeleton from 'react-loading-skeleton'

const TableLoader = ({ row = 6 }) => {
  return (
    <TableRow className="font-normal text-sm text-grey-600">
      {Array(row)
        .fill(null)
        .map((__, _) => (
          <TableCell key={_}>
            <Skeleton borderRadius={8} className="h-5 !w-[90px] mb-4" />
            <Skeleton borderRadius={8} className="h-5 !w-[80px] mb-4" />
            <Skeleton borderRadius={8} className="h-5 !w-[80px] mb-4" />
            <Skeleton borderRadius={8} className="h-5 !w-[80px] mb-4" />
          </TableCell>
        ))}
    </TableRow>
  )
}

export default TableLoader
