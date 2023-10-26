'use client'
import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { AddHealthDataRecordContent } from './add-health-data-record-content'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Add New Record' },
]
export interface SelectVal {
  label: string
  value: string
}

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
export interface DietaryDiversity {
  hoursOnComputer: number
  hoursOnTv: number
  hoursOnSleep: number
  sportQuestion: string
  schoolTransportQuestion: string
}

export interface PhysicalActivity {
  fruitsTimes: FruitsTimes
  mealsPerDay: number
  foodAmount: string
  dietary: string[]
}

export interface FruitsTimes {
  fish: number
  friedFood: number
  sugar: number
  pastries: number
  sweets: number
  carbohydrates: number
  egg: number
  fruits: number
  meat: number
  vegetable: number
}
export type IDataToSend = {
  userId: string
  glucoseLevel?: string
  bloodPressure?: string
  waist?: string
  weight?: string
  height?: string
  bmi?: string
  dietaryDiversityScore?: string
  physicalActivityScore?: string
}

export default function AddRecord() {
  return (
    <div>
      <PageHeader
        title="Add New Record"
        subtitle="Add new Health Data: track student health progress"
        navigation={navigationItems}
        avatar="avatar"
      />
      <AddHealthDataRecordContent />
    </div>
  )
}
