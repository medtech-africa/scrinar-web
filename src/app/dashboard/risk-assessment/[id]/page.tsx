'use client'
import React from 'react'
import {
  useGeneratedRiskAssessment,
  useRiskAssessment,
} from '@/hooks/queries/useRiskAssessment'
import { useParams } from 'next/navigation'
import ContentLoader from '@/components/content-loader'
import { RiskAssessmentReport } from '../RiskAssessmentReport'
import { FormProvider, useForm } from 'react-hook-form'

const RiskAssessmentDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const { data, isPending } = useRiskAssessment(params.id)
  const { data: generatedDataRaw, isPending: isGeneratedPending } =
    useGeneratedRiskAssessment(params.id)

  const generatedData = generatedDataRaw?.responseData

  const formMethods = useForm({ defaultValues: data?.requestData })

  if (isPending || isGeneratedPending) {
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
        <FormProvider {...formMethods}>
          <RiskAssessmentReport
            className="w-full max-w-3xl mx-auto mt-10"
            data={{
              requestData: data?.requestData,
              responseData: generatedData,
              user: data?.user,
            }}
            personalInfo={data?.user}
            showActionButton={false}
          />
        </FormProvider>
      </div>
    </div>
  )
}

export default RiskAssessmentDetailsPage
