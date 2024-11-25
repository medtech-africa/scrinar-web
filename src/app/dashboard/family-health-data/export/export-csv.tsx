import React from 'react'
import { CSVLink } from 'react-csv'
import { LinkProps } from 'react-csv/components/Link'

export const ExportAsCsv = ({
  data,
  fileName = 'health-risk-data',
  csvHeaders,
}: {
  data: any
  fileName?: string
  csvHeaders: any
} & LinkProps) => {
  return (
    <CSVLink
      headers={csvHeaders}
      data={data ?? []}
      filename={`${fileName}.csv`}
      className="py-2"
      role="menuitem"
    >
      Export to CSV
    </CSVLink>
  )
}
