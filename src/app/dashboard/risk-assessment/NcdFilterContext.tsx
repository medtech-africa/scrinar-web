import { createContext, useContext, ReactNode, useState } from 'react'

export type NcdType = 'all' | 'cvd' | 'diabetes'

interface NcdRequiredFields {
  cvd: {
    dateOfBirth: boolean
    gender: boolean
    systolicBP: boolean
    bmi: boolean
    diabetes: boolean
    cholesterol: boolean
    smoking: boolean
    hasQuitSmoking: boolean
  }
  diabetes: {
    dateOfBirth: boolean
    gender: boolean
    systolicBP: boolean
    height: boolean
    weight: boolean
    diabetes: boolean
    cholesterol: boolean
    smoking: boolean
    hasQuitSmoking: boolean
  }
}

const ncdRequiredFields: NcdRequiredFields = {
  cvd: {
    dateOfBirth: true,
    gender: true,
    bmi: true,
    diabetes: true,
    cholesterol: true,
    smoking: true,
    hasQuitSmoking: true,
    systolicBP: true,
  },
  diabetes: {
    dateOfBirth: true,
    gender: true,
    systolicBP: true,
    height: true,
    weight: true,
    diabetes: true,
    cholesterol: true,
    smoking: true,
    hasQuitSmoking: true,
  },
}

interface NcdFilterContextType {
  selectedNcd: NcdType
  setSelectedNcd: (ncd: NcdType) => void
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

  const getRequiredFields = (
    ncdType: NcdType
  ): NcdRequiredFields[keyof NcdRequiredFields] | null => {
    if (ncdType === 'all') return null
    return ncdRequiredFields[ncdType]
  }

  const isFieldRequired = (field: string): boolean => {
    if (selectedNcd === 'all') return true

    const requiredFields = getRequiredFields(selectedNcd)
    if (!requiredFields) return false

    const fieldMap: Record<string, string> = {
      gender: 'personalInfo.gender',
      systolicBP: 'vitals.sys',
      bmi: 'vitals.bmi',
      height: 'vitals.height',
      weight: 'vitals.weight',
      diabetes: 'diagnosedConditions.diabetes',
      cholesterol: 'bloodTest.cholesterol.total',
      smoking: 'lifestyle.tobacco.currentlyUses',
      hasQuitSmoking: 'lifestyle.tobacco.quit',
      dateOfBirth: 'personalInfo.dateOfBirth',
    }

    const mappedField = Object.entries(fieldMap).find(
      ([_, value]) => value === field
    )?.[0]
    return mappedField
      ? requiredFields[mappedField as keyof typeof requiredFields]
      : false
  }

  return (
    <NcdFilterContext.Provider
      value={{
        selectedNcd,
        setSelectedNcd,
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
