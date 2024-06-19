import { Button } from '@/components/ui/button'
import React from 'react'
import ExcelJS from 'exceljs'
import { excelHeaders } from './custom-header'
import { flatten as flat } from 'flat'

export const ExportAsExcel = ({
  data,
  fileName = 'health-risk-data',
}: {
  data: any
  fileName?: string
}) => {
  const riskData = data ?? []
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
    a.download = `${fileName}.xlsx`
    a.click()
  }
  return (
    <Button
      className="bg-transparent text-black p-0 py-2 mt-2 text-base hover:bg-transparent active:bg-transparent focus:bg-transparent"
      onClick={exportToExcel}
    >
      Export to Excel
    </Button>
  )
}
