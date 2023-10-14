'use client'
import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { AddRecordContent } from './add-record-content'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Instructors', icon: IconNames.arrowRight },
  { label: 'Add New Instructor' },
]
export interface InstructorFormValue {
  email: string
  firstName: string
  lastName: string
  phoneNumber: string
  middleName?: string
  password?: string
  role: { value: string; label: string }
  dob: string
  gender: { value: string; label: string }
  avatar?: boolean
}
export interface InstructorDataToSend
  extends Omit<InstructorFormValue, 'role' | 'gender'> {
  role: string
  gender: string
}

export default function AddRecord() {
  return (
    <div>
      <PageHeader
        title="Add New Instructor"
        subtitle="Add Instructor: Create New Teacher Profiles"
        navigation={navigationItems}
      />
      <AddRecordContent />
    </div>
  )
}
