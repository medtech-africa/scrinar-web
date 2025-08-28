'use client'
import { Button } from '@/components/ui/button'
import { PageCard } from '@/components/ui/page-card'
import { Text } from '@/components/ui/text'
import { usePatient } from '@/hooks/queries/usePatients'
import { useUserRiskAssessments } from '@/hooks/queries/useRiskAssessment'
import ContentLoader from '@/components/content-loader'
import { useRouter } from 'next/navigation'
import { IconPicker } from '@/components/ui/icon-picker'
import calculateAge from '@/utils/calculateAge'
import { format } from 'date-fns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { BadgeField } from '@/components/ui/badge'

export const ViewPatientContent = ({ patientId }: { patientId: string }) => {
  const router = useRouter()
  const { data: patient, isPending: isLoading } = usePatient(patientId)
  const { data, isPending: isLoadingRiskAssessments } =
    useUserRiskAssessments(patientId)
  const riskAssessments = data?.data

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
                {patient.dateOfBirth
                  ? `${calculateAge(patient.dateOfBirth)} years`
                  : 'N/A'}
              </Text>
            </div>

            <div>
              <Text variant="text/sm" className="text-grey-600 mb-1">
                Date of Birth
              </Text>
              <Text variant="text/md" className="text-grey-900 font-medium">
                {patient.dateOfBirth
                  ? new Date(patient.dateOfBirth).toLocaleDateString()
                  : 'N/A'}
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

      {/* Risk Assessments Section */}
      <PageCard title="Risk Assessments" bodyStyle="py-0 px-6" className="mt-6">
        {isLoadingRiskAssessments ? (
          <div className="flex justify-center py-8">
            <Text variant="text/sm" className="text-grey-600">
              Loading risk assessments...
            </Text>
          </div>
        ) : riskAssessments && riskAssessments.length > 0 ? (
          <div className="space-y-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Assessment Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskAssessments.map((assessment: any) => (
                  <TableRow key={assessment.id}>
                    <TableCell>
                      <div className=" max-w-[200px] flex">
                        <Text variant="text/sm" className="uppercase text-wrap">
                          {assessment?.ncdType
                            ?.replaceAll('Cancer', '')
                            ?.replaceAll(',', ', ') || 'N/A'}
                        </Text>
                      </div>
                    </TableCell>
                    <TableCell>
                      <BadgeField
                        variant={
                          assessment.status === 'completed'
                            ? 'success'
                            : assessment.status === 'in_progress'
                              ? 'pending'
                              : 'warning'
                        }
                      >
                        {assessment.status}
                      </BadgeField>
                    </TableCell>
                    <TableCell>
                      <Text variant="text/sm" className="text-grey-600">
                        {assessment.createdAt
                          ? format(
                              new Date(assessment.createdAt),
                              'MMM dd, yyyy'
                            )
                          : 'N/A'}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text variant="text/sm" className="text-grey-600">
                        {assessment.updatedAt
                          ? format(
                              new Date(assessment.updatedAt),
                              'MMM dd, yyyy'
                            )
                          : 'N/A'}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          router.push(
                            assessment?.status === 'in_progress'
                              ? `/dashboard/risk-assessment/new?patientId=${assessment?.user?.id}&assessmentId=${assessment?.id}`
                              : `/dashboard/risk-assessment/${assessment?.id}`
                          )
                        }
                      >
                        {assessment?.status === 'in_progress'
                          ? 'Continue Assessment'
                          : 'View Details'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8">
            <Text variant="text/sm" className="text-grey-600 mb-4">
              No risk assessments found for this patient
            </Text>
            <Button
              variant="outline"
              onClick={() =>
                router.push(
                  `/dashboard/risk-assessment/new?patientId=${patientId}`
                )
              }
            >
              Create New Assessment
            </Button>
          </div>
        )}
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
          variant="outline"
          onClick={() =>
            router.push(`/dashboard/risk-assessment/new?patientId=${patientId}`)
          }
        >
          <IconPicker icon="add" className="mr-2" />
          Create New Assessment
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
