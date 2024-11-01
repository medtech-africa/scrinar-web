import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  activityBenefitsOptions,
  balancedDietOptions,
  dietConsequenceOptions,
  exerciseActivitiesOptions,
  fatExamplesOptions,
  physicalActivityOptions,
  proteinExamplesOptions,
  saltyFoodEffectOptions,
  sweetsEffectOptions,
  vitaminExamplesOptions,
} from '@/types/studentsSurvey.types'

const Nutrition = ({
  studentId,
  studentSurvey,
}: {
  studentId: string
  studentSurvey?: any
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Nutrition" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Select
          {...customRegister('balancedDiet')}
          label="What is a balanced diet?"
          value={{
            value: watch('balancedDiet'),
            label: watch('balancedDiet'),
          }}
          options={balancedDietOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('balancedDiet', value)
          }}
        />
        <PageCard
          title="Diet Consequence (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('dietConsequence')}
            label="What can happen if you don’t eat a balanced diet?"
            value={{
              value: watch('dietConsequence'),
              label: watch('dietConsequence'),
            }}
            options={dietConsequenceOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('dietConsequence', value)
              setValue('dietConsequenceOther', '')
            }}
          />

          {watch('dietConsequence') === 'Other' && (
            <Input
              {...customRegister('dietConsequenceOther')}
              label="Specify if Others (Diet Consequence)"
              value={
                watch('dietConsequenceOther') ||
                studentSurvey?.dietConsequenceOther
              }
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        <Select
          {...customRegister('carbExamples')}
          isCreatable
          isClearable={false}
          value={watch('carbExamples')?.map((option: any) => {
            return { value: option, label: option }
          })}
          isMulti
          label="*Examples of Carbohydrates"
          options={[{ value: 'Rice', label: 'Rice' }]}
          placeholder="E.g., rice, bread"
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('carbExamples', value)
          }}
        />

        <Select
          {...customRegister('proteinExamples')}
          isCreatable
          isClearable={false}
          value={watch('proteinExamples')?.map((option: any) => {
            return { value: option, label: option }
          })}
          isMulti
          label="Examples of Proteins"
          placeholder="E.g., meat, eggs"
          options={proteinExamplesOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('proteinExamples', value)
          }}
        />

        <Select
          {...customRegister('fatExamples')}
          isCreatable
          isClearable={false}
          isMulti
          value={watch('fatExamples')?.map((option: any) => {
            return { value: option, label: option }
          })}
          label="Examples of Fats and Oils"
          placeholder="E.g., butter, oil"
          options={fatExamplesOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('fatExamples', value)
          }}
        />

        <Select
          {...customRegister('vitaminExamples')}
          isCreatable
          isClearable={false}
          value={watch('vitaminExamples')?.map((option: any) => {
            return { value: option, label: option }
          })}
          isMulti
          label="Examples of Vitamins and Minerals"
          placeholder="E.g., fruits, vegetables"
          options={vitaminExamplesOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('vitaminExamples', value)
          }}
        />
        <PageCard
          title="Sweets Effect (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('sweetsEffect')}
            label="Why is it bad to eat too many sweets?"
            value={{
              value: watch('sweetsEffect'),
              label: watch('sweetsEffect'),
            }}
            options={sweetsEffectOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('sweetsEffect', value)
              setValue('sweetsEffectOther', '')
            }}
          />
          {watch('sweetsEffect') === 'Other' && (
            <Input
              {...customRegister('sweetsEffectOther')}
              label="Specify if Others (Sweets Effect)"
              placeholder="Specify if Others"
              value={
                watch('sweetsEffectOther') || studentSurvey?.sweetsEffectOther
              }
            />
          )}
        </PageCard>
        <PageCard
          title="Salty Food Effect (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('saltyFoodEffect')}
            label="What happens if you eat too much salty or oily food?"
            value={{
              value: watch('saltyFoodEffect'),
              label: watch('saltyFoodEffect'),
            }}
            options={saltyFoodEffectOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('saltyFoodEffect', value)
              setValue('saltyFoodEffectOther', '')
            }}
          />
          {watch('saltyFoodEffect') === 'Other' && (
            <Input
              {...customRegister('saltyFoodEffectOther')}
              label="Specify if Others (Salty Food Effect)"
              placeholder="Specify if Others"
              value={
                watch('saltyFoodEffectOther') ||
                studentSurvey?.saltyFoodEffectOther
              }
            />
          )}
        </PageCard>

        <Select
          {...customRegister('physicalActivity')}
          label="How much physical activity should you do daily?"
          value={{
            value: watch('physicalActivity'),
            label: watch('physicalActivity'),
          }}
          options={physicalActivityOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('physicalActivity', value)
          }}
        />
        <PageCard
          title="Activity Benefits (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('activityBenefits')}
            label="What are the benefits of physical activity?"
            value={{
              value: watch('activityBenefits'),
              label: watch('activityBenefits'),
            }}
            options={activityBenefitsOptions}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('activityBenefits', value)
              setValue('activityBenefitsOther', '')
            }}
          />
          {watch('activityBenefits') === 'Other' && (
            <Input
              {...customRegister('activityBenefitsOther')}
              label="Specify if Others (Activity Benefits)"
              placeholder="Specify if Others"
              value={
                watch('activityBenefitsOther') ||
                studentSurvey?.activityBenefitsOther
              }
            />
          )}
        </PageCard>

        <Select
          {...customRegister('exerciseActivities')}
          isCreatable
          isClearable={false}
          label="What types of activities are good for exercise?"
          isMulti
          value={watch('exerciseActivities')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={exerciseActivitiesOptions}
          placeholder="E.g., running, swimming"
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('exerciseActivities', value)
          }}
        />
      </div>
    </PageCard>
  )
}

export default Nutrition
