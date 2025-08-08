'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { PersonalInfoForm } from './PersonalInfoForm'
import { FormProvider, useForm } from 'react-hook-form'
import { VitalsMeasurement } from './VitalsMeasurement'
import { BloodTestsForm } from './BloodTestsForm'
import { FamilyHistoryLifestyleForm } from './FamilyHistoryLifestyleForm'
import { HistoricalDataCollectionForm } from './HistoricalDataCollectionForm'
import { useState, useEffect, useRef } from 'react'
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
import { getConditionalRequiredFields } from '@/constants/requiredFields'

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
  const formContainerRef = useRef<HTMLDivElement>(null)
  const {
    selectedNcds,
    toggleNcd,
    selectAllNcds,
    deselectAllNcds,
    hasNcdSelected,
    getNcdTypeString,
  } = useNcdFilter()
  const formMethods = useForm({ defaultValues: data?.requestData })

  // Reset form when data changes
  useEffect(() => {
    if (data?.requestData) {
      formMethods.reset(data.requestData)
    }
  }, [data?.requestData, formMethods])

  // Get gender for NCD filtering
  const gender = formMethods.watch('personalInfo.gender')?.toLowerCase()

  // Filter NCDs based on gender
  const getFilteredNcds = () => {
    const allNcds = ALL_NCD_TYPES
    if (gender === 'male') {
      // Hide breast cancer for males
      return allNcds.filter((ncd) => ncd !== NCD.BREAST_CANCER)
    } else if (gender === 'female') {
      // Hide prostate cancer for females
      return allNcds.filter((ncd) => ncd !== NCD.PROSTATE_CANCER)
    }
    return allNcds
  }

  // Auto-deselect gender-inappropriate NCDs when gender changes
  useEffect(() => {
    if (gender === 'male' && hasNcdSelected(NCD.BREAST_CANCER)) {
      toggleNcd(NCD.BREAST_CANCER)
    } else if (gender === 'female' && hasNcdSelected(NCD.PROSTATE_CANCER)) {
      toggleNcd(NCD.PROSTATE_CANCER)
    }
  }, [gender, hasNcdSelected, toggleNcd])

  // Get filtered NCDs based on gender
  const filteredNcds = getFilteredNcds()

  // Helper function to check if a specific tab is complete without changing state
  const getTabValidation = (
    tabValue: string
  ): { isComplete: boolean; missingFields: string[] } => {
    const formData = formMethods.watch()

    switch (tabValue) {
      case 'bio':
        return {
          isComplete: true,
          missingFields: [],
        }
      case 'vitals':
        const vitals = formData?.vitals
        const missingVitals = []

        // Check which vitals are required based on selected NCDs
        const requiredVitals = new Set<string>()

        selectedNcds.forEach((ncdType) => {
          const requiredFields = getConditionalRequiredFields(ncdType, formData)
          if (!requiredFields) return

          // Check for vitals-related fields
          Object.entries(requiredFields).forEach(([field, isRequired]) => {
            if (!isRequired) return

            // Map field names to vitals fields
            switch (field) {
              case 'height':
                requiredVitals.add('height')
                break
              case 'weight':
                requiredVitals.add('weight')
                break
              case 'systolicBP':
                requiredVitals.add('sys')
                break
              case 'diastolicBP':
                requiredVitals.add('dys')
                break
              case 'waist':
                requiredVitals.add('waist')
                break
              case 'bmi':
                // BMI is calculated from height and weight, so require both
                requiredVitals.add('height')
                requiredVitals.add('weight')
                break
            }
          })
        })

        // Check required vitals
        if (requiredVitals.has('height') && !vitals?.height) {
          missingVitals.push('Height')
        }
        if (requiredVitals.has('weight') && !vitals?.weight) {
          missingVitals.push('Weight')
        }
        if (requiredVitals.has('sys') && !vitals?.sys) {
          missingVitals.push('Systolic Blood Pressure')
        }
        if (requiredVitals.has('dys') && !vitals?.dys) {
          missingVitals.push('Diastolic Blood Pressure')
        }
        if (requiredVitals.has('waist') && !vitals?.waist) {
          missingVitals.push('Waist Circumference')
        }

        return {
          isComplete: missingVitals.length === 0,
          missingFields: missingVitals,
        }
      case 'labs':
        const bloodTest = formData?.bloodTest
        const missingLabs = []

        // Check which lab tests are required based on selected NCDs
        const requiredLabs = new Set<string>()

        selectedNcds.forEach((ncdType) => {
          const requiredFields = getConditionalRequiredFields(ncdType, formData)
          if (!requiredFields) return

          // Check for lab-related fields
          Object.entries(requiredFields).forEach(([field, isRequired]) => {
            if (!isRequired) return

            // Map field names to lab fields
            switch (field) {
              case 'serumCreatinine':
                requiredLabs.add('serumCreatinine')
                break
              case 'cholesterol':
                requiredLabs.add('cholesterolTotal')
                break
              case 'psaLevel':
                requiredLabs.add('psaLevel')
                break
            }
          })
        })

        // Check required lab tests
        if (
          requiredLabs.has('serumCreatinine') &&
          !bloodTest?.serumCreatinine
        ) {
          missingLabs.push('Serum Creatinine')
        }
        if (
          requiredLabs.has('cholesterolTotal') &&
          !bloodTest?.cholesterolTotal
        ) {
          missingLabs.push('Total Cholesterol')
        }
        if (requiredLabs.has('psaLevel') && !bloodTest?.psaLevel) {
          missingLabs.push('PSA Level')
        }

        return {
          isComplete: missingLabs.length === 0,
          missingFields: missingLabs,
        }
      case 'lifestyle':
        const lifestyle = formData?.lifestyle
        const missingLifestyle = []

        // Check which lifestyle fields are required based on selected NCDs
        const requiredLifestyle = new Set<string>()

        selectedNcds.forEach((ncdType) => {
          const requiredFields = getConditionalRequiredFields(ncdType, formData)
          if (!requiredFields) return

          // Check for lifestyle-related fields
          Object.entries(requiredFields).forEach(([field, isRequired]) => {
            if (!isRequired) return

            // Map field names to lifestyle fields
            switch (field) {
              case 'smoking':
                requiredLifestyle.add('everSmoked')
                break
              case 'hasQuitSmoking':
                requiredLifestyle.add('currentSmokingStatus')
                break
              case 'physicalActivity':
                requiredLifestyle.add('hasDailyPhysicalActivity')
                break
              case 'alcoholFrequency':
                requiredLifestyle.add('alcoholFrequency')
                break
            }
          })
        })

        // Check required lifestyle fields
        if (requiredLifestyle.has('everSmoked') && !lifestyle?.everSmoked) {
          missingLifestyle.push('Have you ever smoked?')
        }
        if (
          requiredLifestyle.has('currentSmokingStatus') &&
          !lifestyle?.currentSmokingStatus
        ) {
          missingLifestyle.push('Current smoking status')
        }
        if (
          requiredLifestyle.has('hasDailyPhysicalActivity') &&
          !lifestyle?.hasDailyPhysicalActivity
        ) {
          missingLifestyle.push('Daily physical activity')
        }
        if (
          requiredLifestyle.has('alcoholFrequency') &&
          !lifestyle?.alcoholFrequency
        ) {
          missingLifestyle.push('Alcohol consumption frequency')
        }

        return {
          isComplete: missingLifestyle.length === 0,
          missingFields: missingLifestyle,
        }
      case 'familyHistory':
        const familyHistory = formData?.familyHistory
        const missingFamilyHistory = []

        // Check which family history fields are required based on selected NCDs
        const requiredFamilyHistory = new Set<string>()

        selectedNcds.forEach((ncdType) => {
          const requiredFields = getConditionalRequiredFields(ncdType, formData)
          if (!requiredFields) return

          // Check for family history-related fields
          Object.entries(requiredFields).forEach(([field, isRequired]) => {
            if (!isRequired) return

            // Map field names to family history fields
            switch (field) {
              case 'hasFamilyhistoryDiabetes':
                requiredFamilyHistory.add('diabetes')
                break
              case 'familyHistoryBreastCancer':
                requiredFamilyHistory.add('breastCancer')
                break
              case 'familyHistoryOvarianCancer':
                requiredFamilyHistory.add('ovarianCancer')
                break
              case 'familyHistoryProstateCancer':
                requiredFamilyHistory.add('prostateCancer')
                break
              case 'familyHistoryColorectalCancer':
                requiredFamilyHistory.add('colorectalCancer')
                break
            }
          })
        })

        // Check required family history fields
        if (requiredFamilyHistory.has('diabetes') && !familyHistory?.diabetes) {
          missingFamilyHistory.push('Family history of Diabetes')
        }
        if (
          requiredFamilyHistory.has('breastCancer') &&
          !familyHistory?.breastCancer
        ) {
          missingFamilyHistory.push('Family history of Breast Cancer')
        }
        if (
          requiredFamilyHistory.has('ovarianCancer') &&
          !familyHistory?.ovarianCancer
        ) {
          missingFamilyHistory.push('Family history of Ovarian Cancer')
        }
        if (
          requiredFamilyHistory.has('prostateCancer') &&
          !familyHistory?.prostateCancer
        ) {
          missingFamilyHistory.push('Family history of Prostate Cancer')
        }
        if (
          requiredFamilyHistory.has('colorectalCancer') &&
          !familyHistory?.colorectalCancer
        ) {
          missingFamilyHistory.push('Family history of Colorectal Cancer')
        }

        return {
          isComplete: missingFamilyHistory.length === 0,
          missingFields: missingFamilyHistory,
        }
      case 'ncdQuestionnaire':
        // Check if all selected NCDs have their required fields filled
        const missingNcdFields: string[] = []

        selectedNcds.forEach((ncdType) => {
          const requiredFields = getConditionalRequiredFields(ncdType, formData)
          if (!requiredFields) return

          // Special handling for colorectal cancer
          if (ncdType === NCD.COLORECTAL_CANCER) {
            const personalHistory = formData?.colorectalCancer?.personalHistory
            if (personalHistory === 'Yes') {
              return
            }
          }

          // Special handling for breast cancer
          if (ncdType === NCD.BREAST_CANCER) {
            const hasBeenDiagnosed = formData?.breastCancer?.hasBeenDiagnosed
            if (hasBeenDiagnosed === 'Yes') {
              return
            }
          }

          // Special handling for prostate cancer
          if (ncdType === NCD.PROSTATE_CANCER) {
            const psaLevel = formData?.bloodTest?.psaLevel
            const hasPsaLevel = psaLevel && psaLevel.trim() !== ''
            if (hasPsaLevel) {
              return
            }
          }

          Object.entries(requiredFields).forEach(([field, isRequired]) => {
            if (!isRequired) return

            const formField = getFieldPath(field)
            const fieldValue = formField
              .split('.')
              .reduce((obj, key) => obj?.[key], formData as any)

            if (!fieldValue) {
              const displayName = getFieldDisplayName(field)
              missingNcdFields.push(
                `${NCD_DISPLAY_NAMES[ncdType as keyof typeof NCD_DISPLAY_NAMES]}: ${displayName}`
              )
            }
          })
        })

        return {
          isComplete: missingNcdFields.length === 0,
          missingFields: missingNcdFields,
        }
      case 'historical':
        const consentAgreement = formData?.consentAgreement
        const missingHistorical = []
        if (!consentAgreement) missingHistorical.push('Consent Agreement')
        return {
          isComplete: missingHistorical.length === 0,
          missingFields: missingHistorical,
        }
      default:
        return {
          isComplete: true,
          missingFields: [],
        }
    }
  }

  const storeRiskAssessment = useRiskAssessmentStorage((store) => store.store)

  const {
    mutate: analyzeRisk,
    isPending,
    data: resultData,
  } = useMutation({
    mutationFn: async (assessmentId: string) => {
      try {
        // Step 0: Store the assessment data
        const formData = formMethods.watch()
        formData.ncdType = getNcdTypeString()

        console.log(formData.ncdType, 'formData.ncdType')
        await baseAxios.patch(API.updateRiskAssessment(assessmentId), formData)

        // Step 1: Generate risk assessment
        await baseAxios.post(API.generateRiskAssessment(assessmentId))

        // Step 2: Poll for results with timeout
        const maxPollingTime = 60000 // 60 seconds timeout
        const pollInterval = 3000 // 3 seconds between polls
        const startTime = Date.now()

        while (Date.now() - startTime < maxPollingTime) {
          try {
            // Add cache-busting parameter to ensure fresh data
            const response = await baseAxios
              .get<{
                data: any
              }>(`${API.generateRiskAssessment(assessmentId)}?t=${Date.now()}`)
              .then((res) => res.data.data)

            // Check if we have complete data for selected NCDs
            const hasCompleteData = checkCompleteData(response, selectedNcds)

            if (hasCompleteData) {
              return response
            }

            // Wait before next poll
            await new Promise((resolve) => setTimeout(resolve, pollInterval))
          } catch (error: any) {
            // If it's a 404, the assessment might not be ready yet
            if (error?.response?.status === 404) {
              await new Promise((resolve) => setTimeout(resolve, pollInterval))
              continue
            }
            throw error
          }
        }

        // If we reach here, timeout occurred
        throw new Error('Assessment generation timed out. Please try again.')
      } catch (error: any) {
        // Provide more specific error messages based on the step that failed
        if (error?.response?.status === 404) {
          throw new Error('Assessment not found. Please try again.')
        } else if (error?.response?.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else {
          throw new Error(
            error?.message ||
              error?.response?.data?.message ||
              'Failed to analyze risk assessment data'
          )
        }
      }
    },
    onMutate: () => {
      setProgress(0)
      // Start progress animation with two phases for 15-second duration
      let phase = 1
      const interval = setInterval(() => {
        setProgress((prev) => {
          // Phase 1: Generate assessment (0-45%) - ~6.75 seconds
          if (phase === 1 && prev < 45) {
            return prev + 1
          }
          // Transition to phase 2 (45-50%)
          if (phase === 1 && prev >= 45) {
            phase = 2
            return 50
          }
          // Phase 2: Fetch results (50-90%) - ~6 seconds
          if (phase === 2 && prev < 90) {
            return prev + 1
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

  // Helper function to check if data is complete for selected NCDs
  const checkCompleteData = (response: any, selectedNcds: string[]) => {
    if (!response?.responseData) return false

    const responseData = response.responseData
    let hasAtLeastOneComplete = false

    // Check each selected NCD type
    for (const ncdType of selectedNcds) {
      let isNcdComplete = false

      switch (ncdType) {
        case 'cvd':
          // Check if WHO data exists and has required fields
          const whoData = responseData.who
          isNcdComplete = !!(whoData?.score !== undefined && whoData?.riskLevel)
          break
        case 'diabetes':
          // Check if FINDRISC data exists and has required fields
          const findriscData = responseData.findrisc
          isNcdComplete = !!(findriscData?.score && findriscData?.riskLevel)
          break
        case 'copd':
          // Check if COPD data exists and has required fields
          const copdData = responseData.copd
          const copdOutputData = responseData.copdOutput
          isNcdComplete = !!(
            copdData?.score !== undefined || copdOutputData?.score
          )
          break
        case 'breastCancer':
          // Check if Breast Cancer data exists and has required fields
          const breastCancerData = responseData.breastCancer
          isNcdComplete = !!(
            breastCancerData?.score !== undefined && breastCancerData?.riskLevel
          )
          break
        case 'prostateCancer':
          // Check if Prostate Cancer data exists and has required fields
          const prostateData = responseData.prostate
          const prostateOutputData = responseData.prostateOutput
          isNcdComplete = !!(
            prostateData?.score !== undefined || prostateOutputData?.score
          )
          break
        case 'colorectalCancer':
          // Check if Colorectal Cancer data exists and has required fields
          const colorectalData = responseData.colorectal
          const colorectalOutputData = responseData.colorectalOutput
          isNcdComplete = !!(
            colorectalData?.score !== undefined || colorectalOutputData?.score
          )
          break
        case 'ckd':
          // Check if CKD data exists and has required fields
          const ckdData = responseData.ckd
          const ckdOutputData = responseData.ckdOutput
          isNcdComplete = !!(ckdData?.stage || ckdOutputData?.score)
          break
      }

      if (isNcdComplete) {
        hasAtLeastOneComplete = true
      }
    }

    return hasAtLeastOneComplete
  }

  const isFormValid = (_data: any) => {
    // Check if all required fields for selected NCDs are filled
    const formData = formMethods.watch()

    // Check if all selected NCDs have their required fields filled
    const allRequiredFieldsFilled = selectedNcds.every((ncdType) => {
      const requiredFields = getConditionalRequiredFields(ncdType, formData)
      if (!requiredFields) return true

      // Special handling for colorectal cancer
      if (ncdType === NCD.COLORECTAL_CANCER) {
        const personalHistory = formData?.colorectalCancer?.personalHistory
        if (personalHistory === 'Yes') {
          // If patient has been diagnosed with colorectal cancer, skip validation
          return true
        }
      }

      // Special handling for breast cancer
      if (ncdType === NCD.BREAST_CANCER) {
        const hasBeenDiagnosed = formData?.breastCancer?.hasBeenDiagnosed
        if (hasBeenDiagnosed === 'Yes') {
          // If patient has been diagnosed with breast cancer, skip validation
          return true
        }
      }

      // Special handling for prostate cancer
      if (ncdType === NCD.PROSTATE_CANCER) {
        const psaLevel = formData?.bloodTest?.psaLevel
        const hasPsaLevel = psaLevel && psaLevel.trim() !== ''
        if (hasPsaLevel) {
          // If PSA level is available, skip urinary symptoms validation
          return true
        }
      }

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

    // Check for colorectal and breast cancer conditions and update ncdType accordingly
    let finalNcdType = getNcdTypeString()
    const formData = formMethods.watch()

    // If colorectal cancer is selected but patient has been diagnosed, remove it from ncdType
    if (selectedNcds.includes(NCD.COLORECTAL_CANCER)) {
      const personalHistory = formData?.colorectalCancer?.personalHistory
      if (personalHistory === 'Yes') {
        // Remove colorectal cancer from ncdType
        const ncdTypes = finalNcdType.split(',').map((type) => type.trim())
        const filteredNcdTypes = ncdTypes.filter(
          (type) => type !== NCD.COLORECTAL_CANCER
        )
        finalNcdType = filteredNcdTypes.join(', ')
      }
    }

    // If breast cancer is selected but patient has been diagnosed, remove it from ncdType
    if (selectedNcds.includes(NCD.BREAST_CANCER)) {
      const hasBeenDiagnosed = formData?.breastCancer?.hasBeenDiagnosed
      if (hasBeenDiagnosed === 'Yes') {
        // Remove breast cancer from ncdType
        const ncdTypes = finalNcdType.split(',').map((type) => type.trim())
        const filteredNcdTypes = ncdTypes.filter(
          (type) => type !== NCD.BREAST_CANCER
        )
        finalNcdType = filteredNcdTypes.join(', ')
      }
    }

    // Add ncdType to the data
    const formDataWithNcdType = {
      ...data,
      ncdType: finalNcdType,
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
      const requiredFields = getConditionalRequiredFields(ncdType, formData)
      if (!requiredFields) return

      // Special handling for colorectal cancer
      if (ncdType === NCD.COLORECTAL_CANCER) {
        const personalHistory = formData?.colorectalCancer?.personalHistory
        if (personalHistory === 'Yes') {
          // If patient has been diagnosed with colorectal cancer, skip validation
          return
        }
      }

      // Special handling for breast cancer
      if (ncdType === NCD.BREAST_CANCER) {
        const hasBeenDiagnosed = formData?.breastCancer?.hasBeenDiagnosed
        if (hasBeenDiagnosed === 'Yes') {
          // If patient has been diagnosed with breast cancer, skip validation
          return
        }
      }

      // Special handling for prostate cancer
      if (ncdType === NCD.PROSTATE_CANCER) {
        const psaLevel = formData?.bloodTest?.psaLevel
        const hasPsaLevel = psaLevel && psaLevel.trim() !== ''
        if (hasPsaLevel) {
          // If PSA level is available, skip urinary symptoms validation
          return
        }
      }

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
    // Check if current section is complete
    const { isComplete, missingFields } = getTabValidation(activeTab)
    if (!isComplete) {
      const sectionName =
        activeTab === 'bio'
          ? 'Patient Bio-data'
          : activeTab === 'vitals'
            ? 'Vitals & Measurements'
            : activeTab === 'labs'
              ? 'Laboratory Tests'
              : activeTab === 'lifestyle'
                ? 'Lifestyle & Habits'
                : activeTab === 'familyHistory'
                  ? 'Family History'
                  : activeTab === 'ncdQuestionnaire'
                    ? 'NCD Questionnaire'
                    : activeTab === 'historical'
                      ? 'Historical Data'
                      : 'Current Section'

      const errorMessage = `Please complete the following required fields in ${sectionName}:\n• ${missingFields.join('\n• ')}`
      toast.error(errorMessage, { duration: 5000 })
      return
    }

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

      switch (activeTab) {
        case 'bio':
          // sectionData = { personalInfo: currentFormData.personalInfo }
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

      formMethods.setValue('ncdType', getNcdTypeString())
      sectionData.ncdType = getNcdTypeString()

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
      // Auto-scroll to top when moving to next section
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    }
  }

  const handlePrevious = () => {
    const filteredOrder = getFilteredTabOrder()
    const currentIndex = filteredOrder.indexOf(activeTab)
    if (currentIndex > 0) {
      setActiveTab(filteredOrder[currentIndex - 1])
      // Auto-scroll to top when moving to previous section
      setTimeout(() => {
        if (formContainerRef.current) {
          formContainerRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
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
                                    selectedNcds.length === filteredNcds.length
                                  }
                                  onChange={() => {
                                    if (
                                      selectedNcds.length ===
                                      filteredNcds.length
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
                              {gender !== 'male' && (
                                <label className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={hasNcdSelected(NCD.BREAST_CANCER)}
                                    onChange={() =>
                                      toggleNcd(NCD.BREAST_CANCER)
                                    }
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
                              )}
                              {gender !== 'female' && (
                                <label className="flex items-center space-x-3 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={hasNcdSelected(
                                      NCD.PROSTATE_CANCER
                                    )}
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
                              )}
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

                  <div
                    ref={formContainerRef}
                    className="bg-white rounded-2xl p-4 md:p-6 border border-gray-100 min-h-0"
                  >
                    <Tabs.Content value="bio">
                      <PersonalInfoForm
                        onNext={handleNext}
                        disabled={isPatientDataPrefilled || displayOnly}
                        displayOnly={displayOnly}
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
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              getTabValidation('bio').isComplete &&
                                'border-l-4 border-l-green-500'
                            )}
                            value="bio"
                          >
                            1. Patient Bio-data
                            {getTabValidation('bio').isComplete && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed',
                              getTabValidation('vitals').isComplete &&
                                'border-l-4 border-l-green-500'
                            )}
                            value="vitals"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            2. Vitals & Measurements
                            {getTabValidation('vitals').isComplete && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed',
                              getTabValidation('labs').isComplete &&
                                'border-l-4 border-l-green-500'
                            )}
                            value="labs"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            3. Laboratory Tests
                            {getTabValidation('labs').isComplete && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed',
                              getTabValidation('lifestyle').isComplete &&
                                'border-l-4 border-l-green-500'
                            )}
                            value="lifestyle"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            4. Lifestyle & Habits
                            {getTabValidation('lifestyle').isComplete && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                          </Tabs.Trigger>
                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed',
                              getTabValidation('familyHistory').isComplete &&
                                'border-l-4 border-l-green-500'
                            )}
                            value="familyHistory"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            5. Family History
                            {getTabValidation('familyHistory').isComplete && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
                          </Tabs.Trigger>
                          {selectedNcds.length > 0 && (
                            <Tabs.Trigger
                              className={cn(
                                'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                                'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                                'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                                _patientId &&
                                  !_assessmentId &&
                                  'opacity-50 cursor-not-allowed',
                                getTabValidation('ncdQuestionnaire')
                                  .isComplete && 'border-l-4 border-l-green-500'
                              )}
                              value="ncdQuestionnaire"
                              disabled={!!(_patientId && !_assessmentId)}
                            >
                              {getStepNumber('ncdQuestionnaire')}. NCD
                              Questionnaire
                              {getTabValidation('ncdQuestionnaire')
                                .isComplete && (
                                <span className="ml-2 text-green-600">✓</span>
                              )}
                            </Tabs.Trigger>
                          )}

                          <Tabs.Trigger
                            className={cn(
                              'text-sm text-gray-700 py-2 px-3 transition-all cursor-pointer block w-full text-left rounded-md',
                              'data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:font-medium',
                              'hover:bg-gray-50 data-[state=active]:hover:bg-primary',
                              _patientId &&
                                !_assessmentId &&
                                'opacity-50 cursor-not-allowed',
                              getTabValidation('historical').isComplete &&
                                'border-l-4 border-l-green-500'
                            )}
                            value="historical"
                            disabled={!!(_patientId && !_assessmentId)}
                          >
                            {getStepNumber('historical')}. Historical Data
                            {getTabValidation('historical').isComplete && (
                              <span className="ml-2 text-green-600">✓</span>
                            )}
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
                ncdType: getNcdTypeString(),
              }}
              // data={data}
              setShowResults={setShowResults}
              assessmentId={_assessmentId ?? ''}
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
  assessmentId,
}: {
  showResults: boolean
  resultData?: any
  // data?: RiskAssessmentModel
  formData?: Partial<RiskAssessmentModelRequestData>
  setShowResults: (showResults: boolean) => void
  assessmentId?: string
}) => {
  const router = useRouter()
  const personalInfo = formData?.personalInfo

  const { data: polledData } = useRiskAssessmentPolling(
    resultData?.id,
    formData?.ncdType?.split(',').map((ncd) => ncd.trim().toLowerCase()) || []
  )

  // Check if we have at least one NCD result available
  const hasAtLeastOneResult = () => {
    if (!polledData?.responseData) return false

    const responseData = polledData.responseData
    const selectedNcds =
      formData?.ncdType?.split(',').map((ncd) => ncd.trim().toLowerCase()) || []

    for (const ncdType of selectedNcds) {
      let hasResult = false

      switch (ncdType) {
        case 'cvd':
          hasResult = !!(responseData.who?.score && responseData.who?.riskLevel)
          break
        case 'diabetes':
          hasResult = !!(
            responseData.findrisc?.score && responseData.findrisc?.riskLevel
          )
          break
        case 'copd':
          hasResult = !!(
            responseData.copd?.score || responseData.copdOutput?.score
          )
          break
        case 'breastcancer':
          hasResult = !!(
            (responseData.breastCancer?.score &&
              responseData.breastCancer?.riskLevel) ||
            (responseData.breastCancerOutput?.score &&
              responseData.breastCancerOutput?.riskLevel)
          )
          break
        case 'prostatecancer':
          hasResult = !!(
            (responseData.prostate?.score &&
              responseData.prostate?.riskLevel) ||
            (responseData.prostateOutput?.score &&
              responseData.prostateOutput?.riskLevel)
          )
          break
        case 'colorectalcancer':
          hasResult = !!(
            (responseData.colorectal?.score &&
              responseData.colorectal?.riskLevel) ||
            (responseData.colorectalOutput?.score &&
              responseData.colorectalOutput?.riskLevel)
          )
          break
        case 'ckd':
          hasResult = !!(
            responseData.ckd?.stage || responseData.ckdOutput?.score
          )
          break
      }

      if (hasResult) return true
    }

    return false
  }

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

  if (showResults || hasAtLeastOneResult()) {
    const mergedData = Object.assign(
      {},
      { responseData: polledData?.responseData || resultData?.responseData },
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
          showActionButton={true}
          assessmentId={assessmentId}
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
