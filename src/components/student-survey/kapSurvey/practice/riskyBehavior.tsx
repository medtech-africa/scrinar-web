import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  YesorNoOptionsOther,
  doctorVisitFrequencyOptions,
  makesFeelBetterOptionsOptions,
  stressorsOptions,
} from '@/types/studentsSurvey.types'
const RiskyBehavior = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Risky Behaviour and Stress" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Doctor visit frequency */}
        <Select
          {...customRegister('doctorVisitFrequency')}
          label="How often do you visit the doctor for health check-ups?"
          options={doctorVisitFrequencyOptions}
          value={{
            value: watch('doctorVisitFrequency'),
            label: watch('doctorVisitFrequency'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('doctorVisitFrequency', value)
          }}
        />

        {/* What makes you feel better */}
        <Select
          {...customRegister('makesFeelBetter')}
          label="When you feel worried or upset, what helps you feel better? (Choose all that you do)"
          isMulti
          isClearable={false}
          value={watch('makesFeelBetter')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={makesFeelBetterOptionsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('makesFeelBetter', value)
          }}
        />

        {/* Stressors */}
        <Select
          {...customRegister('stressors')}
          label="What things make you feel stressed? (Choose all that apply)"
          isMulti
          isClearable={false}
          value={watch('stressors')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={stressorsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('stressors', value)
          }}
        />

        {/* Smoking history */}
        <Select
          {...customRegister('everSmoked')}
          label="Have you smoked in any form before?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('everSmoked'),
            label: watch('everSmoked'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('everSmoked', value)
          }}
        />

        {/* Current smoking status */}
        <Select
          {...customRegister('currentSmoking')}
          label="Do you currently smoke?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('currentSmoking'),
            label: watch('currentSmoking'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('currentSmoking', value)
          }}
        />

        {/* Alcohol history */}
        <Select
          {...customRegister('everTakenAlcohol')}
          label="Have you ever taken alcohol before?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('everTakenAlcohol'),
            label: watch('everTakenAlcohol'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('everTakenAlcohol', value)
          }}
        />

        {/* Current alcohol use */}
        <Select
          {...customRegister('currentAlcohol')}
          label="Do you currently take alcohol?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('currentAlcohol'),
            label: watch('currentAlcohol'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('currentAlcohol', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default RiskyBehavior
