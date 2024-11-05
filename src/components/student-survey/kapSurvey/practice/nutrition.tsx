import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { everyDayOrFewTimesAWeekOptions } from '@/types/studentsSurvey.types'

const Nutrition = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Nutrition Habits" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Frequency of eating fruits and vegetables */}
        <Select
          {...customRegister('fruitsAndVegetablesFrequency')}
          value={{
            value: watch('fruitsAndVegetablesFrequency'),
            label: watch('fruitsAndVegetablesFrequency'),
          }}
          label="How often do you eat fruits and vegetables?"
          options={everyDayOrFewTimesAWeekOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('fruitsAndVegetablesFrequency', value)
          }}
        />

        {/* Frequency of consuming snacks */}
        <Select
          {...customRegister('snackConsumptionFrequency')}
          value={{
            value: watch('snackConsumptionFrequency'),
            label: watch('snackConsumptionFrequency'),
          }}
          label="How often do you consume snacks like buns, doughnuts, sausage, biscuits, etc.?"
          options={everyDayOrFewTimesAWeekOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('snackConsumptionFrequency', value)
          }}
        />

        {/* Frequency of drinking sugary beverages or eating sugary snacks */}
        <Select
          {...customRegister('sugarySnacksBeveragesFrequency')}
          value={{
            value: watch('sugarySnacksBeveragesFrequency'),
            label: watch('sugarySnacksBeveragesFrequency'),
          }}
          label="How often do you drink sugary beverages or eat sugary snacks?"
          options={everyDayOrFewTimesAWeekOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('sugarySnacksBeveragesFrequency', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default Nutrition
