import { createContext, useContext, ReactNode, useState } from 'react'
import { getInternalFieldName } from '@/constants/fieldMappings'

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

interface NcdRequiredFields {
  cvd: {
    age: boolean
    gender: boolean
    systolicBP: boolean
    bmi: boolean
    diabetes: boolean
    cholesterol: boolean
    smoking: boolean
    hasQuitSmoking: boolean
  }
  diabetes: {
    age: boolean
    gender: boolean
    systolicBP: boolean
    height: boolean
    weight: boolean
    diabetes: boolean
    cholesterol: boolean
    smoking: boolean
    hasQuitSmoking: boolean
  }
  copd: {
    age: boolean
    gender: boolean
    smoking: boolean
    hasQuitSmoking: boolean
    coughDuration: boolean
    shortnessOfBreath: boolean
    activityLimitations: boolean
    exposureToDust: boolean
    pefLevel: boolean
  }
  breastCancer: {
    age: boolean
    gender: boolean
    height: boolean
    weight: boolean
    ageAtMenarche: boolean
    ageAtFirstBirth: boolean
    menopauseStatus: boolean
    hormoneReplacementTherapy: boolean
    breastBiopsy: boolean
    familyHistoryBreastCancer: boolean
    familyHistoryOvarianCancer: boolean
    brcaMutationStatus: boolean
    breastDensity: boolean
  }
  prostateCancer: {
    age: boolean
    gender: boolean
    psaLevel: boolean
    familyHistoryProstateCancer: boolean
    urinarySymptoms: boolean
  }
  colorectalCancer: {
    age: boolean
    gender: boolean
    height: boolean
    weight: boolean
    personalHistoryColorectalCancer: boolean
    personalHistoryPolyps: boolean
    familyHistoryColorectalCancer: boolean
    familyHistoryPolyps: boolean
    inflammatoryBowelDisease: boolean
    smokingStatus: boolean
    vegetableConsumption: boolean
    colonoscopyHistory: boolean
    aspirinUse: boolean
    nsaidUse: boolean
  }
  ckd: {
    age: boolean
    gender: boolean
    serumCreatinine: boolean
  }
}

const ncdRequiredFields: NcdRequiredFields = {
  cvd: {
    age: true,
    gender: true,
    bmi: true,
    diabetes: true,
    cholesterol: true,
    smoking: true,
    hasQuitSmoking: true,
    systolicBP: true,
  },
  diabetes: {
    age: true,
    gender: true,
    systolicBP: true,
    height: true,
    weight: true,
    diabetes: true,
    cholesterol: true,
    smoking: true,
    hasQuitSmoking: true,
  },
  copd: {
    age: true,
    gender: true,
    smoking: true,
    hasQuitSmoking: true,
    coughDuration: true,
    shortnessOfBreath: true,
    activityLimitations: true,
    exposureToDust: true,
    pefLevel: true,
  },
  breastCancer: {
    age: true,
    gender: true,
    height: true,
    weight: true,
    ageAtMenarche: true,
    ageAtFirstBirth: true,
    menopauseStatus: true,
    hormoneReplacementTherapy: true,
    breastBiopsy: true,
    familyHistoryBreastCancer: true,
    familyHistoryOvarianCancer: true,
    brcaMutationStatus: true,
    breastDensity: true,
  },
  prostateCancer: {
    age: true,
    gender: true,
    psaLevel: true,
    familyHistoryProstateCancer: true,
    urinarySymptoms: true,
  },
  colorectalCancer: {
    age: true,
    gender: true,
    height: true,
    weight: true,
    personalHistoryColorectalCancer: true,
    personalHistoryPolyps: true,
    familyHistoryColorectalCancer: true,
    familyHistoryPolyps: true,
    inflammatoryBowelDisease: true,
    smokingStatus: true,
    vegetableConsumption: true,
    colonoscopyHistory: true,
    aspirinUse: true,
    nsaidUse: true,
  },
  ckd: {
    age: true,
    gender: true,
    serumCreatinine: true,
  },
}

interface NcdFilterContextType {
  selectedNcd: NcdType
  setSelectedNcd: (ncd: NcdType) => void
  selectedSpecificNcds: SpecificNcdType[]
  setSelectedSpecificNcds: (ncds: SpecificNcdType[]) => void
  toggleSpecificNcd: (ncd: SpecificNcdType) => void
  selectAllSpecificNcds: () => void
  deselectAllSpecificNcds: () => void
  getRequiredFields: (
    ncdType: NcdType
  ) => NcdRequiredFields[keyof NcdRequiredFields] | null
  isFieldRequired: (field: string) => boolean
}

const NcdFilterContext = createContext<NcdFilterContextType | undefined>(
  undefined
)

export const NcdFilterProvider = ({ children }: { children: ReactNode }) => {
  const [selectedNcd, setSelectedNcd] = useState<NcdType>('all')
  const [selectedSpecificNcds, setSelectedSpecificNcds] = useState<
    SpecificNcdType[]
  >([
    'cvd',
    'diabetes',
    'copd',
    'breastCancer',
    'prostateCancer',
    'colorectalCancer',
    'ckd',
  ])

  const getRequiredFields = (
    ncdType: NcdType
  ): NcdRequiredFields[keyof NcdRequiredFields] | null => {
    if (ncdType === 'all') return null
    return ncdRequiredFields[ncdType]
  }

  const toggleSpecificNcd = (ncd: SpecificNcdType) => {
    setSelectedSpecificNcds((prev) => {
      if (prev.includes(ncd)) {
        const newSelection = prev.filter((item) => item !== ncd)
        // Ensure at least 2 NCDs are selected
        return newSelection.length >= 2 ? newSelection : prev
      } else {
        return [...prev, ncd]
      }
    })
  }

  const selectAllSpecificNcds = () => {
    setSelectedSpecificNcds([
      'cvd',
      'diabetes',
      'copd',
      'breastCancer',
      'prostateCancer',
      'colorectalCancer',
      'ckd',
    ])
  }

  const deselectAllSpecificNcds = () => {
    // Keep at least 2 NCDs selected (the first two)
    setSelectedSpecificNcds(['cvd', 'diabetes'])
  }

  const isFieldRequired = (field: string): boolean => {
    if (selectedNcd === 'all') {
      // Check if field is required for any of the selected specific NCDs
      return selectedSpecificNcds.some((ncdType) => {
        const requiredFields = getRequiredFields(ncdType)
        if (!requiredFields) return false
        const internalFieldName = getInternalFieldName(field)
        return (
          requiredFields[internalFieldName as keyof typeof requiredFields] ||
          false
        )
      })
    }

    const requiredFields = getRequiredFields(selectedNcd)
    if (!requiredFields) return false

    const internalFieldName = getInternalFieldName(field)
    return (
      requiredFields[internalFieldName as keyof typeof requiredFields] || false
    )
  }

  return (
    <NcdFilterContext.Provider
      value={{
        selectedNcd,
        setSelectedNcd,
        selectedSpecificNcds,
        setSelectedSpecificNcds,
        toggleSpecificNcd,
        selectAllSpecificNcds,
        deselectAllSpecificNcds,
        getRequiredFields,
        isFieldRequired,
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
