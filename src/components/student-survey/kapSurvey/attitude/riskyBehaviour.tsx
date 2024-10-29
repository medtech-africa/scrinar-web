import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
const RiskyBehavior = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue } = useCustomRegister(studentId)

  return (
    <PageCard title="Risky Behaviour and Stress" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Risks associated with smoking */}
        <Select
          {...customRegister('smokingRisks')}
          label="What are some risks associated with smoking? (Select all that apply)"
          isMulti
          options={[
            { value: 'It can make you sick', label: 'It can make you sick' },
            { value: 'It can help you relax', label: 'It can help you relax' },
            {
              value: 'It makes you more social',
              label: 'It makes you more social',
            },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('smokingRisks', value)
          }}
        />

        {/* Risks associated with drinking alcohol */}
        <Select
          {...customRegister('alcoholRisks')}
          label="What are some risks associated with drinking alcohol? (Select all that apply)"
          isMulti
          options={[
            {
              value: 'It can make you feel sick and dizzy',
              label: 'It can make you feel sick and dizzy',
            },
            {
              value: 'It makes you feel good',
              label: 'It makes you feel good',
            },
            {
              value: 'It helps you fit in with friends',
              label: 'It helps you fit in with friends',
            },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('alcoholRisks', value)
          }}
        />

        {/* Thoughts on smoking and drinking alcohol */}
        <Select
          {...customRegister('thoughtsOnSubstances')}
          label="What do you think about smoking and drinking alcohol?"
          options={[
            {
              value: 'They are harmful and should be avoided',
              label: 'They are harmful and should be avoided',
            },
            {
              value: 'They are harmful and should be avoided',
              label: 'They are harmful and should be avoided',
            },
            { value: 'They are not harmful', label: 'They are not harmful' },
            { value: "I don't know", label: 'I don’t know' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('thoughtsOnSubstances', value)
          }}
        />

        {/* Importance of mental health */}
        <Select
          {...customRegister('importanceOfMentalHealth')}
          label="How important do you think it is to take care of your mental health?"
          options={[
            { value: 'Very important', label: 'Very important' },
            { value: 'Somewhat important', label: 'Somewhat important' },
            { value: 'Not very important', label: 'Not very important' },
            { value: 'Not important at all', label: 'Not important at all' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('importanceOfMentalHealth', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default RiskyBehavior
