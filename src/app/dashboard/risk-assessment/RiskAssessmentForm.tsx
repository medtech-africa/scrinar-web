'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { PersonalInfoForm } from './PersonalInfoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { VitalsMeasurement } from './VitalsMeasurement'
import { BloodTestsForm } from './BloodTestsForm'
import { FamilyHistoryLifestyleForm } from './FamilyHistoryLifestyleForm'
import { HistoricalDataCollectionForm } from './HistoricalDataCollectionForm'
import { useState, useEffect } from 'react'
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

import { FamilyHistoryForm } from './FamilyHistoryForm'
import { NCDQuestionnaireForm } from './NCDQuestionnaireForm'
import { useRiskAssessmentStorage } from '@/hooks/useRiskAssessmentStorage'
import { slugify } from '@/utils/slugify'
import { NcdFilterProvider, useNcdFilter } from './NcdFilterContext'
import { useRiskAssessmentPolling } from '@/hooks/queries/useRiskAssessment'
import { getFieldPath, getFieldDisplayName } from '@/constants/fieldMappings'
import { NCD } from '@/types/riskAssessment.types'
import { NCD_DISPLAY_NAMES, ALL_NCD_TYPES } from '@/constants/riskAssessment'

import { useRouter } from 'next/navigation'

// Status Section Component
const StatusSection = ({
  formData,
  assessmentId,
}: {
  formData: any
  assessmentId?: string | null
}) => {
  const { mutate: saveSection, isPending: _isPending } = useMutation({
    mutationFn: async (data: any) => {
      if (!assessmentId) return
      const response = await baseAxios.patch(
        API.updateRiskAssessment(assessmentId),
        data
      )
      return response.data.data
    },
    onSuccess: () => {
      toast.success('Section saved successfully')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to save section')
    },
  })

  const checkBioDataComplete = () => {
    const personalInfo = formData?.personalInfo
    return !!(
      personalInfo?.firstName &&
      personalInfo?.lastName &&
      personalInfo?.dateOfBirth &&
      personalInfo?.gender
    )
  }

  const checkVitalsComplete = () => {
    const vitals = formData?.vitals
    return !!(vitals?.height && vitals?.weight && vitals?.sys && vitals?.dys)
  }

  const checkLabResultsComplete = () => {
    const bloodTest = formData?.bloodTest
    return !!(
      bloodTest?.bloodSugarFasting ||
      bloodTest?.cholesterolTotal ||
      bloodTest?.cholesterolLdl ||
      bloodTest?.cholesterolHdl ||
      bloodTest?.cholesterolTriglycerides
    )
  }

  const bioDataComplete = checkBioDataComplete()
  const vitalsComplete = checkVitalsComplete()
  const labResultsComplete = checkLabResultsComplete()

  const _handleSaveSection = (sectionName: string, sectionData: any) => {
    if (!assessmentId) return
    saveSection({ [sectionName]: sectionData })
  }

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 mb-6">
      <Text variant="text/md" className="font-semibold mb-3">
        Required Sections Status
      </Text>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Text variant="text/sm" className="text-gray-700">
            Bio Data
          </Text>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${bioDataComplete ? 'bg-green-500' : 'bg-gray-300'}`}
            />
            <Text
              variant="text/sm"
              className={bioDataComplete ? 'text-green-600' : 'text-gray-500'}
            >
              {bioDataComplete ? 'Complete' : 'Incomplete'}
            </Text>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Text variant="text/sm" className="text-gray-700">
            Vitals & Measurements
          </Text>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${vitalsComplete ? 'bg-green-500' : 'bg-gray-300'}`}
            />
            <Text
              variant="text/sm"
              className={vitalsComplete ? 'text-green-600' : 'text-gray-500'}
            >
              {vitalsComplete ? 'Complete' : 'Incomplete'}
            </Text>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Text variant="text/sm" className="text-gray-700">
            Lab Results
          </Text>
          <div className="flex items-center space-x-2">
            <div
              className={`w-3 h-3 rounded-full ${labResultsComplete ? 'bg-green-500' : 'bg-gray-300'}`}
            />
            <Text
              variant="text/sm"
              className={
                labResultsComplete ? 'text-green-600' : 'text-gray-500'
              }
            >
              {labResultsComplete ? 'Complete' : 'Incomplete'}
            </Text>
          </div>
        </div>
      </div>

      {assessmentId && (
        <div className="mt-4 pt-3 border-t border-gray-200">
          <Text variant="text/sm" className="text-gray-600 mb-2">
            Assessment ID: {assessmentId}
          </Text>
        </div>
      )}
    </div>
  )
}

