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
        {/* Regular physical activity */}
        <Select
          {...customRegister('regularPhysicalActivity')}
          label="How do you feel about regular physical activity?"
          options={[
            { value: 'I enjoy it', label: 'I enjoy it' },
            { value: "I don't mind it", label: "I don't mind it" },
            { value: 'I find it difficult', label: 'I find it difficult' },
            { value: "I don't like it", label: "I don't like it" },
          ]}
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
          options={[
            {
              value: 'Lack of time due to schoolwork or other responsibilities',
              label: 'Lack of time due to schoolwork or other responsibilities',
            },
            {
              value: 'Lack of access to sports facilities or equipment',
              label: 'Lack of access to sports facilities or equipment',
            },
            {
              value: 'Feeling self-conscious or embarrassed',
              label: 'Feeling self-conscious or embarrassed',
            },
            {
              value: 'Lack of encouragement from family or friends',
              label: 'Lack of encouragement from family or friends',
            },
            {
              value: 'Health issues or physical limitations',
              label: 'Health issues or physical limitations',
            },
            { value: "I don't know", label: "I don't know" },
            { value: 'Other', label: 'Other (please specify)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('barriersToPhysicalActivity', value)
          }}
        />
        {/* Importance of physical activity for boys and girls */}
        <Select
          {...customRegister('importanceOfPhysicalActivity')}
          label="Is it important for both boys and girls to be physically active?"
          options={[
            {
              value: "Yes, it's important for both boys and girls",
              label: "Yes, it's important for both boys and girls",
            },
            {
              value: "It's only important for boys",
              label: "It's only important for boys",
            },
            {
              value: "It's only important for girls",
              label: "It's only important for girls",
            },
            { value: "I don't know", label: "I don't know" },
          ]}
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
          options={[
            {
              value: 'Yes',
              label: 'Yes',
            },
            { value: 'No', label: 'No' },
            { value: "I don't know", label: "I don't know" },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('sameTypesOfSportsAndActivities', value)
          }}
        />

        <Select
          {...customRegister('timeForPhysicalActivities')}
          label="Do you think that girls in your community have more or less time for physical activities outside of house chores compared to boys?"
          options={[
            {
              value: 'More time',
              label: 'More time',
            },
            { value: 'Less time', label: 'Less time' },
            {
              value: 'The same amount of time',
              label: 'The same amount of time',
            },
            { value: "I don't know", label: "I don't know" },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('timeForPhysicalActivities', value)
          }}
        />
        <Select
          {...customRegister('moreOpportunitiesOutsideHouseChores')}
          label="Would you like to have more opportunities for physical activities outside of house chores?"
          options={[
            {
              value: 'Yes',
              label: 'Yes',
            },
            { value: 'No', label: 'No' },
            { value: "I don't know", label: "I don't know" },
          ]}
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
