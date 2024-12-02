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
import { ConsentForm } from './ConsentForm'
import { RiskAssessmentResult } from '@/components/risk-assessment/RiskAssessmentResult'
import { ReportActions } from '@/components/risk-assessment/PDFReport'

export const RiskAssessmentForm = () => {
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const formMethods = useForm()

  const {
    mutate: analyzeRisk,
    isPending,
    data: resultData,
  } = useMutation({
    mutationFn: (formData) => baseAxios.post(API.riskAssessment, formData),
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
      }, 500)
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

  return (
    <FormProvider {...formMethods}>
      <div className="relative">
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
            <Button
              variant={'primary'}
              value="Generate Assessment"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
              disabled={isPending}
              type="submit"
            />
          </div>
        </form>

        {(isPending || showResults) && (
          <div className="fixed h-full w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            {isPending && <LoadingAnalysis progress={progress} />}
            {showResults && (
              <div className="bg-white p-8 rounded-lg w-full max-w-[70%] m-auto max-h-[90vh] overflow-y-auto">
                <RiskAssessmentResult data={resultData?.data?.data} />
                <ConsentForm assessmentId={resultData?.data?.data?.id} />

                <ReportActions
                  assessmentData={resultData?.data}
                  personalInfo={formMethods.watch('personalInfo')}
                />
                <div className="mt-8 flex justify-end">
                  <Button onClick={() => setShowResults(false)}>Close</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </FormProvider>
  )
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