const RiskAssessmentFormContent = ({
  data,
  displayOnly = false,
  assessmentId: _assessmentId = null,
  patientId: _patientId,
  isPatientDataPrefilled = false,
  onPatientCreated,
}: {
  data?: Pick<RiskAssessmentModel, 'requestData'>
  displayOnly?: boolean
  assessmentId?: string | null
  patientId?: string | null
  isPatientDataPrefilled?: boolean
  onPatientCreated?: (patientId: string) => void
}) => {
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [assessmentDone, setAssessmentDone] = useState(false)
  const [activeTab, setActiveTab] = useState('bio')
  const {
    selectedNcds,
    toggleNcd,
    selectAllNcds,
    deselectAllNcds,
    hasNcdSelected,
    getRequiredFields,
    getNcdTypeString,
  } = useNcdFilter()
  const formMethods = useForm({ defaultValues: data?.requestData })

  // Reset form when data changes
  useEffect(() => {
    if (data?.requestData) {
      formMethods.reset(data.requestData)
    }
  }, [data?.requestData, formMethods])

  const storeRiskAssessment = useRiskAssessmentStorage((store) => store.store)

  const {
    mutate: analyzeRisk,
    isPending,
    data: resultData,
  } = useMutation({
    mutationFn: async (assessmentId: string) => {
      try {
        // Step 0:  store the assessment data
        const formData = formMethods.watch()

        await baseAxios.patch(API.updateRiskAssessment(assessmentId), formData)

        // Step 1: Generate risk assessment
        await baseAxios.post(API.generateRiskAssessment(assessmentId))

        // Small delay to allow server processing
        await new Promise((resolve) => setTimeout(resolve, 2000))

        // Step 2: Fetch the generated assessment details
        const response = await baseAxios
          .get<{
            data: any
          }>(API.generateRiskAssessment(assessmentId))
          .then((res) => res.data.data)

        return response
      } catch (error: any) {
        // Provide more specific error messages based on the step that failed
        if (error?.response?.status === 404) {
          throw new Error('Assessment not found. Please try again.')
        } else if (error?.response?.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else {
          throw new Error(
            error?.response?.data?.message ||
              'Failed to analyze risk assessment data'
          )
        }
      }
    },
    onMutate: () => {
      setProgress(0)
      // Start progress animation with two phases
      let phase = 1
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Phase 1: Generate assessment (0-45%)
          if (phase === 1 && prev < 45) {
            return prev + 2
          }
          // Transition to phase 2 (45-50%)
          if (phase === 1 && prev >= 45) {
            phase = 2
            return 50
          }
          // Phase 2: Fetch results (50-90%)
          if (phase === 2 && prev < 90) {
            return prev + 1.5
          }
          if (prev >= 90) {
            clearInterval(interval)
            return 90
          }
          return prev
        })
      }, 150)
      return () => clearInterval(interval)
    },
    onSuccess: (data) => {
      setProgress(100)
      setTimeout(() => {
        setShowResults(true)
        setAssessmentDone(true)
      }, 500)
      return data
    },
    onError: (_err) => {
      toast.error(_err?.message || 'Failed to analyze risk assessment data')
      setProgress(0)
    },
  })

  const isFormValid = (_data: any) => {
    // Check if all required fields for selected NCDs are filled
    const formData = formMethods.watch()

    // Check if all selected NCDs have their required fields filled
    const allRequiredFieldsFilled = selectedNcds.every((ncdType) => {
      const requiredFields = getRequiredFields(ncdType)
      if (!requiredFields) return true

      return Object.entries(requiredFields).every(([field, isRequired]) => {
        if (!isRequired) return true

        const formField = getFieldPath(field)
        const fieldValue = formField
          .split('.')
          .reduce((obj, key) => obj?.[key], formData as any)

        return !!fieldValue
      })
    })

    const personalInfo = formMethods.watch('personalInfo')
    return allRequiredFieldsFilled && !!personalInfo?.dateOfBirth
  }

  const handleSubmit = (data: RiskAssessmentModelRequestData) => {
    if (!isFormValid(data)) {
      toast.error(isFormFilledError(data) ?? 'An error occurred')
      return
    }

    if (!_assessmentId) {
      toast.error('Assessment ID is required to analyze risk')
      return
    }

    // Add ncdType to the data
    const formDataWithNcdType = {
      ...data,
      ncdType: getNcdTypeString(),
    }

    storeRiskAssessment(
      slugify(
        [
          data.personalInfo?.firstName,
          data.personalInfo?.middleName,
          data.personalInfo?.lastName,
        ]
          .filter(Boolean)
          .join(' ') + data.personalInfo?.gender
      ),
      formDataWithNcdType
    )

    // Call analyzeRisk with assessmentId
    analyzeRisk(_assessmentId)
  }

  const isFormFilledError = (_data: any) => {
    // Check which NCDs have missing required fields
    const formData = formMethods.watch()
    const missingFieldsByNcd: Record<string, string[]> = {}

    selectedNcds.forEach((ncdType) => {
      const requiredFields = getRequiredFields(ncdType)
      if (!requiredFields) return

      const missingFields = Object.entries(requiredFields)
        .filter(([field, isRequired]) => {
          if (!isRequired) return false

          const formField = getFieldPath(field)
          const fieldValue = formField
            .split('.')
            .reduce((obj, key) => obj?.[key], formData as any)

          return !fieldValue
        })
        .map(([field]) => getFieldDisplayName(field))

      if (missingFields.length > 0) {
        missingFieldsByNcd[ncdType] = missingFields
      }
    })

    if (Object.keys(missingFieldsByNcd).length > 0) {
      const errorMessages = Object.entries(missingFieldsByNcd).map(
        ([ncdType, fields]) => `${ncdType}: ${fields.join(', ')}`
      )
      return `Please fill required fields: ${errorMessages.join('; ')}`
    }

    const personalInfo = formMethods.watch('personalInfo')
    if (!personalInfo?.dateOfBirth) {
      return 'Please fill the date of birth field'
    }
  }

  const consentAgreement = formMethods.watch('consentAgreement')

  const handleTabChange = (value: string) => {
    // If we have patientId but no assessmentId, only allow bio section
    if (_patientId && !_assessmentId && value !== 'bio') {
      toast.error('Please wait for the assessment to be created')
      return
    }
    setActiveTab(value)
  }

  const handleNext = () => {
    // Check if we need assessmentId for the next section
    const filteredOrder = getFilteredTabOrder()
    const nextTabIndex = filteredOrder.indexOf(activeTab) + 1
    const nextTab = filteredOrder[nextTabIndex]

    // If we have patientId but no assessmentId, and trying to go beyond bio section
    if (_patientId && !_assessmentId && nextTab && nextTab !== 'bio') {
      toast.error('Please wait for the assessment to be created')
      return
    }

    // Save current section data if we have an assessment ID
    if (_assessmentId) {
      const currentFormData = formMethods.watch()
      let sectionData: any = {}
      sectionData.ncdType = getNcdTypeString()

      switch (activeTab) {
        case 'bio':
          sectionData = { personalInfo: currentFormData.personalInfo }
          break
        case 'vitals':
          sectionData = { vitals: currentFormData.vitals }
          break
        case 'labs':
          sectionData = { bloodTest: currentFormData.bloodTest }
          break
        case 'lifestyle':
          sectionData = { lifestyle: currentFormData.lifestyle }
          break
        case 'familyHistory':
          sectionData = { familyHistory: currentFormData.familyHistory }
          break
        case 'ncdQuestionnaire':
          sectionData = {
            cardiac: currentFormData.cardiac,
            copd: currentFormData.copd,
            breastCancer: currentFormData.breastCancer,
            prostateCancer: currentFormData.prostateCancer,
            colorectalCancer: currentFormData.colorectalCancer,
            lifestyle: currentFormData.lifestyle,
            previousHealthScreening: currentFormData.previousHealthScreening,
          }
          break

        case 'historical':
          sectionData = {
            previousHealthScreening: currentFormData.previousHealthScreening,
            providerNote: currentFormData.providerNote,
            reportEmail: currentFormData.reportEmail,
            consentSignature: currentFormData.consentSignature,
          }
          break
      }

      if (Object.keys(sectionData).length > 0) {
        baseAxios
          .patch(API.updateRiskAssessment(_assessmentId), sectionData)
          .then(() => {
            toast.success('Section saved successfully')
          })
          .catch((error: any) => {
            toast.error(
              error?.response?.data?.message || 'Failed to save section'
            )
          })
      }
    }

    const currentIndex = filteredOrder.indexOf(activeTab)
    if (currentIndex < filteredOrder.length - 1) {
      setActiveTab(filteredOrder[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const filteredOrder = getFilteredTabOrder()
    const currentIndex = filteredOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(filteredOrder[currentIndex - 1])
    }
  }

  // Calculate current step
  const getCurrentStep = () => {
    const filteredOrder = getFilteredTabOrder()
    return filteredOrder.indexOf(activeTab) + 1
  }

  // Get filtered tab order based on selected NCD types
  const getFilteredTabOrder = () => {
    const baseTabs = ['bio', 'vitals', 'labs', 'lifestyle', 'familyHistory']
    const assessmentTabs = []

    // Check if any NCD assessments should be shown
    const shouldShowNCDQuestionnaire = selectedNcds.length > 0

    if (shouldShowNCDQuestionnaire) {
      assessmentTabs.push('ncdQuestionnaire')
    }

    const finalTabs = ['historical']
    return [...baseTabs, ...assessmentTabs, ...finalTabs]
  }

  // Get step number for a specific tab
  const getStepNumber = (tabValue: string) => {
    const filteredOrder = getFilteredTabOrder()
    return filteredOrder.indexOf(tabValue) + 1
  }

  const filteredTabOrder = getFilteredTabOrder()
  const tabsLength = filteredTabOrder.length

  return (
    <FormProvider {...formMethods}>
      <div className="relative h-screen">
        <div className="container mx-auto px-0 md:px-4 py-6 h-full">
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="w-full h-full flex flex-col"
          >
            {/* Status Section */}
            <StatusSection
              formData={formMethods.watch()}
              assessmentId={_assessmentId}
            />

            <Tabs.Root
              value={activeTab}
              onValueChange={handleTabChange}
              className="flex-1"
            >
              <div className="flex gap-8 h-full">
                <div className="w-full lg:w-3/4 order-2 lg:order-1 overflow-y-auto pr-4">
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <Text as="h2" className="font-semibold text-xl mb-1">
                          NCD Risk Assessment
                        </Text>
                        <Text variant="text/sm" className="text-gray-600">
                          Select the type of assessment you want to perform
                        </Text>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          title="arrow-left"
                          type="button"
                          onClick={handlePrevious}
                          disabled={getCurrentStep() === 1}
                          className="p-2 rounded-md border disabled:opacity-50 hover:bg-gray-50"
                        >
                          <IconPicker icon="arrowLeft" />
                        </button>
                        <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">
                          {getCurrentStep()} of {tabsLength}
                        </span>
                        <button
                          title="arrow-right"
                          type="button"
                          onClick={handleNext}
                          disabled={getCurrentStep() === tabsLength}
                          className="p-2 rounded-md border disabled:opacity-50 hover:bg-gray-50"
                        >
                          <IconPicker icon="arrowRight" />
                        </button>
                      </div>
                    </div>

                    {/* NCD Type Selection */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <Collapsible defaultOpen>
                        <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                          <Text as="h3" className="font-semibold">
                            Select NCD
                          </Text>

                          <IconPicker
                            icon="arrowDown"
                            className="transition-transform duration-200 group-data-[state=open]:rotate-180"
                          />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <Text variant="text/sm" className="mb-3">
                            Choose at least 1 NCD to get started with your
                            assessment
                          </Text>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-3">
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={
                                    selectedNcds.length === ALL_NCD_TYPES.length
                                  }
                                  onChange={() => {
                                    if (
                                      selectedNcds.length ===
                                      ALL_NCD_TYPES.length
                                    ) {
                                      deselectAllNcds()
                                    } else {
                                      selectAllNcds()
                                    }
                                  }}
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  All NCDs
                                </Text>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(NCD.CVD)}
                                  onChange={() => toggleNcd(NCD.CVD)}
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {
                                    NCD_DISPLAY_NAMES[
                                      NCD.CVD as keyof typeof NCD_DISPLAY_NAMES
                                    ]
                                  }
                                </Text>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(NCD.DIABETES)}
                                  onChange={() => toggleNcd(NCD.DIABETES)}
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {
                                    NCD_DISPLAY_NAMES[
                                      NCD.DIABETES as keyof typeof NCD_DISPLAY_NAMES
                                    ]
                                  }
                                </Text>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(NCD.COPD)}
                                  onChange={() => toggleNcd(NCD.COPD)}
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {
                                    NCD_DISPLAY_NAMES[
                                      NCD.COPD as keyof typeof NCD_DISPLAY_NAMES
                                    ]
                                  }
                                </Text>
                              </label>
                            </div>
                            <div className="space-y-3">
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(NCD.BREAST_CANCER)}
                                  onChange={() => toggleNcd(NCD.BREAST_CANCER)}
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {
                                    NCD_DISPLAY_NAMES[
                                      NCD.BREAST_CANCER as keyof typeof NCD_DISPLAY_NAMES
                                    ]
                                  }
                                </Text>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(NCD.PROSTATE_CANCER)}
                                  onChange={() =>
                                    toggleNcd(NCD.PROSTATE_CANCER)
                                  }
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {NCD_DISPLAY_NAMES[NCD.PROSTATE_CANCER]}
                                </Text>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(
                                    NCD.COLORECTAL_CANCER
                                  )}
                                  onChange={() =>
                                    toggleNcd(NCD.COLORECTAL_CANCER)
                                  }
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {NCD_DISPLAY_NAMES[NCD.COLORECTAL_CANCER]}
                                </Text>
                              </label>
                              <label className="flex items-center space-x-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={hasNcdSelected(NCD.CKD)}
                                  onChange={() => toggleNcd(NCD.CKD)}
                                  disabled={displayOnly}
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                />
                                <Text
                                  variant="text/sm"
                                  className="font-medium text-gray-700"
                                >
                                  {NCD_DISPLAY_NAMES[NCD.CKD]}
                                </Text>
                              </label>
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 min-h-0">
                    <Tabs.Content value="bio">
                      <PersonalInfoForm
                        onNext={handleNext}
                        disabled={isPatientDataPrefilled || displayOnly}
                        patientId={_patientId}
                        onPatientCreated={onPatientCreated}
                      />
                    </Tabs.Content>

                    <Tabs.Content value="vitals">
                      <VitalsMeasurement
                        onNext={handleNext}
                        disabled={displayOnly}
                      />
                    </Tabs.Content>

                    <Tabs.Content value="labs">
                      <BloodTestsForm
                        onNext={handleNext}
                        disabled={displayOnly}
                      />
                    </Tabs.Content>

                    <Tabs.Content value="lifestyle">
                      <FamilyHistoryLifestyleForm
                        onNext={handleNext}
                        disabled={displayOnly}
                      />
                    </Tabs.Content>
                    <Tabs.Content value="familyHistory">
                      <FamilyHistoryForm
                        onNext={handleNext}
                        disabled={displayOnly}
                      />
                    </Tabs.Content>
                    <Tabs.Content value="ncdQuestionnaire">
                      <NCDQuestionnaireForm
                        onNext={handleNext}
                        disabled={displayOnly}
                      />
                    </Tabs.Content>

                    <Tabs.Content value="historical">
                      <HistoricalDataCollectionForm disabled={displayOnly} />
                      <div className="flex justify-end mt-6">
                        {!displayOnly && (
                          <Button
                            className="px-8"
                            leadingIcon={<IconPicker icon="saveAdd" />}
                            disabled={
                              isPending || !consentAgreement || assessmentDone
                            }
                            type="submit"
                          >
                            Generate Assessment
                          </Button>
                        )}
                      </div>
                    </Tabs.Content>
                  </div>
                </div>

                <div className="w-1/4 order-1 lg:order-2 hidden lg:block">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 sticky top-4 h-fit">
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                        <div>
                          <Text variant="text/md" className="font-semibold">
                            Assessment Progress
                          </Text>
                          {selectedNcds.length > 0 && (
                            <Text
                              variant="text/xs"
                              className="text-gray-500 mt-1"
                            >
                              {selectedNcds.length} assessment types selected
                            </Text>
                          )}
                        </div>
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
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary'
                            )}
                            value="bio"
                          >
                            1. Patient Bio-data
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed'
                            )}
                            value="vitals"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            2. Vitals & Measurements
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed'
                            )}
                            value="labs"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            3. Laboratory Tests
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed'
                            )}
                            value="lifestyle"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            4. Lifestyle & Habits
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed'
                            )}
                            value="familyHistory"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            5. Family History
                          </Tabs.Trigger>
                          {selectedNcds.length > 0 && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="ncdQuestionnaire"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('ncdQuestionnaire')}. NCD
                              Questionnaire
                            </Tabs.Trigger>
                          )}

                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed'
                            )}
                            value="historical"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            {getStepNumber('historical')}. Historical Data
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
              // data={data}
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
  // data,
  setShowResults,
  formData,
}: {
  showResults: boolean
  resultData?: any
  // data?: RiskAssessmentModel
  formData?: Partial<RiskAssessmentModelRequestData>
  setShowResults: (showResults: boolean) => void
}) => {
  const router = useRouter()
  const personalInfo = formData?.personalInfo

  const { data: polledData } = useRiskAssessmentPolling(resultData?.id)

  const actionButton = (
    <div className="mt-8 flex justify-end">
      <Button
        onClick={() => {
          setShowResults(false)
          router.push('/dashboard/risk-assessment')
        }}
      >
        Close
      </Button>
    </div>
  )

  if (showResults) {
    const mergedData = Object.assign(
      {},
      { responseData: polledData?.responseData || resultData },
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

  // if (data) {
  //   return (
  //     <RiskAssessmentReport
  //       className="w-full max-w-3xl mx-auto mt-10"
  //       action={actionButton}
  //       data={data}
  //       personalInfo={data?.requestData.personalInfo}
  //       showActionButton={false}
  //     />
  //   )
  // }
}

export const RiskAssessmentForm = (props: {
  data?: Pick<RiskAssessmentModel, 'requestData'>
  displayOnly?: boolean
  assessmentId?: string | null
  patientId?: string | null
  isPatientDataPrefilled?: boolean
  onPatientCreated?: (patientId: string) => void
}) => {
  return (
    <NcdFilterProvider initialNcdType={props.data?.requestData?.ncdType}>
      <RiskAssessmentFormContent
        displayOnly={
          props.displayOnly || props.data?.requestData?.status === 'completed'
        }
        {...props}
      />
    </NcdFilterProvider>
  )
}
