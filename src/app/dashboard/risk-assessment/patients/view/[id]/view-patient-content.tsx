'use client'
import { Button } from '@/components/ui/button'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import { usePatient } from '@/hooks/queries/usePatients'
import ContentLoader from '@/components/content-loader'
import { useRouter } from 'next/navigation'
import { IconPicker } from '@/components/ui/icon-picker'

export const ViewPatientContent = ({ patientId }: { patientId: string }) => {
  const router = useRouter()
  const { data: patient, isPending: isLoading } = usePatient(patientId)

  if (isLoading) {
    return <ContentLoader loading={isLoading} />
  }

  if (!patient) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Text variant="text/lg" className="text-grey-600 mb-4">
          Patient not found
        </Text>
        <Button
          variant="outline"
          onClick={() => router.push('/dashboard/risk-assessment')}
        >
          Back to Patients
        </Button>
      </div>
    )
  }

  return (
    <div className="w-full pt-7 mt-2">
      <PageCard title="Patient Information" bodyStyle="p-6">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
          <div className="space-y-4">
            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                First Name
              </Text>
              <Text variant="text/md" className="text-grey-900 font-medium">
                {patient.firstName || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Middle Name
              </Text>
              <Text variant="text/md" className="text-grey-900 font-medium">
                {patient.middleName || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Last Name
              </Text>
              <Text variant="text/md" className="text-grey-900 font-medium">
                {patient.lastName || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Age
              </Text>
              <Text variant="text/md" className="text-grey-900 font-medium">
                {patient.age ? `${patient.age} years` : 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Age
              </Text>
              <Text variant="text/md" className="text-grey-900 font-medium">
                {patient.age ? `${patient.age} years` : 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Gender
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.gender || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Ethnicity
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.ethnicity || 'N/A'}
              </Text>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Country of Origin
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.country || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Occupation
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.occupation || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Phone Number
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.phoneNumber || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Email Address
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.email || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                National ID / Medical Record Number
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.nationalId || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Emergency Contact
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.emergencyContact || 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Address
              </Text>
              <Text variant="text/sm" className="text-grey-900 font-medium">
                {patient.address || 'N/A'}
              </Text>
            </div>
          </div>
        </div>
      </PageCard>

      <div className="flex justify-end mt-6 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/risk-assessment')}
        >
          <IconPicker icon="arrowLeft" className="mr-2" />
          Back to Patients
        </Button>
        <Button
          type="button"
          onClick={() =>
            router.push(`/dashboard/risk-assessment/patients/edit/${patientId}`)
          }
        >
          <IconPicker icon="userEdit" className="mr-2" />
          Edit Patient
        </Button>
      </div>
    </div>
  )
}
