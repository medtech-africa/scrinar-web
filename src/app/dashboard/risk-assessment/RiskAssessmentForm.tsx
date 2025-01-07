'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { PersonalInfoForm } from './PersonalInfoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { VitalsMeasurement } from './VitalsMeasurement'
import { BloodTestsForm } from './BloodTestsForm'
import { FamilyHistoryLifestyleForm } from './FamilyHistoryLifestyleForm'
import { ScreeningQuestionsForm } from './ScreeningQuestionsForm'
import { HistoricalDataCollectionForm } from './HistoricalDataCollectionForm'
import { useState } from 'react'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { LoadingAnalysis } from './LoadingAnalysis'
import {
  PersonalInfo,
  RiskAssessmentModel,
} from '@/hooks/queries/useRiskAssessment'
import { RiskAssessmentReport } from './RiskAssessmentReport'

export const RiskAssessmentForm = ({
  data,
}: {
  data?: RiskAssessmentModel
}) => {
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const formMethods = useForm({ defaultValues: data?.requestData })

  const {
    mutate: analyzeRisk,
    isPending,
    data: resultData,
  } = useMutation({
    mutationFn: (formData) =>
      baseAxios
        .post<{ data: RiskAssessmentModel }>(API.riskAssessment, formData)
        .then((res) => res.data.data),
    onMutate: () => {
      setProgress(0)
      // Start progress animation
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev + 10
        })
      }, 200)
      return () => clearInterval(interval)
    },
    onSuccess: (data) => {
      setProgress(100)
      setTimeout(() => {
        setShowResults(true)
      }, 500)
      return data
    },
    onError: (_err) => {
      toast.error('Failed to analyze risk assessment data')
      setProgress(0)
    },
  })
  console.log('🚀 ~ resultData:', resultData)

  const handleSubmit = async (data: any) => {
    const totalFields = 50
    const filledFields = countFilledFields(data)

    const filledPercentage = (filledFields / totalFields) * 100
    if (filledPercentage < 60) {
      toast.error('Please fill more data to analyze risk assessment')
      return
    }

    analyzeRisk(data)
  }

  const consentAgreement = formMethods.watch('consentAgreement')

  return (
    <FormProvider {...formMethods}>
      <div className="relative grid gap-y-4">
        <form
          onSubmit={formMethods.handleSubmit(handleSubmit)}
          className="w-full h-full"
        >
          <div className="w-full h-full">
            <div className="flex flex-col gap-y-5">
              <PersonalInfoForm />
              {/* Vitals Measurement */}
              <VitalsMeasurement />
              {/* Blood test */}
              <BloodTestsForm />
              {/* family history */}
              <FamilyHistoryLifestyleForm />
              {/* Screening Questions*/}
              <ScreeningQuestionsForm />
              {/* Historical Data Collection */}
              <HistoricalDataCollectionForm />
            </div>
            {/*  */}
            {!data && (
              <Button
                variant={'primary'}
                value="Generate Assessment"
                leadingIcon={<IconPicker icon="saveAdd" />}
                className="mt-6"
                disabled={isPending || !consentAgreement}
                type="submit"
              />
            )}
          </div>
        </form>
        {isPending ? (
          <div className="fixed h-full w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <LoadingAnalysis progress={progress} />
          </div>
        ) : (
          <RiskAssessmentGeneratedReport
            showResults={showResults}
            resultData={resultData}
            personalInfo={formMethods.watch('personalInfo')}
            data={data}
            setShowResults={setShowResults}
          />
        )}
      </div>
    </FormProvider>
  )
}

const RiskAssessmentGeneratedReport = ({
  showResults,
  resultData,
  data,
  setShowResults,
  personalInfo,
}: {
  showResults: boolean
  resultData?: any
  data?: RiskAssessmentModel
  personalInfo?: PersonalInfo
  setShowResults: (showResults: boolean) => void
}) => {
  const actionButton = (
    <div className="mt-8 flex justify-end">
      <Button onClick={() => setShowResults(false)}>Close</Button>
    </div>
  )

  if (showResults) {
    return (
      <div className="fixed h-full w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <RiskAssessmentReport
          className="bg-white p-8 rounded-lg w-full max-w-[70%] m-auto max-h-[90vh] overflow-y-auto"
          action={actionButton}
          data={{ responseData: resultData }}
          personalInfo={personalInfo}
        />
      </div>
    )
  }

  if (data) {
    return (
      <RiskAssessmentReport
        className="w-full"
        action={actionButton}
        data={data}
        personalInfo={data?.requestData.personalInfo}
        showActionButton={false}
      />
    )
  }
}

const countFilledFields = (obj: any): number => {
  let count = 0

  const traverse = (value: any) => {
    if (value === null || value === undefined || value === '') {
      return
    }

    if (Array.isArray(value)) {
      value.forEach((item) => traverse(item))
    } else if (typeof value === 'object') {
      Object.values(value).forEach((val) => traverse(val))
    } else {
      count++
    }
  }

  traverse(obj)
  return count
}
