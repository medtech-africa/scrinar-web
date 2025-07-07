'use client'

import { PageHeader } from '@/components/page-header'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { ViewPatientContent } from './view-patient-content'

const navigationItems = [
  { label: 'Patients', icon: IconNames.arrowRight },
  { label: 'View Patient' },
]

export default function ViewPatient({ params }: { params: { id: string } }) {
  return (
    <div>
      <PageHeader
        title="View Patient"
        subtitle="View patient information and details."
        avatar="avatar"
        navigation={navigationItems}
      />
      <ViewPatientContent patientId={params.id} />
    </div>
  )
}
