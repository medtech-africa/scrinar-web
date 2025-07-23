'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { EditPatientContent } from './edit-patient-content'

const navigationItems = [
  { label: 'Risk Assessment', icon: IconNames.arrowRight },
  { label: 'Patients', icon: IconNames.arrowRight },
  { label: 'Edit Patient' },
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

export interface IDataToSend {
  id?: string
  email?: string
  firstName: string
  middleName?: string
  lastName: string
  age: number
  gender?: string
  ethnicity?: string
  country?: string
  occupation?: string
  phoneNumber?: string
  address?: string
  nationalId?: string
  emergencyContact?: string
}

export default function EditPatient({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageHeader
        title="Edit Patient"
        subtitle="Update patient information and details."
        avatar="avatar"
        navigation={navigationItems}
      />
      <EditPatientContent patientId={params.id} />
    </div>
  )
}
