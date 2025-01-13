'use client'
import { ConsentForm } from './ConsentForm'
import { RiskAssessmentResult } from '@/components/risk-assessment/RiskAssessmentResult'
import { ReportActions } from '@/components/risk-assessment/PDFReport'
import {
  RiskAssessmentModel,
  RiskData,
} from '@/hooks/queries/useRiskAssessment'
import { cn } from '@/lib/utils'
import { useMemo } from 'react'

export const RiskAssessmentReport = ({
  data,
  action,
  assessmentId,
  personalInfo,
  className,
  // TODO whether to hide the buttons
  // showActionButton = true,
}: {
  data?: Partial<RiskAssessmentModel>
  action?: React.ReactElement
  assessmentId?: string
  className?: string
  personalInfo?: any
  showActionButton?: boolean
}) => {
  const riskData = useMemo(
    () =>
      data?.responseData
        ? Object.assign({}, data?.responseData, data?.requestData)
        : {},
    [data]
  ) as RiskData

  return (
    <div className={cn('w-full', className)}>
      {data?.responseData && <RiskAssessmentResult data={riskData} />}
      <ConsentForm assessmentId={assessmentId} />

      {data?.responseData && (
        <ReportActions
          assessmentData={riskData}
          personalInfo={personalInfo}
          assessmentId={assessmentId}
        />
      )}
      {action}
    </div>
  )
}
