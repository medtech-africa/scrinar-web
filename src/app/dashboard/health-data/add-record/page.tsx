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
