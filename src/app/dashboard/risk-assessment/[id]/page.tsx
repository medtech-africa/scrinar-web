'use client'
import React from 'react'
import { RiskAssessmentForm } from '../RiskAssessmentForm'
import {
  useGeneratedRiskAssessment,
  useRiskAssessment,
} from '@/hooks/queries/useRiskAssessment'
import { useParams } from 'next/navigation'
import ContentLoader from '@/components/content-loader'
import { RiskAssessmentReport } from '../RiskAssessmentReport'
import { FormProvider, useForm } from 'react-hook-form'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const RiskAssessmentDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const { data, isPending } = useRiskAssessment(params.id)
  const { data: generatedData, isPending: isGeneratedPending } =
    useGeneratedRiskAssessment(params.id)
  // TODO restructure

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
        <div className="grid">
          <Tabs defaultValue="result" className="w-full">
            <TabsList>
              <TabsTrigger value="result">Result</TabsTrigger>
              <TabsTrigger value="form">Form</TabsTrigger>
            </TabsList>
            <TabsContent value="result">
              <FormProvider {...formMethods}>
                <RiskAssessmentReport
                  className="w-full max-w-3xl mx-auto mt-10"
                  data={{
                    requestData: data,
                    responseData: generatedData,
                  }}
                  personalInfo={data?.user}
                  showActionButton={false}
                />
              </FormProvider>
            </TabsContent>
            <TabsContent value="form">
              <RiskAssessmentForm displayOnly data={{ requestData: data }} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default RiskAssessmentDetailsPage
