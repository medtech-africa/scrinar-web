import { DietaryDiversity, PhysicalActivity, SelectVal } from "./healthData.types"

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
    glucoseLevel: string
    cholesterol: string
    dietaryDiversity: DietaryDiversity
    physicalActivity: PhysicalActivity
  }
}