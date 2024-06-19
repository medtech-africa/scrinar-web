import React from 'react'
import { CSVLink } from 'react-csv'
import { csvHeaders } from './custom-header'

export const ExportAsCsv = ({
  data,
  fileName = 'health-risk-data',
}: {
  data: any
  fileName?: string
}) => {
  return (
    <CSVLink
      headers={csvHeaders}
      data={data ?? []}
      filename={`${fileName}.csv`}
      className="py-2"
    >
      Export to CSV
    </CSVLink>
  )
}
