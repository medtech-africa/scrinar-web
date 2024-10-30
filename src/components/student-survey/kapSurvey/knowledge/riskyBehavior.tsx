import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  feelingsOfstressOptions,
  healthCheckupsImportanceOptions,
  smokingDrinkingEffectsOptions,
  stressCausesOptions,
  stressSignsOptions,
} from '@/types/studentsSurvey.types'
import React from 'react'

const RiskyBehavior = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Risky Behaviour and Stress" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Effects of smoking and drinking alcohol */}
        <PageCard
          title="Effects of Smoking and Drinking Alcohol (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('smokingDrinkingEffects')}
            value={{
              value: watch('smokingDrinkingEffects'),
              label: watch('smokingDrinkingEffects'),
            }}
            label="What are some effects of smoking and drinking alcohol?"
            options={smokingDrinkingEffectsOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('smokingDrinkingEffects', value)
            }}
          />
          {watch('smokingDrinkingEffects') === 'Other' && (
            <Input
              {...customRegister('smokingDrinkingEffectsOther')}
              label="Specify if Others (Smoking/Drinking Effects)"
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        {/* Importance of health check-ups */}
        <PageCard
          title="Health Check-ups Importance (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('healthCheckupsImportance')}
            label="Why are regular health check-ups important?"
            options={healthCheckupsImportanceOptions}
            value={{
              value: watch('healthCheckupsImportance'),
              label: watch('healthCheckupsImportance'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('healthCheckupsImportance', value)
            }}
          />
          {watch('healthCheckupsImportance') === 'Other' && (
            <Input
              {...customRegister('healthCheckupsImportanceOther')}
              label="Specify if Others (Health Check-ups Importance)"
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        {/* Causes of stress */}
        <Select
          {...customRegister('stressCauses')}
          label="Which of the following can cause stress?"
          isMulti
          value={watch('stressCauses')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={stressCausesOptions}
          onChange={(selectedOptions: any) => {
            const values = selectedOptions.map((option: any) => option.value)
            setValue('stressCauses', values)
          }}
        />

        {/* Long-term stress effects */}
        <PageCard
          title="Long-term Stress Effects (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('feelingsOfstress')}
            label="What can happen when you're stressed for a long time?"
            options={feelingsOfstressOptions}
            value={{
              value: watch('feelingsOfstress'),
              label: watch('feelingsOfstress'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('feelingsOfstress', value)
            }}
          />
          {watch('feelingsOfstress') === 'Other' && (
            <Input
              {...customRegister('feelingsOfstressOther')}
              label="Specify if Others (Feelings of Stress)"
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        {/* Signs of stress */}
        <PageCard
          title="Signs of Stress (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('stressSigns')}
            label="Which of these feelings can be a sign of stress?"
            options={stressSignsOptions}
            value={{
              value: watch('stressSigns'),
              label: watch('stressSigns'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('stressSigns', value)
            }}
          />
          {watch('stressSigns') === 'Other' && (
            <Input
              {...customRegister('stressSignsOther')}
              label="Specify if Others (Signs of Stress)"
              placeholder="Specify if Others"
            />
          )}
        </PageCard>
      </div>
    </PageCard>
  )
}

export default RiskyBehavior
