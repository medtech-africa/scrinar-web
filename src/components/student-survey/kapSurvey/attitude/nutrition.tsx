import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  balancedDietImportanceOptions,
  eatingHealthyFoodsOptions,
  idealBodySizeBoysOptions,
  idealBodySizeGirlsOptions,
  snackPreferenceOptions,
} from '@/types/studentsSurvey.types'

const Nutrition = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Nutrition" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Balanced diet importance */}
        <Select
          {...customRegister('balancedDietImportance')}
          value={{
            value: watch('balancedDietImportance'),
            label: watch('balancedDietImportance'),
          }}
          label="Do you think it’s important to eat a balanced diet every day?"
          options={balancedDietImportanceOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('balancedDietImportance', value)
          }}
        />

        {/* Eating healthy foods */}
        <Select
          {...customRegister('eatingHealthyFoods')}
          label="How do you feel about eating healthy foods when your parents give them to you?"
          value={{
            value: watch('eatingHealthyFoods'),
            label: watch('eatingHealthyFoods'),
          }}
          options={eatingHealthyFoodsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('eatingHealthyFoods', value)
          }}
        />

        {/* Snack preference */}
        <Select
          {...customRegister('snackPreference')}
          label="Do you prefer eating healthier snacks or snacks like puff puff or biscuits?"
          value={{
            value: watch('snackPreference'),
            label: watch('snackPreference'),
          }}
          options={snackPreferenceOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('snackPreference', value)
          }}
        />

        {/* Ideal body size for boys */}
        <PageCard
          title="Ideal Body Size (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('idealBodySizeBoys')}
            label="What do you think is the ideal body size for boys?"
            options={idealBodySizeBoysOptions}
            value={{
              value: watch('idealBodySizeBoys'),
              label: watch('idealBodySizeBoys'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('idealBodySizeBoys', value)
            }}
          />
          {watch('idealBodySizeBoys') === 'Other' && (
            <Input
              {...customRegister('idealBodySizeBoysOther')}
              label="Specify if Others (Ideal Body Size for Boys)"
              value={
                watch('idealBodySizeBoysOther') ||
                studentSurvey?.idealBodySizeBoysOther
              }
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        {/* Ideal body size for girls */}
        <PageCard
          title="Ideal Body Size (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('idealBodySizeGirls')}
            label="What do you think is the ideal body size for girls?"
            options={idealBodySizeGirlsOptions}
            value={{
              value: watch('idealBodySizeGirls'),
              label: watch('idealBodySizeGirls'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('idealBodySizeGirls', value)
            }}
          />
          {watch('idealBodySizeGirls') === 'Other' && (
            <Input
              {...customRegister('idealBodySizeGirlsOther')}
              label="Specify if Others (Ideal Body Size for Girls)"
              value={
                watch('idealBodySizeGirlsOther') ||
                studentSurvey?.idealBodySizeGirlsOther
              }
              placeholder="Specify if Others"
            />
          )}
        </PageCard>
      </div>
    </PageCard>
  )
}

export default Nutrition
