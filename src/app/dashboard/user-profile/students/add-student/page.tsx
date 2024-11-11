'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
// import calculateAge from '@/utils/calculateAge'
import { AddNewStudentContent } from './add-new-student-content'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Students', icon: IconNames.arrowRight },
  { label: 'Add New Student' },
]

export interface IFormValue {
  id?: string
  email?: string
  firstName: string
  lastName: string
  age: number
  gender: { value: string; label: string }
  level: { value: string; label: string }
  parentMobile?: string
  parentMobileAlt?: string
  password?: string
  avatar?: boolean
  familyCode?: string
}

export interface IDataToSend
  extends Omit<IFormValue, 'level' | 'gender' | 'avatar'> {
  level: string
  gender: string
  // age: number
}

export default function AddNewStudent() {
  return (
    <div>
      <PageHeader
        title="Add New Student"
        subtitle="Add Student: Create New Student Profile"
        navigation={navigationItems}
      />
      <AddNewStudentContent />
    </div>
  )
}
