'use client'
import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import TableLoader from '@/components/table-loader'
import {
  RiskAssessmentModel,
  useRiskAssessments,
} from '@/hooks/queries/useRiskAssessment'
import Link from 'next/link'
import { format } from 'date-fns'
import TableEmptyState from '@/components/table-empty-state'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  RAStoreType,
  useRiskAssessmentStorage,
} from '@/hooks/useRiskAssessmentStorage'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import toast from 'react-hot-toast'
import usePatients from '@/hooks/queries/usePatients'
import { useDebouncedState } from '@/hooks/useDebouncedState'
import { useRouter } from 'next/navigation'
import { IconPicker } from '@/components/ui/icon-picker'

// ... existing code ...

// Create Assessment Modal Component
const CreateAssessmentModal = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  const [assessmentType, setAssessmentType] = useState<
    'existing' | 'new' | null
  >(null)
  const [selectedPatient, setSelectedPatient] = useState<any>(null)
  const [patientSearch, setPatientSearch] = useDebouncedState('', 500)
  const router = useRouter()

  const { data: patientsData } = usePatients(1, patientSearch)
  const patients = patientsData?.data || []

  const handleCreateAssessment = () => {
    if (assessmentType === 'existing' && !selectedPatient) {
      toast.error('Please select a patient')
      return
    }

    // Close modal and reset state
    setOpen(false)
    setAssessmentType(null)
    setSelectedPatient(null)

    // Navigate to new assessment page with appropriate parameters
    if (assessmentType === 'existing') {
      // For existing patient, pass patientId but no userId
      router.push(
        `/dashboard/risk-assessment/new?patientId=${selectedPatient.id}`
      )
    } else {
      // For new patient, no parameters needed
      router.push('/dashboard/risk-assessment/new')
    }
  }

  const getPatientDisplayName = (patient: any) => {
    const names = [
      patient.firstName,
      patient.middleName,
      patient.lastName,
    ].filter(Boolean)
    return names.join(' ') || patient.nationalId || 'Unknown'
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-center">
            Create New Risk Assessment
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="text-center">
            <Text variant="text/sm" className="text-gray-600">
              Choose how you want to create this assessment
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Existing Patient Card */}
            <div
              className={cn(
                'relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md',
                assessmentType === 'existing'
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
              onClick={() => setAssessmentType('existing')}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    assessmentType === 'existing'
                      ? 'bg-blue-100'
                      : 'bg-gray-100'
                  )}
                >
                  <IconPicker
                    icon="profile2User"
                    className={cn(
                      'w-6 h-6',
                      assessmentType === 'existing'
                        ? 'text-blue-600'
                        : 'text-gray-600'
                    )}
                  />
                </div>
                <div>
                  <Text variant="text/md" className="font-semibold mb-1">
                    Existing Patient
                  </Text>
                  <Text variant="text/sm" className="text-gray-600">
                    Create assessment for a patient already in the system
                  </Text>
                </div>
                {assessmentType === 'existing' && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <IconPicker icon="check" className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* New Patient Card */}
            <div
              className={cn(
                'relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md',
                assessmentType === 'new'
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
              onClick={() => setAssessmentType('new')}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={cn(
                    'w-12 h-12 rounded-full flex items-center justify-center',
                    assessmentType === 'new' ? 'bg-green-100' : 'bg-gray-100'
                  )}
                >
                  <IconPicker
                    icon="add"
                    className={cn(
                      'w-6 h-6',
                      assessmentType === 'new'
                        ? 'text-green-600'
                        : 'text-gray-600'
                    )}
                  />
                </div>
                <div>
                  <Text variant="text/md" className="font-semibold mb-1">
                    New Patient
                  </Text>
                  <Text variant="text/sm" className="text-gray-600">
                    Create assessment for a new patient
                  </Text>
                </div>
                {assessmentType === 'new' && (
                  <div className="absolute top-3 right-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                      <IconPicker icon="check" className="w-4 h-4 text-white" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Patient Selection Section */}
          {assessmentType === 'existing' && (
            <div className="space-y-4">
              <div className="border-t pt-4">
                <Text variant="text/md" className="font-semibold mb-3">
                  Select Patient
                </Text>

                <div className="space-y-3">
                  <Input
                    placeholder="Search by name or medical ID..."
                    value={patientSearch}
                    onChange={(e) => setPatientSearch(e.target.value)}
                    leadingIcon={<IconPicker icon="search" />}
                  />

                  <div className="max-h-48 overflow-y-auto border rounded-lg bg-gray-50">
                    {patients.length > 0 ? (
                      patients.map((patient: any) => (
                        <div
                          key={patient.id}
                          className={cn(
                            'p-3 cursor-pointer transition-colors border-b last:border-b-0',
                            selectedPatient?.id === patient.id
                              ? 'bg-blue-100 border-blue-200'
                              : 'bg-white hover:bg-gray-50'
                          )}
                          onClick={() => setSelectedPatient(patient)}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <Text
                                variant="text/sm"
                                className="font-medium text-gray-900"
                              >
                                {getPatientDisplayName(patient)}
                              </Text>
                              <div className="flex items-center space-x-2 mt-1">
                                {patient.nationalId && (
                                  <Text
                                    variant="text/xs"
                                    className="text-gray-500 bg-gray-200 px-2 py-1 rounded"
                                  >
                                    ID: {patient.nationalId}
                                  </Text>
                                )}
                                {patient.gender && (
                                  <Text
                                    variant="text/xs"
                                    className="text-gray-500 bg-gray-200 px-2 py-1 rounded"
                                  >
                                    {patient.gender}
                                  </Text>
                                )}
                              </div>
                            </div>
                            {selectedPatient?.id === patient.id && (
                              <IconPicker
                                icon="check"
                                className="w-5 h-5 text-blue-600"
                              />
                            )}
                          </div>
                        </div>
                      ))
                    ) : patientSearch ? (
                      <div className="p-4 text-center text-gray-500">
                        <IconPicker
                          icon="search"
                          className="w-8 h-8 mx-auto mb-2 text-gray-400"
                        />
                        <Text variant="text/sm">No patients found</Text>
                      </div>
                    ) : (
                      <div className="p-4 text-center text-gray-500">
                        <Text variant="text/sm">
                          Start typing to search patients
                        </Text>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleCreateAssessment}
              disabled={
                !assessmentType ||
                (assessmentType === 'existing' && !selectedPatient)
              }
              className="min-w-[140px]"
            >
              Continue
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const TableBodyContent = ({
  isLoading = true,
  data = [],
}: {
  isLoading?: boolean
  data?: RiskAssessmentModel[]
}) => {
  if (isLoading) return <TableLoader row={4} />

  if (!data || data?.length === 0)
    return (
      <TableEmptyState
        row={5}
        title="You do not have a Risk Assessment data added yet."
        action={
          <CreateAssessmentModal>
            <span className="underline cursor-pointer">Click to Create</span>
          </CreateAssessmentModal>
        }
        className="py-10"
      />
    )

  return data?.map?.((riskAssessment) => (
    <TableRow
      key={riskAssessment.id}
      className="font-normal text-sm text-grey-600"
    >
      <TableCell className="capitalize">
        {riskAssessment?.user
          ? [
              riskAssessment.user?.firstName,
              riskAssessment.user?.middleName,
              riskAssessment.user?.lastName,
            ]
              .filter(Boolean)
              .join(' ') || 'N/A'
          : 'N/A'}
      </TableCell>
      <TableCell>{riskAssessment?.id}</TableCell>
      <TableCell>{riskAssessment?.status?.replace('_', ' ')}</TableCell>
      <TableCell>{format(riskAssessment?.createdAt, 'PPPp')}</TableCell>
      <TableCell>
        <Link
          href={
            riskAssessment?.status === 'in_progress'
              ? `/dashboard/risk-assessment/new?patientId=${riskAssessment?.user?.id}&assessmentId=${riskAssessment?.id}`
              : `/dashboard/risk-assessment/${riskAssessment?.id}`
          }
          className="underline"
        >
          {riskAssessment?.status === 'in_progress' ? 'Continue' : 'View'}
        </Link>
      </TableCell>
    </TableRow>
  ))
}

const DraftTableBodyContent = ({
  isLoading = true,
  data = [],
}: {
  isLoading?: boolean
  data?: RAStoreType['data']
}) => {
  if (isLoading) return <TableLoader row={4} />

  if (!data || data?.length === 0)
    return (
      <TableEmptyState
        row={5}
        title="You do not have any draft assessments."
        action={
          <CreateAssessmentModal>
            <span className="underline cursor-pointer">Click to Create</span>
          </CreateAssessmentModal>
        }
        className="py-10"
      />
    )

  return data?.map?.((riskAssessment) => (
    <TableRow
      key={riskAssessment.id}
      className="font-normal text-sm text-grey-600"
    >
      <TableCell>
        {riskAssessment?.formData?.personalInfo
          ? [
              riskAssessment.formData.personalInfo.firstName,
              riskAssessment.formData.personalInfo.middleName,
              riskAssessment.formData.personalInfo.lastName,
            ]
              .filter(Boolean)
              .join(' ') || 'N/A'
          : 'N/A'}
      </TableCell>
      <TableCell>{riskAssessment?.id}</TableCell>
      <TableCell>Draft</TableCell>
      <TableCell>
        {riskAssessment?.createdAt
          ? format(riskAssessment?.createdAt, 'PPPp')
          : '-'}
      </TableCell>
      <TableCell>
        <Link
          href={`/dashboard/risk-assessment/new?storageId=${riskAssessment?.id}`}
          className="underline"
        >
          Continue
        </Link>
      </TableCell>
    </TableRow>
  ))
}

const RiskAssessment = () => {
  const { data, isPending } = useRiskAssessments()
  const storeData = useRiskAssessmentStorage((store) => store.data)

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">AI NCD Risk Assessment</h1>
        <p>
          Non communicable Diseases (NCDs) are chronic conditions that are not
          transmitted from person to person, such as diabetes, cardiovascular
          disease, cancer, and chronic respiratory diseases.
        </p>
        <p>
          This screening page is designed for use in pharmacies and hospitals to
          assess a patient&apos;s risk of developing NCDs over a 10 year period,
          using vital signs, family history, personal lifestyle and screening
          responses to provide a comprehensive risk assessment.
        </p>
        <div className="ml-auto mt-4">
          <CreateAssessmentModal>
            <Button>Create New Risk Assessment</Button>
          </CreateAssessmentModal>
        </div>
      </div>
      <div className="">
        <Tabs defaultValue="results" className="w-full">
          <TabsList>
            <TabsTrigger value="results">Results</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
          </TabsList>
          <TabsContent value="results">
            <Table
              className={cn('table-auto my-2')}
              containerClassName="!max-h-fit"
            >
              <TableHeader className="bg-grey-100">
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead className="">Assessment ID</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Date</TableHead>
                  <TableHead className=""></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableBodyContent isLoading={isPending} data={data} />
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="draft">
            <Table
              className={cn('table-auto my-2')}
              containerClassName="!max-h-fit"
            >
              <TableHeader className="bg-grey-100">
                <TableRow>
                  <TableHead className="">Name</TableHead>
                  <TableHead className="">Assessment ID</TableHead>
                  <TableHead className="">Status</TableHead>
                  <TableHead className="">Date</TableHead>
                  <TableHead className=""></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <DraftTableBodyContent isLoading={isPending} data={storeData} />
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default RiskAssessment
