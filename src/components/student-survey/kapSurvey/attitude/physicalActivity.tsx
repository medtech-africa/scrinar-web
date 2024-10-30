import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  YesorNoOptionsOther,
  barriersToPhysicalActivityOptions,
  importanceOfPhysicalActivityOptions,
  regularPhysicalActivityOptions,
  timeForPhysicalActivitiesOptions,
} from '@/types/studentsSurvey.types'
import React from 'react'

const PhysicalActivity = ({ studentId }: { studentId: string }) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Physical Activity" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Regular physical activity */}
        <Select
          {...customRegister('regularPhysicalActivity')}
          label="How do you feel about regular physical activity?"
          options={regularPhysicalActivityOptions}
          value={{
            value: watch('regularPhysicalActivity'),
            label: watch('regularPhysicalActivity'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('regularPhysicalActivity', value)
          }}
        />
        {/* Barriers to physical activity */}
        <Select
          {...customRegister('barriersToPhysicalActivity')}
          label="What do you think can prevent children from being physically active? (Select all that apply)"
          isMulti
          isCreatable
          value={watch('barriersToPhysicalActivity')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={barriersToPhysicalActivityOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('barriersToPhysicalActivity', value)
          }}
        />
        {/* Importance of physical activity for boys and girls */}
        <Select
          {...customRegister('importanceOfPhysicalActivity')}
          label="Is it important for both boys and girls to be physically active?"
          options={importanceOfPhysicalActivityOptions}
          value={{
            value: watch('importanceOfPhysicalActivity'),
            label: watch('importanceOfPhysicalActivity'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('importanceOfPhysicalActivity', value)
          }}
        />
        {/* Suitable activities for boys */}
        <Input
          {...customRegister('suitableActivitiesBoys')}
          label="Which types of physical activities do you think are most suitable for boys?"
          placeholder="Specify activities"
        />
        {/* Suitable activities for girls */}
        <Input
          {...customRegister('suitableActivitiesGirls')}
          label="Which types of physical activities do you think are most suitable for girls?"
          placeholder="Specify activities"
        />

        {/* Importance of physical activity for boys and girls */}
        <Select
          {...customRegister('sameTypesOfSportsAndActivities')}
          label="Should boys and girls do the same types of sports and activities?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('sameTypesOfSportsAndActivities'),
            label: watch('sameTypesOfSportsAndActivities'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('sameTypesOfSportsAndActivities', value)
          }}
        />

        <Select
          {...customRegister('timeForPhysicalActivities')}
          label="Do you think that girls in your community have more or less time for physical activities outside of house chores compared to boys?"
          options={timeForPhysicalActivitiesOptions}
          value={{
            value: watch('timeForPhysicalActivities'),
            label: watch('timeForPhysicalActivities'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('timeForPhysicalActivities', value)
          }}
        />
        <Select
          {...customRegister('moreOpportunitiesOutsideHouseChores')}
          value={{
            value: watch('moreOpportunitiesOutsideHouseChores'),
            label: watch('moreOpportunitiesOutsideHouseChores'),
          }}
          label="Would you like to have more opportunities for physical activities outside of house chores?"
          options={YesorNoOptionsOther}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('moreOpportunitiesOutsideHouseChores', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default PhysicalActivity
