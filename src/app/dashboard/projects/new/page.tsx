'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
// import calculateAge from '@/utils/calculateAge'
import { AddNewProjectContent } from './add-new-project-content'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Projects', icon: IconNames.arrowRight },
  { label: 'Add New Project' },
]

export interface IFormValue {
  id?: string
  email?: string
  firstName: string
  lastName: string
  familyCode?: string
  mobile?: string
  gender: { value: string; label: string }
  avatar?: boolean
  age?: number
  isGuardian?: boolean
}

export interface IDataToSend
  extends Omit<IFormValue, 'level' | 'gender' | 'avatar'> {
  level: string
  gender: string
  // age: number
}

export default function AddNewProject() {
  return (
    <div>
      <PageHeader
        title="Add New Project"
        subtitle="Add Project: Create a New Project"
        navigation={navigationItems}
      />
      <AddNewProjectContent />
    </div>
  )
}
