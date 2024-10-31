import React from 'react'
import { cn } from '@/lib/utils'
import * as Tabs from '@radix-ui/react-tabs'
import Knowledge from './knowledge'
import Attitude from './attitude'
import Practice from './practice'
import Dietary from '../dietary'
import { useStudentsSurvey } from '@/hooks/queries/useStudentSurvey'
const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)
const KAPSurvey = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { refetch } = useStudentsSurvey(studentId)
  return (
    <Tabs.Root className="TabsRoot" defaultValue="knowledge">
      <Tabs.List className="mb-4" aria-label="Student Questionnaire">
        <Tabs.Trigger className={triggerClassName} value="knowledge">
          Knowledge
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerClassName} value="attitude">
          Attitude
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerClassName} value="practice">
          Practices
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerClassName} value="dietary">
          24 hours Dietary
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="knowledge" onClick={() => refetch()}>
        <Knowledge studentId={studentId} studentSurvey={studentSurvey} />
      </Tabs.Content>
      <Tabs.Content value="attitude" onClick={() => refetch()}>
        <Attitude studentId={studentId} studentSurvey={studentSurvey} />
      </Tabs.Content>
      <Tabs.Content value="practice" onClick={() => refetch()}>
        <Practice studentId={studentId} studentSurvey={studentSurvey} />
      </Tabs.Content>
      <Tabs.Content value="dietary" onClick={() => refetch()}>
        <Dietary />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default KAPSurvey
