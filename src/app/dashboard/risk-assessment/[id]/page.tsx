'use client'
import React from 'react'
import { RiskAssessmentForm } from '../RiskAssessmentForm'
import { useRiskAssessment } from '@/hooks/queries/useRiskAssessment'
import { useParams } from 'next/navigation'
import ContentLoader from '@/components/content-loader'

const RiskAssessmentDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const { data, isPending } = useRiskAssessment(params.id)
  // TODO restructure
  console.log('🚀 ~ RiskAssessmentDetailsPage ~ data:', data)

  if (isPending) {
    return <ContentLoader loading />
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">NCD Risk Assessment</h1>
        <p>
          Non communicable Diseases (NCDs) are chronic conditions that are not
          transmitted from person to person, such as diabetes, cardiovascular
          disease, cancer, and chronic respiratory diseases.
        </p>
      </div>
      <div className="">
        <div className="grid">
          <RiskAssessmentForm data={data} />
        </div>
      </div>
    </div>
  )
}

export default RiskAssessmentDetailsPage
