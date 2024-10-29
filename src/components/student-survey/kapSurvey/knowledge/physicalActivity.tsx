import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import React from 'react'

const PhysicalActivity = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue } = useCustomRegister(studentId)

  return (
    <PageCard title="Physical Activity" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Select
          {...customRegister('fruitsVegetables')}
          label="How often do you eat fruits and vegetables?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('fruitsVegetables', value)
          }}
        />

        {/* Snacks Consumption */}
        <Select
          {...customRegister('snacksConsumption')}
          label="How often do you consume snacks like buns, doughnut, etc.?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('snacksConsumption', value)
          }}
        />

        {/* Sugary Beverages */}
        <Select
          {...customRegister('sugaryBeverages')}
          label="How often do you drink sugary beverages or eat sugary snacks?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('sugaryBeverages', value)
          }}
        />

        {/* Duration of Physical Activity */}
        <Select
          {...customRegister('physicalActivityDuration')}
          label="How long do you usually engage in physical activity?"
          options={[
            { value: 'Less than 30 minutes', label: 'Less than 30 minutes' },
            { value: '30 minutes to 1 hour', label: '30 minutes to 1 hour' },
            { value: 'More than 1 hour', label: 'More than 1 hour' },
            { value: 'Not applicable', label: 'Not applicable' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('physicalActivityDuration', value)
          }}
        />

        {/* Types of Physical Activity */}
        <Select
          {...customRegister('physicalActivityTypes')}
          label="What types of physical activity and games do you enjoy?"
          isMulti
          options={[
            { value: 'Running', label: 'Running' },
            { value: 'Playing sports', label: 'Playing sports' },
            { value: 'Skipping', label: 'Skipping' },
            { value: 'Dancing', label: 'Dancing' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('physicalActivityTypes', value)
          }}
        />

        {/* House Chores Frequency */}
        <Select
          {...customRegister('houseChoresFrequency')}
          label="How often do you participate in house chores that require physical effort?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'Several times a week', label: 'Several times a week' },
            { value: 'Once a week', label: 'Once a week' },
            { value: 'Less than once a week', label: 'Less than once a week' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('houseChoresFrequency', value)
          }}
        />

        {/* Types of House Chores */}
        <Select
          {...customRegister('houseChoresTypes')}
          label="What types of house chores do you regularly perform that involve physical activity?"
          isMulti
          options={[
            { value: 'Fetching water', label: 'Fetching water' },
            { value: 'Cooking', label: 'Cooking and preparing meals' },
            { value: 'Cleaning', label: 'Cleaning the house' },
            { value: 'Gardening', label: 'Gardening or farming' },
            { value: 'Carrying heavy items', label: 'Carrying heavy items' },
            {
              value: 'Caring for siblings',
              label: 'Caring for younger siblings',
            },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('houseChoresTypes', value)
          }}
        />

        {/* Outside Physical Activities Frequency */}
        <Select
          {...customRegister('outsidePhysicalActivitiesFrequency')}
          label="How often do you perform physical activities outside of house chores?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'Several times a week', label: 'Several times a week' },
            { value: 'Once a week', label: 'Once a week' },
            { value: 'Less than once a week', label: 'Less than once a week' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('outsidePhysicalActivitiesFrequency', value)
          }}
        />

        {/* Daily Hours of Mobile Games */}
        <Input
          {...customRegister('mobileGamesHours')}
          label="Average hours spent with mobile games, computer/internet daily"
          placeholder="Hours"
          type="number"
        />

        {/* Daily Hours of TV */}
        <Input
          {...customRegister('tvGamesHours')}
          label="Average hours spent watching TV/Playing video games daily"
          placeholder="Hours"
          type="number"
        />

        {/* Bedtime */}
        <Input
          {...customRegister('bedtime')}
          label="When do you go to bed at night?"
          placeholder="e.g., 10:00 PM"
        />

        {/* Wake-up Time */}
        <Input
          {...customRegister('wakeupTime')}
          label="When do you wake up in the morning?"
          placeholder="e.g., 7:00 AM"
        />

        {/* Doctor Visits Frequency */}
        <Select
          {...customRegister('doctorVisitsFrequency')}
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
            setValue('doctorVisitsFrequency', value)
          }}
        />

        {/* Coping Mechanisms */}
        <Select
          {...customRegister('copingMechanisms')}
          label="When you feel worried or upset, what helps you feel better?"
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
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('copingMechanisms', value)
          }}
        />

        {/* Stress Factors */}
        <Select
          {...customRegister('stressFactors')}
          label="What things make you feel stressed?"
          isMulti
          options={[
            { value: 'Schoolwork', label: 'Schoolwork or tests' },
            { value: 'Home problems', label: 'Home problems' },
            { value: 'Family issues', label: 'Family issues' },
            { value: 'Friendship issues', label: 'Friendship issues' },
            { value: 'Health concerns', label: 'Health concerns' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('stressFactors', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default PhysicalActivity
