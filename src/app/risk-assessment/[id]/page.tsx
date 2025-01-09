'use client'
import ContentLoader from '@/components/content-loader'
import { RiskAssessmentResult } from '@/components/risk-assessment/RiskAssessmentResult'
import { ReportActions } from '@/components/risk-assessment/PDFReport'
import Image from 'next/image'
import { TextArea } from '@/components/ui/textarea'
import { Text } from '@/components/ui/text'
import { useRiskAssessment } from '@/hooks/queries/useRiskAssessment'
import { useMemo } from 'react'

export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data: riskData, isPending: isLoading } = useRiskAssessment(params?.id)
  const providerNotes = riskData?.requestData?.providerNotes
  const data = useMemo(
    () =>
      riskData
        ? Object.assign(riskData?.responseData, riskData?.requestData, {})
        : {},
    [riskData]
  )
  const userData = data?.personalInfo

  return (
    <div className="max-w-5xl mx-auto">
      <div className="h-[70px] flex justify-center items-center">
        <Image src="/logo_large.png" width={120} height={120} alt="logo" />
      </div>

      <ContentLoader loading={isLoading} />
      <div className="px-4 md:px-5">
        {userData && (
          <Text
            variant="display/xs"
            weight="bold"
            className="text-center mb-10"
          >{`${userData?.fullName} Result`}</Text>
        )}

        {data && userData && (
          <div className="mb-4">
            <RiskAssessmentResult data={data} />
            {providerNotes && (
              <TextArea
                className="mt-3"
                disabled
                defaultValue={providerNotes}
                placeholder="Enter additional observations or comments..."
                label="Provider Notes"
              />
            )}
            <div className="max-w-4xl mx-auto px-6 pb-6">
              <ReportActions
                assessmentData={data}
                personalInfo={userData}
                isFromEmail
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
