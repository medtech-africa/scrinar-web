'use client'
import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { AddHealthDataRecordContent } from './add-health-data-record-content'

const navigationItems = [
  { label: 'Health Data', icon: IconNames.arrowRight },
  { label: 'Add New Record' },
]

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
