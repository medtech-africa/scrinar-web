import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
const RiskyBehavior = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue } = useCustomRegister(studentId)

  return (
    <PageCard title="Health and Well-being" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Doctor visit frequency */}
        <Select
          {...customRegister('doctorVisitFrequency')}
          label="How often do you visit the doctor for health check-ups?"
          options={[
            {
              value: 'Regularly (e.g., once a year)',
              label: 'Regularly (e.g., once a year)',
            },
            {
              value: 'Occasionally (e.g., when sick)',
              label: 'Occasionally (e.g., when sick)',
            },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('doctorVisitFrequency', value)
          }}
        />

        {/* Coping mechanisms */}
        <Select
          {...customRegister('makesFeelBetter')}
          label="When you feel worried or upset, what helps you feel better? (Choose all that you do)"
          isMulti
          options={[
            {
              value: 'Talk to a family member or friend',
              label: 'Talk to a family member or friend',
            },
            {
              value: 'Do something I enjoy, like drawing or playing games',
              label: 'Do something I enjoy, like drawing or playing games',
            },
            {
              value: 'Play sports or run around',
              label: 'Play sports or run around',
            },
            {
              value: 'Listen to my favorite music',
              label: 'Listen to my favorite music',
            },
            { value: 'Spend some time alone', label: 'Spend some time alone' },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('copingMechanisms', value)
          }}
        />

        {/* Stressors */}
        <Select
          {...customRegister('stressors')}
          label="What things make you feel stressed? (Choose all that apply)"
          isMulti
          options={[
            { value: 'Schoolwork or tests', label: 'Schoolwork or tests' },
            { value: 'Problems at home', label: 'Problems at home' },
            { value: 'Issues with friends', label: 'Issues with friends' },
            {
              value: 'Chores or helping at home',
              label: 'Chores or helping at home',
            },
            {
              value: 'Not having enough free time',
              label: 'Not having enough free time',
            },
            { value: 'Health problems', label: 'Health problems' },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('stressors', value)
          }}
        />

        {/* Smoking history */}
        <Select
          {...customRegister('everSmoked')}
          label="Have you smoked in any form before?"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('everSmoked', value)
          }}
        />

        {/* Current smoking status */}
        <Select
          {...customRegister('currentSmoking')}
          label="Do you currently smoke?"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('currentSmoking', value)
          }}
        />

        {/* Alcohol history */}
        <Select
          {...customRegister('everTakenAlcohol')}
          label="Have you ever taken alcohol before?"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('everTakenAlcohol', value)
          }}
        />

        {/* Current alcohol use */}
        <Select
          {...customRegister('currentAlcohol')}
          label="Do you currently take alcohol?"
          options={[
            { value: 'Yes', label: 'Yes' },
            { value: 'No', label: 'No' },
          ]}
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
