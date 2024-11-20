import React from 'react'
import { CSVLink } from 'react-csv'

export const ExportAsCsv = ({
  data,
  fileName = 'health-risk-data',
  csvHeaders,
}: {
  data: any
  fileName?: string
  csvHeaders: any
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
