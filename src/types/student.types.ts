import {
  DietaryDiversity,
  PhysicalActivity,
  SelectVal,
  TCholesterol,
} from './healthData.types'

export interface Student extends SelectVal {
  id: string
  firstName?: string
  lastName?: string
  avatarUrl?: string
  age?: string
  gender?: string
  latestHealthData?: {
    bmi: string
    height: string
    weight: string
    waist: string
    bloodPressure: string
    pulse: string
    glucoseLevel: string
    cholesterol: TCholesterol
    dietaryDiversity: DietaryDiversity
    physicalActivity: PhysicalActivity
  }
}
