'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { AddNewPatientContent } from './add-new-patient-content'

const navigationItems = [
  { label: 'Risk Assessment', icon: IconNames.arrowRight },
  { label: 'Patients', icon: IconNames.arrowRight },
  { label: 'Add New Patient' },
]

export interface IFormValue {
  id?: string
  email?: string
  firstName: string
  middleName?: string
  lastName: string
  age: number
  gender: { value: string; label: string }
  ethnicity?: { value?: string; label?: string }
  country?: { value?: string; label?: string }
  occupation?: string
  phoneNumber?: string
  address?: string
  nationalId?: string
  emergencyContact?: string
  avatar?: boolean
}

export interface IDataToSend
  extends Omit<IFormValue, 'gender' | 'ethnicity' | 'country' | 'avatar'> {
  gender: string
  ethnicity?: string
  country?: string
}

export default function AddNewPatient() {
  return (
    <div>
      <PageHeader
        title="Add New Patient"
        subtitle="Add Patient: Create New Patient Profile"
        navigation={navigationItems}
      />
      <AddNewPatientContent />
    </div>
  )
}
