'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { AddNewProjectContent } from './add-new-project-content'

const navigationItems = [
  { label: 'Projects', icon: IconNames.arrowRight },
  { label: 'Add New Project' },
]

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
