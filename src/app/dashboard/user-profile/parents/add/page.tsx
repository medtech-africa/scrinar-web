'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
// import calculateAge from '@/utils/calculateAge'
import { AddNewParentContent } from './add-new-parent-content'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Parents', icon: IconNames.arrowRight },
  { label: 'Add New Parent' },
]

export interface IFormValue {
  email?: string
  firstName: string
  lastName: string
  familyCode?: string
  age: number
  mobile?: string
  gender: { value: string; label: string }
  password?: string
  avatar?: boolean
}

export interface IDataToSend
  extends Omit<IFormValue, 'level' | 'gender' | 'avatar'> {
  level: string
  gender: string
  // age: number
}

export default function AddNewParent() {
  return (
    <div>
      <PageHeader
        title="Add New Parent"
        subtitle="Add Parent: Create New Parent Profile"
        navigation={navigationItems}
      />
      <AddNewParentContent />
    </div>
  )
}
