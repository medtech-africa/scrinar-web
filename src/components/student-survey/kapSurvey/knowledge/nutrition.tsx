import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { useCustomRegister } from '@/hooks/useCustomRegister'

const Nutrition = ({
  studentId,
  // studentSurvey,
}: {
  studentId: string
  // studentSurvey: any
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

  return (
    <PageCard title="Nutrition" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        <Select
          {...customRegister('balancedDiet')}
          label="What is a balanced diet?"
          options={[
            {
              value: 'Only fruits and vegetables',
              label: 'Only fruits and vegetables',
            },
            {
              value: 'All food groups',
              label: 'All food groups',
            },
            { value: 'I don’t know', label: 'I don’t know' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('balancedDiet', value)
          }}
        />

        <Select
          {...customRegister('dietConsequence')}
          label="What can happen if you don’t eat a balanced diet?"
          options={[
            {
              value: 'I can become sick more often',
              label: 'I can become sick more often',
            },
            {
              value: 'I will have more energy',
              label: 'I will have more energy',
            },
            { value: 'I will become taller', label: 'I will become taller' },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('dietConsequence', value)
          }}
        />

        {watch('dietConsequence') === 'Other' && (
          <Input
            {...customRegister('dietConsequenceOther')}
            label="Specify if Others (Diet Consequence)"
            placeholder="Specify if Others"
          />
        )}

        <Select
          {...customRegister('carbExamples')}
          isCreatable
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
          isMulti
          label="Examples of Proteins"
          placeholder="E.g., meat, eggs"
          options={[
            { value: 'Meat', label: 'Meat' },
            { value: 'Eggs', label: 'Eggs' },
            { value: 'Fish', label: 'Fish' },
            { value: 'Dairy', label: 'Dairy' },
            { value: 'Vegetables', label: 'Vegetables' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('proteinExamples', value)
          }}
        />

        <Select
          {...customRegister('fatExamples')}
          isCreatable
          isMulti
          label="Examples of Fats and Oils"
          placeholder="E.g., butter, oil"
          options={[
            { value: 'Butter', label: 'Butter' },
            { value: 'Margarine', label: 'Margarine' },
            { value: 'Olive Oil', label: 'Olive Oil' },
            { value: 'Vegetable Oil', label: 'Vegetable Oil' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('fatExamples', value)
          }}
        />

        <Select
          {...customRegister('vitaminExamples')}
          isCreatable
          isMulti
          label="Examples of Vitamins and Minerals"
          placeholder="E.g., fruits, vegetables"
          options={[
            { value: 'Vitamin A', label: 'Vitamin A (e.g., Carrots)' },
            { value: 'Vitamin C', label: 'Vitamin C (e.g., Oranges)' },
            { value: 'Vitamin D', label: 'Vitamin D (e.g., Fish Oil)' },
            { value: 'Vitamin E', label: 'Vitamin E (e.g., Nuts)' },
            { value: 'Vitamin K', label: 'Vitamin K (e.g., Leafy Greens)' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('vitaminExamples', value)
          }}
        />

        <Select
          {...customRegister('sweetsEffect')}
          label="Why is it bad to eat too many sweets?"
          options={[
            {
              value: 'Tooth decay and weight gain',
              label: 'Tooth decay and weight gain',
            },
            {
              value: 'It makes you grow taller',
              label: 'It makes you grow taller',
            },
            {
              value: 'It gives you more energy for school',
              label: 'It gives you more energy for school',
            },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('sweetsEffect', value)
          }}
        />
        {watch('sweetsEffect') === 'Other' && (
          <Input
            {...customRegister('sweetsEffectOther')}
            label="Specify if Others (Sweets Effect)"
            placeholder="Specify if Others"
          />
        )}

        <Select
          {...customRegister('saltyFoodEffect')}
          label="What happens if you eat too much salty or oily food?"
          options={[
            {
              value: 'It can make your heart unhealthy',
              label: 'It can make your heart unhealthy',
            },
            {
              value: 'It helps you run faster',
              label: 'It helps you run faster',
            },
            {
              value: 'It gives you stronger bones',
              label: 'It gives you stronger bones',
            },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('saltyFoodEffect', value)
          }}
        />
        {watch('saltyFoodEffect') === 'Other' && (
          <Input
            {...customRegister('saltyFoodEffectOther')}
            label="Specify if Others (Salty Food Effect)"
            placeholder="Specify if Others"
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('saltyFoodEffectOther', value)
            }}
          />
        )}

        <Select
          {...customRegister('physicalActivity')}
          label="How much physical activity should you do daily?"
          options={[
            { value: '30 minutes', label: '30 minutes' },
            { value: '1 hour', label: '1 hour' },
            { value: '2 hours', label: '2 hours' },
            { value: 'I don’t know', label: 'I don’t know' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('physicalActivity', value)
          }}
        />

        <Select
          {...customRegister('activityBenefits')}
          label="What are the benefits of physical activity?"
          options={[
            {
              value: 'Better health and stronger muscles',
              label: 'Better health and stronger muscles',
            },
            { value: 'It makes you tired', label: 'It makes you tired' },
            {
              value: 'It doesn’t have any benefit',
              label: 'It doesn’t have any benefit',
            },
            { value: 'I don’t know', label: 'I don’t know' },
            { value: 'Other', label: 'Other' },
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('activityBenefits', value)
          }}
        />
        {watch('activityBenefits') === 'Other' && (
          <Input
            {...customRegister('activityBenefitsOther')}
            label="Specify if Others (Activity Benefits)"
            placeholder="Specify if Others"
          />
        )}

        <Select
          {...customRegister('exerciseActivities')}
          isCreatable
          label="What types of activities are good for exercise?"
          isMulti
          options={[
            {
              value: 'Running and playing sports',
              label: 'Running and playing sports',
            },
            { value: 'Walking', label: 'Walking' },
            { value: 'Swimming', label: 'Swimming' },
          ]}
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
