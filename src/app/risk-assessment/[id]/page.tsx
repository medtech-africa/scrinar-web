'use client'
import ContentLoader from '@/components/content-loader'
import { RiskAssessmentResult } from '@/components/risk-assessment/RiskAssessmentResult'
import { ReportActions } from '@/components/risk-assessment/PDFReport'
import Image from 'next/image'
import { TextArea } from '@/components/ui/textarea'
import { Text } from '@/components/ui/text'
import { useRiskAssessment } from '@/hooks/queries/useRiskAssessment'

export default function ViewRecord({ params }: { params: { id: string } }) {
  const { data: riskData, isPending: isLoading } = useRiskAssessment(params?.id)
  const data = riskData?.data?.responseData
  const userData = riskData?.data?.personalInfo
  const providerNotes = riskData?.providerNotes

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

        {data && (
          <div>
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
            <ReportActions
              assessmentData={data}
              personalInfo={userData}
              isFromEmail
            />
          </div>
        )}
      </div>
    </div>
  )
}
