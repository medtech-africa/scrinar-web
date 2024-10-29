import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import React from 'react'

const RiskyBehavior = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Risky Behaviour and Stress" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Effects of smoking and drinking alcohol */}
        <Select
          {...customRegister('smokingDrinkingEffects')}
          label="What are some effects of smoking and drinking alcohol?"
          options={[
            {
              value: 'Health problems and diseases',
              label: 'Health problems and diseases',
            },
            {
              value: 'It makes you look cool and fit in with friends',
              label: 'It makes you look cool and fit in with friends',
            },
            { value: 'No effect', label: 'It doesn’t have any effect' },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
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

        {/* Importance of health check-ups */}
        <Select
          {...customRegister('healthCheckupsImportance')}
          label="Why are regular health check-ups important?"
          options={[
            {
              value: 'To make sure you are healthy and catch problems early',
              label: 'To make sure you are healthy and catch problems early',
            },
            { value: 'To avoid school', label: 'To avoid school' },
            {
              value: 'It is not important if you are not sick',
              label: 'It is not important if you are not sick',
            },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
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

        {/* Causes of stress */}
        <Select
          {...customRegister('stressCauses')}
          label="Which of the following can cause stress?"
          isMulti
          options={[
            { value: 'Healthy food', label: 'Eating healthy food' },
            { value: 'Homework', label: 'Too much homework or tests' },
            { value: 'Friends', label: 'Playing with friends' },
            { value: 'Cartoons', label: 'Watching cartoons' },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOptions: any) => {
            const values = selectedOptions.map((option: any) => option.value)
            setValue('stressCauses', values)
          }}
        />

        {/* Long-term stress effects */}
        <Select
          {...customRegister('feelingsOfstress')}
          label="What can happen when you're stressed for a long time?"
          options={[
            {
              value: 'It can make you feel sick and tired',
              label: 'It can make you feel sick and tired',
            },
            { value: 'It makes you stronger', label: 'It makes you stronger' },
            {
              value: 'It helps you focus better',
              label: 'It helps you focus better',
            },
            { value: 'Other', label: 'Other' },
          ]}
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

        {/* Signs of stress */}
        <Select
          {...customRegister('stressSigns')}
          label="Which of these feelings can be a sign of stress?"
          options={[
            { value: 'Happiness', label: 'Happiness' },
            { value: 'Excitement', label: 'Excitement' },
            { value: 'Anger or sadness', label: 'Anger or sadness' },
            { value: 'Relaxation', label: 'Relaxation' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('stressSigns', value)
          }}
        />
        {watch('stressSigns') === 'Other' && (
          <Input
            {...customRegister('stressSignsSpecify')}
            label="Specify if Others (Signs of Stress)"
            placeholder="Specify if Others"
          />
        )}
      </div>
    </PageCard>
  )
}

export default RiskyBehavior
