import React from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { Control, FieldErrors, UseFormWatch } from 'react-hook-form'
import { PageCard } from '@/components/ui/page-card'
import { ParentFormData } from '@/types/questionnaire.types'
import KnowledgeSection from './knowledge'
import { AttitudesSection } from './attitudes'
import { PracticesSection } from './practices'
import { DietSection } from './diet'
import { HealthHabitSection } from './health-habit'
import { PhysicalActivitySection } from './physical-activity'
import { HealthHistorySection } from './health-history'
import { cn } from '@/lib/utils'

interface Props {
  control: Control<ParentFormData, any, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

const triggerClassName = cn(
  'text-sm text-grey-700 py-2.2 px-4 transition-all cursor-pointer',
  'data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:font-bold data-[state=active]:text-grey-900'
)
const KAPSurvey = ({ control, errors, watch }: Props) => {
  return (
    <PageCard title="Section B: Knowledge Assessment" bodyStyle="p-4">
      <Tabs.Root className="TabsRoot" defaultValue="knowledge">
        <Tabs.List className="TabsList" aria-label="Knowledge Assessment">
          <Tabs.Trigger className={triggerClassName} value="knowledge">
            Knowledge
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerClassName} value="attitudes">
            Attitudes
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerClassName} value="practices">
            Practices
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerClassName} value="health-habits">
            Health Habits
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerClassName} value="diet">
            Diet
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerClassName} value="physical-activity">
            Physical Activity
          </Tabs.Trigger>
          <Tabs.Trigger className={triggerClassName} value="health-history">
            Health History
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="knowledge">
          <KnowledgeSection watch={watch} control={control} errors={errors} />
        </Tabs.Content>
        <Tabs.Content value="attitudes">
          <AttitudesSection watch={watch} control={control} errors={errors} />
        </Tabs.Content>
        <Tabs.Content value="Practices">
          <PracticesSection watch={watch} control={control} errors={errors} />
        </Tabs.Content>
        <Tabs.Content value="health-habits">
          <HealthHabitSection watch={watch} control={control} errors={errors} />
        </Tabs.Content>
        <Tabs.Content value="diet">
          <DietSection watch={watch} control={control} errors={errors} />
        </Tabs.Content>
        <Tabs.Content value="physical-activity">
          <PhysicalActivitySection
            watch={watch}
            control={control}
            errors={errors}
          />
        </Tabs.Content>
        <Tabs.Content value="health-history">
          <HealthHistorySection
            watch={watch}
            control={control}
            errors={errors}
          />
        </Tabs.Content>
      </Tabs.Root>
    </PageCard>
  )
}

export default KAPSurvey
