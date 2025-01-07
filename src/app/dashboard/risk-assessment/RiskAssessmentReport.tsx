'use client'
import { ConsentForm } from './ConsentForm'
import { RiskAssessmentResult } from '@/components/risk-assessment/RiskAssessmentResult'
import { ReportActions } from '@/components/risk-assessment/PDFReport'
import { RiskAssessmentModel } from '@/hooks/queries/useRiskAssessment'
import { cn } from '@/lib/utils'

export const RiskAssessmentReport = ({
  data,
  action,
  assessmentId,
  personalInfo,
  className,
  // TODO whether to hide the buttons
  // showActionButton = true,
}: {
  data?: RiskAssessmentModel
  action?: React.ReactElement
  assessmentId?: string
  className?: string
  personalInfo?: any
  showActionButton?: boolean
}) => {
  return (
    <div className={cn('w-full', className)}>
      {data?.responseData && <RiskAssessmentResult data={data?.responseData} />}
      <ConsentForm assessmentId={assessmentId} />

      {data?.responseData && (
        <ReportActions
          assessmentData={data?.responseData}
          personalInfo={personalInfo}
          assessmentId={assessmentId}
        />
      )}
      {action}
    </div>
  )
}
