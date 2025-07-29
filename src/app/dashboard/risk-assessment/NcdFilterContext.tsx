import { createContext, useContext, ReactNode, useState } from 'react'
import { getInternalFieldName } from '@/constants/fieldMappings'
import {
  getRequiredFields as getRequiredFieldsFromConfig,
  getConditionalRequiredFields,
  checkUrinarySymptomsFilled,
} from '@/constants/requiredFields'

export type NcdType =
  | 'all'
  | 'cvd'
  | 'diabetes'
  | 'copd'
  | 'breastCancer'
  | 'prostateCancer'
  | 'colorectalCancer'
  | 'ckd'

export type SpecificNcdType = Exclude<NcdType, 'all'>

interface NcdFilterContextType {
  selectedNcds: SpecificNcdType[]
  setSelectedNcds: (ncds: SpecificNcdType[]) => void
  toggleNcd: (ncd: SpecificNcdType) => void
  selectAllNcds: () => void
  deselectAllNcds: () => void
  getRequiredFields: (ncdType: SpecificNcdType) => any | null
  isFieldRequired: (field: string, formData?: any) => boolean
  hasNcdSelected: (ncd: SpecificNcdType) => boolean
}

const NcdFilterContext = createContext<NcdFilterContextType | undefined>(
  undefined
)

export const NcdFilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNcds, setSelectedNcds] = useState<SpecificNcdType[]>([
    'cvd',
    'diabetes',
    'copd',
    'breastCancer',
    'prostateCancer',
    'colorectalCancer',
    'ckd',
  ])

  const getRequiredFields = (ncdType: SpecificNcdType): any | null => {
    return getRequiredFieldsFromConfig(ncdType)
  }

  const toggleNcd = (ncd: SpecificNcdType) => {
    setSelectedNcds((prev) => {
      if (prev.includes(ncd)) {
        const newSelection = prev.filter((item) => item !== ncd)
        // Ensure at least 2 NCDs are selected
        return newSelection.length >= 2 ? newSelection : prev
      } else {
        return [...prev, ncd]
      }
    })
  }

  const selectAllNcds = () => {
    setSelectedNcds([
      'cvd',
      'diabetes',
      'copd',
      'breastCancer',
      'prostateCancer',
      'colorectalCancer',
      'ckd',
    ])
  }

  const deselectAllNcds = () => {
    // Keep at least 2 NCDs selected (the first two)
    setSelectedNcds(['cvd', 'diabetes'])
  }

  const isFieldRequired = (field: string, formData?: any): boolean => {
    return selectedNcds.some((ncdType) => {
      // Use conditional required fields if formData is provided
      if (formData) {
        const conditionalFields = getConditionalRequiredFields(
          ncdType,
          formData
        )
        const internalFieldName = getInternalFieldName(field)

        // Special handling for urinary symptoms - check if any are filled
        if (
          internalFieldName === 'urinarySymptoms' &&
          ncdType === 'prostateCancer'
        ) {
          const hasPsaLevel =
            formData?.bloodTest?.psaLevel &&
            formData.bloodTest.psaLevel.trim() !== ''

          // If PSA level is available, urinary symptoms are not required
          if (hasPsaLevel) {
            return false
          }

          // If PSA level is not available, check if any urinary symptoms are filled
          return !checkUrinarySymptomsFilled(formData)
        }

        return (
          conditionalFields[
            internalFieldName as keyof typeof conditionalFields
          ] || false
        )
      }

      // Fall back to basic required fields check
      const requiredFields = getRequiredFields(ncdType)
      if (!requiredFields) return false
      const internalFieldName = getInternalFieldName(field)
      return (
        requiredFields[internalFieldName as keyof typeof requiredFields] ||
        false
      )
    })
  }

  const hasNcdSelected = (ncd: SpecificNcdType): boolean => {
    return selectedNcds.includes(ncd)
  }

  return (
    <NcdFilterContext.Provider
      value={{
        selectedNcds,
        setSelectedNcds,
        toggleNcd,
        selectAllNcds,
        deselectAllNcds,
        getRequiredFields,
        isFieldRequired,
        hasNcdSelected,
      }}
    >
      {children}
    </NcdFilterContext.Provider>
  )
}

export const useNcdFilter = () => {
  const context = useContext(NcdFilterContext)
  if (context === undefined) {
    throw new Error('useNcdFilter must be used within a NcdFilterProvider')
  }
  return context
}
