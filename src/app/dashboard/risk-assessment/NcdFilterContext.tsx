import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react'
import { getInternalFieldName } from '@/constants/fieldMappings'
import {
  getRequiredFields as getRequiredFieldsFromConfig,
  getConditionalRequiredFields,
  checkUrinarySymptomsFilled,
} from '@/constants/requiredFields'
import { NCD } from '@/types/riskAssessment.types'
import { ALL_NCD_TYPES } from '@/constants/riskAssessment'

export type SpecificNcdType = NCD

interface NcdFilterContextType {
  selectedNcds: SpecificNcdType[]
  setSelectedNcds: (ncds: SpecificNcdType[]) => void
  toggleNcd: (ncd: SpecificNcdType) => void
  selectAllNcds: () => void
  deselectAllNcds: () => void
  getRequiredFields: (ncdType: SpecificNcdType) => any | null
  isFieldRequired: (field: string, formData?: any) => boolean
  hasNcdSelected: (ncd: SpecificNcdType) => boolean
  getNcdTypeString: () => string
}

const NcdFilterContext = createContext<NcdFilterContextType | undefined>(
  undefined
)

interface NcdFilterProviderProps {
  children: ReactNode
  initialNcdType?: string
}

export const NcdFilterProvider = ({
  children,
  initialNcdType,
}: NcdFilterProviderProps) => {
  const [selectedNcds, setSelectedNcds] =
    useState<SpecificNcdType[]>(ALL_NCD_TYPES)

  // Parse initial ncdType and set selected NCDs
  useEffect(() => {
    if (initialNcdType && initialNcdType.trim() !== '') {
      const ncdArray = initialNcdType
        .split(',')
        .map((ncd) => ncd.trim() as SpecificNcdType)
      // Filter to only include valid NCD types
      const validNcds = ncdArray.filter((ncd) =>
        Object.values(NCD).includes(ncd)
      )

      if (validNcds.length >= 1) {
        setSelectedNcds(validNcds)
      } else {
        // If less than 1 valid NCDs, default to all
        setSelectedNcds(ALL_NCD_TYPES)
      }
    } else {
      // If no ncdType provided, default to all
      setSelectedNcds(ALL_NCD_TYPES)
    }
  }, [initialNcdType])

  const getRequiredFields = (ncdType: SpecificNcdType): any | null => {
    return getRequiredFieldsFromConfig(ncdType)
  }

  const toggleNcd = (ncd: SpecificNcdType) => {
    setSelectedNcds((prev) => {
      if (prev.includes(ncd)) {
        const newSelection = prev.filter((item) => item !== ncd)
        // Ensure at least 1 NCD is selected
        return newSelection.length >= 1 ? newSelection : prev
      } else {
        return [...prev, ncd]
      }
    })
  }

  const selectAllNcds = () => {
    setSelectedNcds(ALL_NCD_TYPES)
  }

  const deselectAllNcds = () => {
    // Keep at least 1 NCD selected (the first one)
    setSelectedNcds([NCD.CVD])
  }

  const getNcdTypeString = (): string => {
    return selectedNcds.join(',')
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
          ncdType === NCD.PROSTATE_CANCER
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
        getNcdTypeString,
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
