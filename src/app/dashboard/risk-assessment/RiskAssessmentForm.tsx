'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { PersonalInfoForm } from './PersonalInfoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { VitalsMeasurement } from './VitalsMeasurement'
import { BloodTestsForm } from './BloodTestsForm'
import { FamilyHistoryLifestyleForm } from './FamilyHistoryLifestyleForm'
import { HistoricalDataCollectionForm } from './HistoricalDataCollectionForm'
// import { TimeSeriesDataForm } from './TimeSeriesDataForm'
// import { MedicalHistoryForm } from './MedicalHistoryForm'
import { useState } from 'react'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { LoadingAnalysis } from './LoadingAnalysis'
import {
  RiskAssessmentModel,
  RiskAssessmentModelRequestData,
} from '@/hooks/queries/useRiskAssessment'
import { RiskAssessmentReport } from './RiskAssessmentReport'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import { Text } from '@/components/ui/text'
import { ScreeningQuestionsForm } from './ScreeningQuestionsForm'

const triggerClassName = cn(
  'text-sm text-grey-700 py-2 px-4 transition-all cursor-pointer block w-full text-left',
  'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium rounded-md my-1'
)

export const RiskAssessmentForm = ({
  data,
}: {
  data?: RiskAssessmentModel
}) => {
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('bio')
  const formMethods = useForm({ defaultValues: data?.requestData })

  const {
    mutate: analyzeRisk,
    isPending,
    data: resultData,
  } = useMutation({
    mutationFn: async (formData) => {
      const [cvdResponse, diabetesResponse] = await Promise.all([
        baseAxios
          .post<{
            data: any
          }>(`${API.riskAssessment}/cvd`, formData)
          .then((res) => res.data.data),
        baseAxios
          .post<{
            data: any
          }>(`${API.riskAssessment}/diabetes`, formData)
          .then((res) => res.data.data),
      ])

      // Return combined data object
      return {
        cvd: cvdResponse,
        diabetes: diabetesResponse,
      }
    },
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

  const isFormValid = (data: any) => {
    const totalFields = 50
    const filledFields = countFilledFields(data)

    const filledPercentage = (filledFields / totalFields) * 100
    return (
      filledPercentage >= 60 && !!formMethods.watch('personalInfo.dateOfBirth')
    )
  }

  const handleSubmit = (data: any) => {
    if (!isFormValid(data)) {
      toast.error(isFormFilledError(data) ?? 'An error occurred')
      return
    }

    analyzeRisk(data)
  }

  const isFormFilledError = (data: any) => {
    const filledPercentage = (countFilledFields(data) / 50) * 100
    if (filledPercentage < 60) {
      return 'Please fill more data to analyze risk assessment'
    }

    if (!formMethods.watch('personalInfo.dateOfBirth')) {
      return 'Please fill the date of birth field'
    }
  }

  const consentAgreement = formMethods.watch('consentAgreement')

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleNext = () => {
    const tabOrder = [
      'bio',
      'vitals',
      'labs',
      'lifestyle',
      'medical',
      'historical',
      'timeseries',
    ]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const tabOrder = [
      'bio',
      'vitals',
      'labs',
      'lifestyle',
      'medical',
      'historical',
      'timeseries',
    ]
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  // Calculate current step
  const getCurrentStep = () => {
    const tabOrder = [
      'bio',
      'vitals',
      'labs',
      'lifestyle',
      'medical',
      'historical',
      'timeseries',
    ]
    return tabOrder.indexOf(activeTab) + 1
  }

  return (
    <FormProvider {...formMethods}>
      <div className="relative">
        <div className="container mx-auto px-4 py-6">
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="w-full h-full"
          >
            <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
              <div className="flex gap-8">
                <div className="w-full md:w-3/4 order-2 md:order-1">
                  <div className="items-center gap-2 mb-4 hidden md:flex justify-end">
                    <button
                      title="arrow-left"
                      type="button"
                      onClick={handlePrevious}
                      disabled={getCurrentStep() === 1}
                      className="p-2 rounded-md border disabled:opacity-50"
                    >
                      <IconPicker icon="arrowLeft" />
                    </button>
                    <span className="text-sm">{getCurrentStep()} of 6</span>
                    <button
                      title="arrow-right"
                      type="button"
                      onClick={handleNext}
                      disabled={getCurrentStep() === 6}
                      className="p-2 rounded-md border disabled:opacity-50"
                    >
                      <IconPicker icon="arrowRight" />
                    </button>
                  </div>
                  <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100">
                    <Tabs.Content value="bio">
                      <PersonalInfoForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="vitals">
                      <VitalsMeasurement onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="labs">
                      <BloodTestsForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="lifestyle">
                      <FamilyHistoryLifestyleForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="medical">
                      <ScreeningQuestionsForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="historical">
                      <HistoricalDataCollectionForm />
                      <div className="flex justify-end mt-6">
                        {!data && (
                          <Button
                            variant="primary"
                            className="bg-red-600 hover:bg-red-700 text-white"
                            leadingIcon={<IconPicker icon="saveAdd" />}
                            disabled={isPending || !consentAgreement}
                            type="submit"
                          >
                            Generate Assessment
                          </Button>
                        )}
                      </div>
                    </Tabs.Content>
                  </div>
                </div>

                <div className="w-1/4 order-1 md:order-2 hidden md:block">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full mb-2">
                        <Text variant="text/md" className="font-medium">
                          Assessment Sections
                        </Text>
                        <IconPicker
                          icon="arrowDown"
                          className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                        />
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <Tabs.List
                          className="flex flex-col space-y-1"
                          aria-label="Risk Assessment Sections"
                        >
                          <Tabs.Trigger
                            className={cn(
                              triggerClassName,
                              activeTab === 'bio' &&
                                'bg-red-600 text-white font-medium'
                            )}
                            value="bio"
                          >
                            Patients bio-data
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              triggerClassName,
                              activeTab === 'vitals' &&
                                'bg-red-600 text-white font-medium'
                            )}
                            value="vitals"
                          >
                            Vital & Anthropometrics
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              triggerClassName,
                              activeTab === 'labs' &&
                                'bg-red-600 text-white font-medium'
                            )}
                            value="labs"
                          >
                            Labs
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              triggerClassName,
                              activeTab === 'lifestyle' &&
                                'bg-red-600 text-white font-medium'
                            )}
                            value="lifestyle"
                          >
                            Lifestyle/Behavioral Factors
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              triggerClassName,
                              activeTab === 'medical' &&
                                'bg-red-600 text-white font-medium'
                            )}
                            value="medical"
                          >
                            Medical History
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              triggerClassName,
                              activeTab === 'historical' &&
                                'bg-red-600 text-white font-medium'
                            )}
                            value="historical"
                          >
                            Historical Data Collection
                          </Tabs.Trigger>
                        </Tabs.List>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              </div>
            </Tabs.Root>
          </form>

          {isPending ? (
            <div className="fixed h-full w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <LoadingAnalysis progress={progress} />
            </div>
          ) : (
            <RiskAssessmentGeneratedReport
              showResults={showResults}
              resultData={resultData}
              formData={{
                personalInfo: formMethods.watch('personalInfo'),
                vitals: formMethods.watch('vitals'),
              }}
              data={data}
              setShowResults={setShowResults}
            />
          )}
        </div>
      </div>
    </FormProvider>
  )
}

const RiskAssessmentGeneratedReport = ({
  showResults,
  resultData,
  data,
  setShowResults,
  formData,
}: {
  showResults: boolean
  resultData?: any
  data?: RiskAssessmentModel
  formData?: Partial<RiskAssessmentModelRequestData>
  setShowResults: (showResults: boolean) => void
}) => {
  const personalInfo = formData?.personalInfo
  const actionButton = (
    <div className="mt-8 flex justify-end">
      <Button onClick={() => setShowResults(false)}>Close</Button>
    </div>
  )

  if (showResults) {
    const mergedData = Object.assign(
      {},
      { responseData: resultData },
      {
        requestData: formData,
      }
    ) as RiskAssessmentModel
    return (
      <div className="fixed h-full w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <RiskAssessmentReport
          className="bg-white p-8 rounded-lg w-full max-w-[70%] m-auto max-h-[90vh] overflow-y-auto"
          action={actionButton}
          data={mergedData}
          personalInfo={personalInfo}
        />
      </div>
    )
  }

  if (data) {
    return (
      <RiskAssessmentReport
        className="w-full max-w-3xl mx-auto mt-10"
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
