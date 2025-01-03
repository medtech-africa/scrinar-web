import React from 'react'
import { TableCell, TableRow } from './ui/table'
import { Text } from './ui/text'
import { cn } from '@/lib/utils'

const TableEmptyState = ({
  row = 6,
  title,
  action,
  className,
}: {
  row?: number
  className?: string
  title?: React.ReactNode
  action?: React.ReactNode
}) => {
  return (
    <TableRow className="font-normal text-sm text-grey-600">
      <TableCell
        colSpan={row}
        align="center"
        className={cn('min-h-48', className)}
      >
        <Text className="">{title}</Text>
        <Text className="">{action}</Text>
      </TableCell>
    </TableRow>
  )
}

export default TableEmptyState
