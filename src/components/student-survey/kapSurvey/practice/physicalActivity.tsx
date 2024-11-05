import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { Input } from '@/components/ui/input'
import {
  everyDayOrFewTimesAWeekOptions,
  houseChoresFrequencyOptions,
  houseChoresTypesOptions,
  lessThanOneHourOptions,
  runningAndSportsOptions,
} from '@/types/studentsSurvey.types'
const PhysicalActivity = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Physical Activity" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Frequency of engaging in physical activity */}
        <Select
          {...customRegister('physicalActivityFrequency')}
          value={{
            value: watch('physicalActivityFrequency'),
            label: watch('physicalActivityFrequency'),
          }}
          label="How often do you engage in physical activity? (Playing, house chores, running errands)"
          options={everyDayOrFewTimesAWeekOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('physicalActivityFrequency', value)
          }}
        />

        {/* Duration of physical activity */}
        <Select
          {...customRegister('engagementDuration')}
          value={{
            value: watch('engagementDuration'),
            label: watch('engagementDuration'),
          }}
          label="How long do you usually engage in it for?"
          options={lessThanOneHourOptions}
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
          isClearable={false}
          value={watch('favoriteActivities')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={runningAndSportsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('favoriteActivities', value)
          }}
        />

        {/* Frequency of doing physical chores */}
        <Select
          {...customRegister('houseChoresFrequencyParticipation')}
          label="How often do you participate in house chores that require physical effort and make you sweat?"
          value={{
            value: watch('houseChoresFrequencyParticipation'),
            label: watch('houseChoresFrequencyParticipation'),
          }}
          options={houseChoresFrequencyOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('houseChoresFrequencyParticipation', value)
          }}
        />

        {/* Types of physical chores */}
        <Select
          {...customRegister('physicalChores')}
          label="What types of house chores do you regularly perform that involve physical activity and make you sweat? (Select all that apply)"
          isMulti
          isClearable={false}
          value={watch('physicalChores')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={houseChoresTypesOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('physicalChores', value)
          }}
        />

        {/* Frequency of performing physical activities outside chores */}
        <Select
          {...customRegister('outdoorActivitiesFrequency')}
          label="How often do you perform physical activities outside of house chores, such as playing sports or games?"
          options={houseChoresFrequencyOptions}
          value={{
            value: watch('outdoorActivitiesFrequency'),
            label: watch('outdoorActivitiesFrequency'),
          }}
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
