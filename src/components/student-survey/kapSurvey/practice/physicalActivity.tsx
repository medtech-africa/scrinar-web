import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { Input } from '@/components/ui/input'
const PhysicalActivity = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue } = useCustomRegister(studentId)

  return (
    <PageCard title="Physical Activity" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Frequency of engaging in physical activity */}
        <Select
          {...customRegister('physicalActivityFrequency')}
          label="How often do you engage in physical activity? (Playing, house chores, running errands)"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'A few times a week', label: 'A few times a week' },
            { value: 'Rarely', label: 'Rarely' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('physicalActivityFrequency', value)
          }}
        />

        {/* Duration of physical activity */}
        <Select
          {...customRegister('engagementDuration')}
          label="How long do you usually engage in it for?"
          options={[
            { value: 'Less than 30 minutes', label: 'Less than 30 minutes' },
            { value: '30 minutes to 1 hour', label: '30 minutes to 1 hour' },
            { value: 'More than 1 hour', label: 'More than 1 hour' },
            { value: 'Not applicable', label: 'Not applicable' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('engagementDuration', value)
          }}
        />

        {/* Types of physical activity */}
        <Select
          {...customRegister('favoriteActivities')}
          label="What types of physical activity and games do you enjoy? (Select all that apply)"
          isMulti
          options={[
            { value: 'Running', label: 'Running' },
            { value: 'Playing sports', label: 'Playing sports' },
            { value: 'Skipping', label: 'Skipping' },
            { value: 'Dancing', label: 'Dancing' },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('favoriteActivities', value)
          }}
        />

        {/* Frequency of doing physical chores */}
        <Select
          {...customRegister('houseChoresFrequencyParticipation')}
          label="How often do you participate in house chores that require physical effort and make you sweat?"
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

        {/* Types of physical chores */}
        <Select
          {...customRegister('physicalChores')}
          label="What types of house chores do you regularly perform that involve physical activity and make you sweat? (Select all that apply)"
          isMulti
          options={[
            { value: 'Fetching water', label: 'Fetching water' },
            {
              value: 'Cooking and preparing meals',
              label: 'Cooking and preparing meals',
            },
            { value: 'Cleaning the house', label: 'Cleaning the house' },
            { value: 'Gardening or farming', label: 'Gardening or farming' },
            {
              value: 'Carrying heavy items (e.g., firewood, water)',
              label: 'Carrying heavy items (e.g., firewood, water)',
            },
            {
              value: 'Caring for younger siblings',
              label: 'Caring for younger siblings',
            },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('physicalChores', value)
          }}
        />

        {/* Frequency of performing physical activities outside chores */}
        <Select
          {...customRegister('outdoorActivitiesFrequency')}
          label="How often do you perform physical activities outside of house chores, such as playing sports or games?"
          options={[
            { value: 'Every day', label: 'Every day' },
            { value: 'Several times a week', label: 'Several times a week' },
            { value: 'Once a week', label: 'Once a week' },
            { value: 'Less than once a week', label: 'Less than once a week' },
            { value: 'Never', label: 'Never' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('outdoorActivitiesFrequency', value)
          }}
        />

        {/* Average hours spent on mobile games */}
        <Input
          {...customRegister('averageMobileGames')}
          label="Average hours spent with mobile games, computer/internet daily"
          placeholder="Enter hours"
        />

        {/* Average hours spent watching TV */}
        <Input
          {...customRegister('averageTVHours')}
          label="Average hours spent watching TV/Playing video games daily"
          placeholder="Enter hours"
        />

        {/* Bedtime input */}
        <Input
          {...customRegister('bedtimeAtNight')}
          label="When do you go to bed at night?"
          placeholder="Enter time (e.g., 10 PM)"
        />

        {/* Wake-up time input */}
        <Input
          {...customRegister('wakeUpTime')}
          label="When do you wake up in the morning?"
          placeholder="Enter time (e.g., 6 AM)"
        />
      </div>
    </PageCard>
  )
}

export default PhysicalActivity
