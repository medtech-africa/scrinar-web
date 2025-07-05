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
import { ScreeningQuestionsForm } from './ScreeningQuestionsForm'
import { FamilyHistoryForm } from './FamilyHistoryForm'
import CardiacAssessmentForm from './CardiacAssessmentForm'
import { COPDAssessmentForm } from './COPDAssessmentForm'
import { BreastCancerAssessmentForm } from './BreastCancerAssessmentForm'
import { ProstateCancerAssessmentForm } from './ProstateCancerAssessmentForm'
import { ColorectalCancerAssessmentForm } from './ColorectalCancerAssessmentForm'
import { CKDAssessmentForm } from './CKDAssessmentForm'
import { useRiskAssessmentStorage } from '@/hooks/useRiskAssessmentStorage'
import { slugify } from '@/utils/slugify'
import { NcdFilterProvider, useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { useRiskAssessmentPolling } from '@/hooks/queries/useRiskAssessment'

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

const tabOrder = [
  'bio',
  'vitals',
  'labs',
  'lifestyle',
  'familyHistory',
  'cardiacAssessment',
  'copdAssessment',
  'breastCancerAssessment',
  'prostateCancerAssessment',
  'colorectalCancerAssessment',
  'ckdAssessment',
  'medical',
  'historical',
  'timeseries',
]

const RiskAssessmentFormContent = ({
  data,
  displayOnly = false,
  assessmentId: _assessmentId = null,
  patientId: _patientId,
  userId: _userId,
  isPatientDataPrefilled = false,
  onUserIdObtained,
}: {
  data?: Pick<RiskAssessmentModel, 'requestData'>
  displayOnly?: boolean
  assessmentId?: string | null
  patientId?: string | null
  userId?: string | null
  isPatientDataPrefilled?: boolean
  onUserIdObtained?: (userId: string) => void
}) => {
  const [progress, setProgress] = useState(0)
  const [showResults, setShowResults] = useState(false)
  const [activeTab, setActiveTab] = useState('bio')
  const { selectedNcd, setSelectedNcd, getRequiredFields } = useNcdFilter()
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
      }, 500)
      return data
    },
    onError: (_err) => {
      toast.error(_err?.message || 'Failed to analyze risk assessment data')
      setProgress(0)
    },
  })

  const isFormValid = (data: any) => {
    if (selectedNcd === 'all') {
      const totalFields = 30
      const filledFields = countFilledFields(data)
      const filledPercentage = (filledFields / totalFields) * 100
      return (
        filledPercentage >= 60 &&
        !!formMethods.watch('personalInfo.dateOfBirth')
      )
    }

    const requiredFields = getRequiredFields(selectedNcd)
    if (!requiredFields) return false

    const formData = formMethods.watch()

    // Check if all required fields are filled
    const isAllFieldsFilled = Object.entries(requiredFields).every(
      ([field, isRequired]) => {
        if (!isRequired) return true

        // Map form fields to required fields
        const fieldMap: Record<string, string> = {
          age: 'personalInfo.age',
          gender: 'personalInfo.gender',
          systolicBP: 'vitals.systolicBP',
          bmi: 'vitals.bmi',
          height: 'vitals.height',
          weight: 'vitals.weight',
          diabetes: 'diagnosedConditions.diabetes',
          cholesterol: 'vitals.totalCholesterol',
          smoking: 'lifestyle.tobaccoCurrentlyUses',
          hasQuitSmoking: 'lifestyle.tobaccoQuit',
          dateOfBirth: 'personalInfo.dateOfBirth',
          // COPD fields
          coughDuration: 'copd.coughDuration',
          shortnessOfBreath: 'copd.shortnessOfBreath',
          activityLimitations: 'copd.activityLimitations',
          exposureToDust: 'copd.exposureToDust',
          // Breast Cancer fields
          ageAtMenarche: 'breastCancer.ageAtMenarche',
          ageAtFirstBirth: 'breastCancer.ageAtFirstBirth',
          ageAtMenopause: 'breastCancer.ageAtMenopause',
          hormoneReplacementTherapy: 'breastCancer.hormoneReplacementTherapy',
          benignBreastDisease: 'breastCancer.benignBreastDisease',
          familyHistoryBreastCancer: 'familyHistory.breastCancer',
          familyHistoryOvarianCancer: 'familyHistory.ovarianCancer',
          brcaMutationStatus: 'breastCancer.brcaMutationStatus',
          breastDensity: 'breastCancer.breastDensity',
          // Prostate Cancer fields
          psaLevel: 'prostateCancer.psaLevel',
          digitalRectalExam: 'prostateCancer.digitalRectalExam',
          prostateVolume: 'prostateCancer.prostateVolume',
          familyHistoryProstateCancer: 'familyHistory.prostateCancer',
          previousBiopsy: 'prostateCancer.previousBiopsy',
          freeToTotalPsaRatio: 'prostateCancer.freeToTotalPsaRatio',
          ethnicity: 'prostateCancer.ethnicity',
          urinarySymptoms: 'prostateCancer.urinarySymptomsIncompleteEmptying',
        }

        const formField = fieldMap[field]
        const fieldValue = formField
          .split('.')
          .reduce((obj, key) => obj?.[key], formData as any)

        return !!fieldValue
      }
    )

    return isAllFieldsFilled
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
      data
    )

    // Call analyzeRisk with assessmentId
    analyzeRisk(_assessmentId)
  }

  const isFormFilledError = (data: any) => {
    if (selectedNcd === 'all') {
      const filledPercentage = (countFilledFields(data) / 50) * 100
      if (filledPercentage < 60) {
        return 'Please fill more data to analyze risk assessment'
      }
    } else {
      const requiredFields = getRequiredFields(selectedNcd)
      if (!requiredFields) return 'Invalid NCD type selected'

      const missingFields = Object.entries(requiredFields)
        .filter(([field, isRequired]) => {
          if (!isRequired) return false

          const fieldMap: Record<string, string> = {
            age: 'personalInfo.age',
            gender: 'personalInfo.gender',
            systolicBP: 'vitals.systolicBP',
            bmi: 'vitals.bmi',
            height: 'vitals.height',
            weight: 'vitals.weight',
            diabetes: 'diagnosedConditions.diabetes',
            cholesterol: 'vitals.totalCholesterol',
            smoking: 'lifestyle.tobaccoCurrentlyUses',
            hasQuitSmoking: 'lifestyle.tobaccoQuit',
            dateOfBirth: 'personalInfo.dateOfBirth',
            // COPD fields
            coughDuration: 'copd.coughDuration',
            shortnessOfBreath: 'copd.shortnessOfBreath',
            activityLimitations: 'copd.activityLimitations',
            exposureToDust: 'copd.exposureToDust',
            // Breast Cancer fields
            ageAtMenarche: 'breastCancer.ageAtMenarche',
            ageAtFirstBirth: 'breastCancer.ageAtFirstBirth',
            ageAtMenopause: 'breastCancer.ageAtMenopause',
            hormoneReplacementTherapy: 'breastCancer.hormoneReplacementTherapy',
            benignBreastDisease: 'breastCancer.benignBreastDisease',
            familyHistoryBreastCancer: 'familyHistory.breastCancer',
            familyHistoryOvarianCancer: 'familyHistory.ovarianCancer',
            brcaMutationStatus: 'breastCancer.brcaMutationStatus',
            breastDensity: 'breastCancer.breastDensity',
            // Prostate Cancer fields
            psaLevel: 'prostateCancer.psaLevel',
            digitalRectalExam: 'prostateCancer.digitalRectalExam',
            prostateVolume: 'prostateCancer.prostateVolume',
            familyHistoryProstateCancer: 'familyHistory.prostateCancer',
            previousBiopsy: 'prostateCancer.previousBiopsy',
            freeToTotalPsaRatio: 'prostateCancer.freeToTotalPsaRatio',
            ethnicity: 'prostateCancer.ethnicity',
            urinarySymptoms: 'prostateCancer.urinarySymptoms',
          }

          const formField = fieldMap[field]
          const fieldValue = formField
            .split('.')
            .reduce((obj, key) => obj?.[key], data as any)
          return !fieldValue
        })
        .map(([field]) => field)

      if (missingFields.length > 0) {
        return `Please fill in the following required fields: ${missingFields.join(', ')}`
      }
    }

    if (!formMethods.watch('personalInfo.dateOfBirth')) {
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
    const nextTabIndex = tabOrder.indexOf(activeTab) + 1
    const nextTab = tabOrder[nextTabIndex]

    // If we have patientId but no assessmentId, and trying to go beyond bio section
    if (_patientId && !_assessmentId && nextTab && nextTab !== 'bio') {
      toast.error('Please wait for the assessment to be created')
      return
    }

    // Save current section data if we have an assessment ID
    if (_assessmentId) {
      const currentFormData = formMethods.watch()
      let sectionData: any = {}

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
        case 'cardiacAssessment':
          sectionData = { cardiac: currentFormData.cardiac }
          break
        case 'copdAssessment':
          sectionData = { copd: currentFormData.copd }
          break
        case 'breastCancerAssessment':
          sectionData = { breastCancer: currentFormData.breastCancer }
          break
        case 'prostateCancerAssessment':
          sectionData = { prostateCancer: currentFormData.prostateCancer }
          break
        case 'colorectalCancerAssessment':
          sectionData = { colorectalCancer: currentFormData.colorectalCancer }
          break
        case 'ckdAssessment':
          sectionData = { ckd: currentFormData.ckd }
          break
        case 'medical':
          sectionData = {
            symptoms: currentFormData.symptoms,
            diagnosedConditions: currentFormData.diagnosedConditions,
            sleepPattern: currentFormData.sleepPattern,
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

    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIndex + 1])
    }
  }

  const handlePrevious = () => {
    const currentIndex = tabOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(tabOrder[currentIndex - 1])
    }
  }

  // Calculate current step
  const getCurrentStep = () => {
    return tabOrder.indexOf(activeTab) + 1
  }

  // Get step number for a specific tab
  const getStepNumber = (tabValue: string) => {
    return tabOrder.indexOf(tabValue) + 1
  }

  const tabsLength = tabOrder.length - 1

  return (
    <FormProvider {...formMethods}>
      <div className="relative">
        <div className="container mx-auto px-0 md:px-4 py-6">
          <form
            onSubmit={formMethods.handleSubmit(handleSubmit)}
            className="w-full h-full"
          >
            {/* Status Section */}
            <StatusSection
              formData={formMethods.watch()}
              assessmentId={_assessmentId}
            />

            <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
              <div className="flex gap-8">
                <div className="w-full lg:w-3/4 order-2 lg:order-1">
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
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <Text as="h3" className="font-medium mb-3">
                        Assessment Type
                      </Text>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('all')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'all'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          All NCDs
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('cvd')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'cvd'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          CVD
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('diabetes')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'diabetes'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          Diabetes
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('copd')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'copd'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          COPD
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('breastCancer')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'breastCancer'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          Breast Cancer
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('prostateCancer')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'prostateCancer'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          Prostate Cancer
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('colorectalCancer')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'colorectalCancer'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          Colorectal Cancer
                        </button>
                        <button
                          type="button"
                          onClick={() => setSelectedNcd('ckd')}
                          className={cn(
                            'px-3 py-2 text-sm rounded-md border transition-all font-medium',
                            selectedNcd === 'ckd'
                              ? 'bg-primary text-white border-primary shadow-sm'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                          )}
                        >
                          CKD
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100">
                    <Tabs.Content value="bio">
                      <PersonalInfoForm
                        onNext={handleNext}
                        disabled={isPatientDataPrefilled}
                        userId={_userId}
                        patientId={_patientId}
                        onUserIdObtained={onUserIdObtained}
                      />
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
                    <Tabs.Content value="familyHistory">
                      <FamilyHistoryForm onNext={handleNext} />
                    </Tabs.Content>
                    <Tabs.Content value="cardiacAssessment">
                      <CardiacAssessmentForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="copdAssessment">
                      <COPDAssessmentForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="breastCancerAssessment">
                      <BreastCancerAssessmentForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="prostateCancerAssessment">
                      <ProstateCancerAssessmentForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="colorectalCancerAssessment">
                      <ColorectalCancerAssessmentForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="ckdAssessment">
                      <CKDAssessmentForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="medical">
                      <ScreeningQuestionsForm onNext={handleNext} />
                    </Tabs.Content>

                    <Tabs.Content value="historical">
                      <HistoricalDataCollectionForm />
                      <div className="flex justify-end mt-6">
                        {!displayOnly && (
                          <Button
                            className="px-8"
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

                <div className="w-1/4 order-1 lg:order-2 hidden lg:block">
                  <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 sticky top-4">
                    <Collapsible defaultOpen>
                      <CollapsibleTrigger className="flex items-center justify-between w-full mb-3">
                        <Text variant="text/md" className="font-semibold">
                          Assessment Progress
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
                          {selectedNcd !== NCD.DIABETES && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="cardiacAssessment"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              6. Cardiac Assessment
                            </Tabs.Trigger>
                          )}
                          {(selectedNcd === 'all' ||
                            selectedNcd === NCD.COPD) && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="copdAssessment"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('copdAssessment')}. COPD Assessment
                            </Tabs.Trigger>
                          )}
                          {(selectedNcd === 'all' ||
                            selectedNcd === NCD.BREAST_CANCER) && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="breastCancerAssessment"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('breastCancerAssessment')}. Breast
                              Cancer
                            </Tabs.Trigger>
                          )}
                          {(selectedNcd === 'all' ||
                            selectedNcd === NCD.PROSTATE_CANCER) && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="prostateCancerAssessment"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('prostateCancerAssessment')}.
                              Prostate Cancer
                            </Tabs.Trigger>
                          )}
                          {(selectedNcd === 'all' ||
                            selectedNcd === NCD.COLORECTAL_CANCER) && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="colorectalCancerAssessment"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('colorectalCancerAssessment')}.
                              Colorectal Cancer
                            </Tabs.Trigger>
                          )}
                          {(selectedNcd === 'all' ||
                            selectedNcd === NCD.CKD) && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed'
                              )}
                              value="ckdAssessment"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('ckdAssessment')}. CKD Assessment
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
                            value="medical"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            {getStepNumber('medical')}. Medical History
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
  const personalInfo = formData?.personalInfo

  const { data: polledData } = useRiskAssessmentPolling(resultData?.id)

  const actionButton = (
    <div className="mt-8 flex justify-end">
      <Button onClick={() => setShowResults(false)}>Close</Button>
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

export const RiskAssessmentForm = (props: {
  data?: Pick<RiskAssessmentModel, 'requestData'>
  displayOnly?: boolean
  assessmentId?: string | null
  patientId?: string | null
  userId?: string | null
  isPatientDataPrefilled?: boolean
  onUserIdObtained?: (userId: string) => void
}) => {
  return (
    <NcdFilterProvider>
      <RiskAssessmentFormContent {...props} />
    </NcdFilterProvider>
  )
}
