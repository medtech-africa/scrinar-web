import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { cn } from '@/lib/utils'
import Nutrition from './nutrition'
import PhysicalActivity from './physicalActivity'
import RiskyBehavior from './riskyBehaviour'

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)
const Attitude = ({ studentId }: { studentId: string }) => {
  return (
    <Tabs.Root className="TabsRoot" defaultValue="nutrition">
      <Tabs.List className="mb-4" aria-label="Student Questionnaire">
        <Tabs.Trigger className={triggerClassName} value="nutrition">
          Nutrition
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerClassName} value="physical-activity">
          Physical Activity
        </Tabs.Trigger>
        <Tabs.Trigger className={triggerClassName} value="risky-behaviour">
          Risky Behaviour
        </Tabs.Trigger>
      </Tabs.List>

      <Tabs.Content value="nutrition">
        <Nutrition studentId={studentId} />
      </Tabs.Content>
      <Tabs.Content value="physical-activity">
        <PhysicalActivity studentId={studentId} />
      </Tabs.Content>
      <Tabs.Content value="risky-behaviour">
        <RiskyBehavior studentId={studentId} />
      </Tabs.Content>
    </Tabs.Root>
  )
}

export default Attitude
