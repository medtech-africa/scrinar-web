import { createContext, useContext, ReactNode, useState } from 'react'

export type NcdType =
  | 'all'
  | 'cvd'
  | 'diabetes'
  | 'copd'
  | 'breastCancer'
  | 'prostateCancer'
  | 'colorectalCancer'
  | 'ckd'

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
  copd: {
    dateOfBirth: boolean
    gender: boolean
    smoking: boolean
    hasQuitSmoking: boolean
    coughDuration: boolean
    shortnessOfBreath: boolean
    activityLimitations: boolean
    exposureToDust: boolean
  }
  breastCancer: {
    dateOfBirth: boolean
    gender: boolean
    height: boolean
    weight: boolean
    ageAtMenarche: boolean
    ageAtFirstBirth: boolean
    ageAtMenopause: boolean
    hormoneReplacementTherapy: boolean
    benignBreastDisease: boolean
    familyHistoryBreastCancer: boolean
    familyHistoryOvarianCancer: boolean
    brcaMutationStatus: boolean
    breastDensity: boolean
  }
  prostateCancer: {
    dateOfBirth: boolean
    gender: boolean
    psaLevel: boolean
    digitalRectalExam: boolean
    prostateVolume: boolean
    familyHistoryProstateCancer: boolean
    previousBiopsy: boolean
    freeToTotalPsaRatio: boolean
    ethnicity: boolean
    urinarySymptoms: boolean
  }
  colorectalCancer: {
    dateOfBirth: boolean
    gender: boolean
    height: boolean
    weight: boolean
    ethnicity: boolean
    personalHistoryColorectalCancer: boolean
    personalHistoryPolyps: boolean
    familyHistoryColorectalCancer: boolean
    familyHistoryPolyps: boolean
    inflammatoryBowelDisease: boolean
    smokingStatus: boolean
    vegetableConsumption: boolean
    physicalActivity: boolean
    colonoscopyHistory: boolean
    aspirinUse: boolean
    nsaidUse: boolean
  }
  ckd: {
    dateOfBirth: boolean
    gender: boolean
    serumCreatinine: boolean
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
  copd: {
    dateOfBirth: true,
    gender: true,
    smoking: true,
    hasQuitSmoking: true,
    coughDuration: true,
    shortnessOfBreath: true,
    activityLimitations: true,
    exposureToDust: true,
  },
  breastCancer: {
    dateOfBirth: true,
    gender: true,
    height: true,
    weight: true,
    ageAtMenarche: true,
    ageAtFirstBirth: true,
    ageAtMenopause: true,
    hormoneReplacementTherapy: true,
    benignBreastDisease: true,
    familyHistoryBreastCancer: true,
    familyHistoryOvarianCancer: true,
    brcaMutationStatus: true,
    breastDensity: true,
  },
  prostateCancer: {
    dateOfBirth: true,
    gender: true,
    psaLevel: true,
    digitalRectalExam: true,
    prostateVolume: true,
    familyHistoryProstateCancer: true,
    previousBiopsy: true,
    freeToTotalPsaRatio: true,
    ethnicity: true,
    urinarySymptoms: true,
  },
  colorectalCancer: {
    dateOfBirth: true,
    gender: true,
    height: true,
    weight: true,
    ethnicity: true,
    personalHistoryColorectalCancer: true,
    personalHistoryPolyps: true,
    familyHistoryColorectalCancer: true,
    familyHistoryPolyps: true,
    inflammatoryBowelDisease: true,
    smokingStatus: true,
    vegetableConsumption: true,
    physicalActivity: true,
    colonoscopyHistory: true,
    aspirinUse: true,
    nsaidUse: true,
  },
  ckd: {
    dateOfBirth: true,
    gender: true,
    serumCreatinine: true,
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
      // Colorectal Cancer fields
      personalHistoryColorectalCancer: 'colorectalCancer.personalHistory',
      personalHistoryPolyps: 'colorectalCancer.personalHistoryPolyps',
      familyHistoryColorectalCancer: 'familyHistory.colorectalCancer',
      familyHistoryPolyps: 'colorectalCancer.familyHistoryPolyps',
      inflammatoryBowelDisease: 'colorectalCancer.inflammatoryBowelDisease',
      smokingStatus: 'colorectalCancer.smokingStatus',
      vegetableConsumption: 'colorectalCancer.vegetableConsumption',
      physicalActivity: 'colorectalCancer.physicalActivity',
      colonoscopyHistory: 'colorectalCancer.colonoscopyHistory',
      aspirinUse: 'colorectalCancer.aspirinUse',
      nsaidUse: 'colorectalCancer.nsaidUse',
      // CKD fields
      serumCreatinine: 'ckd.serumCreatinine',
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
