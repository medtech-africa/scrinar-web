import { Button, ButtonProps } from '@/components/ui/button'
import React from 'react'
import ExcelJS from 'exceljs'
import { flatten as flat } from 'flat'

export const ExportAsExcelParent = ({
  data,
  fileName = 'health-risk-data',
  excelHeaders,
}: {
  data: any
  fileName?: string
  title?: string
  excelHeaders: {
    header: string
    key: string
    width?: number
    parentId?: string
  }[]
} & ButtonProps) => {
  const riskData = data ?? []

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()

    const worksheet = workbook.addWorksheet('Demographics')
    const nutritionWorksheet = workbook.addWorksheet('Nutrition')
    const riskyBehaviorWorksheet = workbook.addWorksheet('Risky Behaviour')
    const healthHygieneWorksheet = workbook.addWorksheet('Health hygiene')
    const healthMaintenanceWorksheet =
      workbook.addWorksheet('Health maintenance')
    const idealBodyWorksheet = workbook.addWorksheet('Ideal body')
    const ncdWorksheet = workbook.addWorksheet('NCD')
    const genderHouseholdRoleWorksheet = workbook.addWorksheet(
      'Gender household role'
    )
    const ncdRiskFactorWorksheet = workbook.addWorksheet('Ncd risk factor')
    const physicalActivityWorksheet = workbook.addWorksheet('Physical activity')

    // Add custom data
    riskData?.forEach((item: any) => {
      const {
        nutrition,
        riskyBehavior,
        healthHygiene,
        healthMaintenance,
        idealBody,
        ncd,
        genderHouseholdRole,
        ncdRiskFactor,
        physicalActivity,
        ...demographics
      } = item

      const dataObjects = {
        nutrition,
        riskyBehavior,
        healthHygiene,
        healthMaintenance,
        idealBody,
        ncd,
        genderHouseholdRole,
        ncdRiskFactor,
        physicalActivity,
        demographics,
      }

      const workSheetMapper = {
        nutrition: nutritionWorksheet,
        riskyBehavior: riskyBehaviorWorksheet,
        healthHygiene: healthHygieneWorksheet,
        healthMaintenance: healthMaintenanceWorksheet,
        idealBody: idealBodyWorksheet,
        ncd: ncdWorksheet,
        genderHouseholdRole: genderHouseholdRoleWorksheet,
        ncdRiskFactor: ncdRiskFactorWorksheet,
        physicalActivity: physicalActivityWorksheet,
        demographics: worksheet,
      }

      type DataObjectsType = typeof dataObjects
      type EntriesType = {
        [K in keyof DataObjectsType]: [K, DataObjectsType[K]]
      }[keyof DataObjectsType]

      for (const [sheetName, data] of Object.entries(
        dataObjects
      ) as EntriesType[]) {
        const isNotGroupedInObject = sheetName === 'demographics'

        const worksheetCurrent = workSheetMapper[sheetName]

        if (isNotGroupedInObject) {
          worksheetCurrent.columns = excelHeaders?.filter(
            (header) => !header.parentId
          )
        } else {
          // Define custom headers (ensure each dataset uses consistent headers if needed)
          worksheetCurrent.columns = excelHeaders.filter(
            (header) => header.parentId === sheetName
          )
        }

        // Add rows for the current dataset
        worksheetCurrent.addRow(
          flat(isNotGroupedInObject ? data : { [sheetName]: data })
        )
      }

      // worksheet.addRow(flat(item))
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
      type="button"
      role="menuitem"
    >
      Export to Excel
    </Button>
  )
}

export const ExportAsExcelStudent = ({
  data,
  fileName = 'health-risk-data',
  excelHeaders,
}: {
  data: any
  fileName?: string
  title?: string
  excelHeaders: {
    header: string
    key: string
    width?: number
    studentId?: string
  }[]
} & ButtonProps) => {
  const riskData = data ?? []

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()

    const worksheet = workbook.addWorksheet('Demographics')
    const nutritionWorksheet = workbook.addWorksheet('Nutrition')
    const healthHygieneWorksheet = workbook.addWorksheet('Health hygiene')
    const healthMaintenanceWorksheet =
      workbook.addWorksheet('Health maintenance')
    const idealBodyWorksheet = workbook.addWorksheet('Ideal body')
    const ncdWorksheet = workbook.addWorksheet('NCD')
    const ncdRiskFactorWorksheet = workbook.addWorksheet('Ncd risk factor')
    const physicalActivityWorksheet = workbook.addWorksheet('Physical activity')
    // Add custom data
    riskData?.forEach((item: any) => {
      const {
        nutrition,
        healthHygiene,
        healthServices,
        idealBody,
        ncd,
        ncdRiskFactor,
        physicalActivity,
        ...demographics
      } = item

      const dataObjects = {
        nutrition,
        healthHygiene,
        healthServices,
        idealBody,
        ncd,
        ncdRiskFactor,
        physicalActivity,
        demographics,
      }
      const workSheetMapper = {
        nutrition: nutritionWorksheet,
        healthHygiene: healthHygieneWorksheet,
        healthServices: healthMaintenanceWorksheet,
        idealBody: idealBodyWorksheet,
        ncd: ncdWorksheet,
        ncdRiskFactor: ncdRiskFactorWorksheet,
        physicalActivity: physicalActivityWorksheet,
        demographics: worksheet,
      }

      type DataObjectsType = typeof dataObjects
      type EntriesType = {
        [K in keyof DataObjectsType]: [K, DataObjectsType[K]]
      }[keyof DataObjectsType]

      for (const [sheetName, data] of Object.entries(
        dataObjects
      ) as EntriesType[]) {
        const isNotGroupedInObject = sheetName === 'demographics'

        const worksheetCurrent = workSheetMapper[sheetName]
        if (isNotGroupedInObject) {
          worksheetCurrent.columns = excelHeaders?.filter(
            (header) => !header.studentId
          )
        } else {
          // Define custom headers (ensure each dataset uses consistent headers if needed)
          worksheetCurrent.columns = excelHeaders.filter(
            (header) => header.studentId === sheetName
          )
        }
        // Add rows for the current dataset
        worksheetCurrent.addRow(
          flat(isNotGroupedInObject ? data : { [sheetName]: data })
        )
      }

      // worksheet.addRow(flat(item))
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
      type="button"
      role="menuitem"
    >
      Export to Excel
    </Button>
  )
}
export const ExportAsExcelBase = ({
  data,
  fileName = 'health-risk-data',
  excelHeaders,
  title,
}: {
  data: any
  fileName?: string
  title?: string
  excelHeaders: any
} & ButtonProps) => {
  const riskData = data ?? []

  const exportToExcel = async () => {
    const workbook = new ExcelJS.Workbook()

    const worksheet = workbook.addWorksheet(title || 'Custom Sheet')

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
      type="button"
      role="menuitem"
    >
      Export to Excel
    </Button>
  )
}
