import { IconPicker } from '@/components/ui/icon-picker'
import { useHealthRiskData } from '@/hooks/queries/useHealthData'
import React from 'react'
import { CSVLink } from 'react-csv'
import { csvHeaders } from './custom-header'

export const ExportAsCsv = () => {
  const { data, isLoading } = useHealthRiskData()

  const dataToExport = data?.data
  return !isLoading ? (
    <CSVLink
      headers={csvHeaders}
      data={dataToExport ?? []}
      filename={'health-risk-data.csv'}
      className="py-2"
    >
      Export to CSV
    </CSVLink>
  ) : (
    <>
      <IconPicker icon="loader2" size="1rem" className="mr-2" />
      Please wait
    </>
  )
}
