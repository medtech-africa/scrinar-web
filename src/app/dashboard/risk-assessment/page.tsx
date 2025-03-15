'use client'
import React from 'react'
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

const NEW_ASSESSMENT_URL = '/dashboard/risk-assessment/new'

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
          <Link href={NEW_ASSESSMENT_URL} className="underline">
            Click to Create
          </Link>
        }
        className="py-10"
      />
    )

  return data?.map?.((riskAssessment) => (
    <TableRow
      key={riskAssessment.id}
      className="font-normal text-sm text-grey-600"
    >
      <TableCell>{riskAssessment?.id}</TableCell>
      <TableCell>{riskAssessment?.responseData?.cvd?.who?.score}</TableCell>
      <TableCell>{riskAssessment?.responseData?.cvd?.who?.riskLevel}</TableCell>
      <TableCell>{format(riskAssessment?.createdAt, 'PPP')}</TableCell>
      <TableCell>
        <Link
          href={`/dashboard/risk-assessment/${riskAssessment?.id}`}
          className="underline"
        >
          view
        </Link>
      </TableCell>
    </TableRow>
  ))
}

const RiskAssessment = () => {
  const { data, isPending } = useRiskAssessments()
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
          assess a patient’s risk of developing NCDs over a 10 year period,
          using vital signs, family history, personal lifestyle and screening
          responses to provide a comprehensive risk assessment.
        </p>
        <div className="ml-auto mt-4">
          <Link href={NEW_ASSESSMENT_URL} passHref>
            <Button>Create New Risk Assessment</Button>
          </Link>
        </div>
      </div>
      <div className="">
        <Table
          className={cn('table-auto my-2')}
          containerClassName="!max-h-fit"
        >
          <TableHeader className="bg-grey-100">
            <TableRow>
              <TableHead className="">ID</TableHead>
              <TableHead className="">NCD Score</TableHead>
              <TableHead className="">Risk Level</TableHead>
              <TableHead className="">Date</TableHead>
              <TableHead className=""></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableBodyContent isLoading={isPending} data={data} />
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

export default RiskAssessment
