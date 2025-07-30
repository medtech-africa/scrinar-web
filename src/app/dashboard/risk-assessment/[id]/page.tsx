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
import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RiskAssessmentForm } from '../RiskAssessmentForm'

const RiskAssessmentDetailsPage = () => {
  const params = useParams<{ id: string }>()
  const { data, isPending } = useRiskAssessment(params.id)
  const { data: generatedDataRaw, isPending: isGeneratedPending } =
    useGeneratedRiskAssessment(params.id)

  const generatedData = generatedDataRaw?.responseData

  const formMethods = useForm({ defaultValues: data })

  const navigationItems = [
    { label: 'Risk Assessment', icon: IconNames.arrowRight },
    { label: 'Assessment Details' },
  ]

  if (isPending || isGeneratedPending) {
    return <ContentLoader loading />
  }

  return (
    <div>
      <PageHeader
        title="NCD Risk Assessment"
        subtitle="Non communicable Diseases (NCDs) are chronic conditions that are not transmitted from person to person, such as diabetes, cardiovascular disease, cancer, and chronic respiratory diseases."
        navigation={navigationItems}
        avatar="avatar"
      />
      <div className="flex flex-col gap-y-5">
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
                      requestData: data?.requestData,
                      responseData: generatedData,
                      user: data?.user,
                    }}
                    personalInfo={data?.user}
                    showActionButton={false}
                  />
                </FormProvider>
              </TabsContent>
              <TabsContent value="form">
                <RiskAssessmentForm
                  data={{
                    requestData: {
                      personalInfo: data?.user,
                      ...(data ? data : {}),
                    },
                  }}
                  displayOnly
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskAssessmentDetailsPage
