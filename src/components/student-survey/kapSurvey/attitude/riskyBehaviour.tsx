import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  alcoholRisksOptions,
  importanceOfMentalHealthOptions,
  smokingRisksOptions,
  thoughtsOnSubstancesOptions,
} from '@/types/studentsSurvey.types'
const RiskyBehavior = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Risky Behaviour and Stress" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Risks associated with smoking */}
        <Select
          {...customRegister('smokingRisks')}
          label="What are some risks associated with smoking? (Select all that apply)"
          isMulti
          isClearable={false}
          value={watch('smokingRisks')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={smokingRisksOptions}
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
          isClearable={false}
          value={watch('alcoholRisks')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={alcoholRisksOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('alcoholRisks', value)
          }}
        />

        {/* Thoughts on smoking and drinking alcohol */}
        <Select
          {...customRegister('thoughtsOnSubstances')}
          label="What do you think about smoking and drinking alcohol?"
          options={thoughtsOnSubstancesOptions}
          value={{
            value: watch('thoughtsOnSubstances'),
            label: watch('thoughtsOnSubstances'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('thoughtsOnSubstances', value)
          }}
        />

        {/* Importance of mental health */}
        <Select
          {...customRegister('importanceOfMentalHealth')}
          label="How important do you think it is to take care of your mental health?"
          options={importanceOfMentalHealthOptions}
          value={{
            value: watch('importanceOfMentalHealth'),
            label: watch('importanceOfMentalHealth'),
          }}
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
