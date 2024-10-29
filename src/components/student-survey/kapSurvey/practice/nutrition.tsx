import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'

const Nutrition = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue } = useCustomRegister(studentId)

  return (
    <PageCard title="Nutrition Habits" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Frequency of eating fruits and vegetables */}
        <Select
          {...customRegister('fruitsAndVegetablesFrequency')}
          label="How often do you eat fruits and vegetables?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('fruitsAndVegetablesFrequency', value)
          }}
        />

        {/* Frequency of consuming snacks */}
        <Select
          {...customRegister('snackConsumptionFrequency')}
          label="How often do you consume snacks like buns, doughnuts, sausage, biscuits, etc.?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('snackConsumptionFrequency', value)
          }}
        />

        {/* Frequency of drinking sugary beverages or eating sugary snacks */}
        <Select
          {...customRegister('sugarySnacksBeveragesFrequency')}
          label="How often do you drink sugary beverages or eat sugary snacks?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
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
