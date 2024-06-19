import React from 'react'
import { CSVLink } from 'react-csv'
import { csvHeaders } from './custom-header'

export const ExportAsCsv = ({ data }: { data: any }) => {
  return (
    <CSVLink
      headers={csvHeaders}
      data={data ?? []}
      filename={'health-risk-data.csv'}
      className="py-2"
    >
      Export to CSV
    </CSVLink>
  )
}
