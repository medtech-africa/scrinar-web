import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  copingMechanismsOptions,
  doctorVisitsFrequencyOptions,
  everyDayOrFewTimesAWeekOptions,
  houseChoresTypesOptions,
  lessThanOneHourOptions,
  outsidePhysicalActivitiesFrequencyOptions,
  runningAndSportsOptions,
  stressFactorsOptions,
} from '@/types/studentsSurvey.types'
import React from 'react'

const PhysicalActivity = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Physical Activity" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Select
          {...customRegister('fruitsVegetables')}
          label="How often do you eat fruits and vegetables?"
          options={everyDayOrFewTimesAWeekOptions}
          value={{
            value: watch('fruitsVegetables'),
            label: watch('fruitsVegetables'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('fruitsVegetables', value)
          }}
        />

        {/* Snacks Consumption */}
        <Select
          {...customRegister('snacksConsumption')}
          label="How often do you consume snacks like buns, doughnut, etc.?"
          value={{
            value: watch('snacksConsumption'),
            label: watch('snacksConsumption'),
          }}
          options={everyDayOrFewTimesAWeekOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('snacksConsumption', value)
          }}
        />

        {/* Sugary Beverages */}
        <Select
          {...customRegister('sugaryBeverages')}
          label="How often do you drink sugary beverages or eat sugary snacks?"
          value={{
            value: watch('sugaryBeverages'),
            label: watch('sugaryBeverages'),
          }}
          options={everyDayOrFewTimesAWeekOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('sugaryBeverages', value)
          }}
        />

        {/* Duration of Physical Activity */}
        <Select
          {...customRegister('physicalActivityDuration')}
          label="How long do you usually engage in physical activity?"
          value={{
            value: watch('physicalActivityDuration'),
            label: watch('physicalActivityDuration'),
          }}
          options={lessThanOneHourOptions}
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
          value={watch('physicalActivityTypes')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={runningAndSportsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('physicalActivityTypes', value)
          }}
        />

        {/* House Chores Frequency */}
        <Select
          {...customRegister('houseChoresFrequency')}
          label="How often do you participate in house chores that require physical effort?"
          value={{
            value: watch('houseChoresFrequency'),
            label: watch('houseChoresFrequency'),
          }}
          options={everyDayOrFewTimesAWeekOptions}
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
          value={watch('houseChoresTypes')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={houseChoresTypesOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('houseChoresTypes', value)
          }}
        />

        {/* Outside Physical Activities Frequency */}
        <Select
          {...customRegister('outsidePhysicalActivitiesFrequency')}
          label="How often do you perform physical activities outside of house chores?"
          options={outsidePhysicalActivitiesFrequencyOptions}
          value={{
            value: watch('outsidePhysicalActivitiesFrequency'),
            label: watch('outsidePhysicalActivitiesFrequency'),
          }}
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
          options={doctorVisitsFrequencyOptions}
          value={{
            value: watch('doctorVisitsFrequency'),
            label: watch('doctorVisitsFrequency'),
          }}
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
          value={watch('copingMechanisms')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={copingMechanismsOptions}
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
          value={watch('stressFactors')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={stressFactorsOptions}
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
