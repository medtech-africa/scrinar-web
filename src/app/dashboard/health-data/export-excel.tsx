import { Button } from '@/components/ui/button'
import { useHealthRiskData } from '@/hooks/queries/useHealthData'
import React from 'react'
import ExcelJS from 'exceljs'
import { excelHeaders } from './custom-header'
import flat from 'flat'

export const ExportAsExcel = () => {
  const { data, isLoading } = useHealthRiskData()

  const riskData = data?.data ?? []
  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Custom Sheet')

    // Define custom headers
    worksheet.columns = excelHeaders

    // Add custom data
    riskData?.forEach((item: any) => {
      worksheet.addRow(flat(item))
    })

    // Generate a buffer containing the Excel file
    const buffer = await workbook.xlsx.writeBuffer()

    // Create a Blob for downloading
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    })
    const url = window.URL.createObjectURL(blob)

    // Create a link to trigger the download
    const a = document.createElement('a')
    a.href = url
    a.download = 'health-risk-data.xlsx'
    a.click()
  }
  return (
    <Button
      className="bg-transparent text-black p-0 py-2 mt-2 text-base hover:bg-transparent active:bg-transparent focus:bg-transparent"
      loading={isLoading}
      onClick={exportToExcel}
    >
      Export to excel
    </Button>
  )
}
