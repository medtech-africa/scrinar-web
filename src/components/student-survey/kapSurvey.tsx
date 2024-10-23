import React from 'react'
import { PageCard } from '../ui/page-card'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import { Select } from '../ui/select'
import { Input } from '../ui/input'

const KAPSurvey = ({
  control,
  errors,
  dietConsequenceSpecify,
  setDietConsequenceSpecify,
  sweetsEffectSpecify,
  setSweetsEffectSpecify,
  saltyFoodEffectSpecify,
  setSaltyFoodEffectSpecify,
  activityBenefitsSpecify,
  setActivityBenefitsSpecify,
}: {
  control: Control<IStudentsSurveyData>
  errors: FieldErrors<IStudentsSurveyData>
  dietConsequenceSpecify: string
  setDietConsequenceSpecify: (value: string) => void
  sweetsEffectSpecify: string
  setSweetsEffectSpecify: (value: string) => void
  saltyFoodEffectSpecify: string
  setSaltyFoodEffectSpecify: (value: string) => void
  activityBenefitsSpecify: string
  setActivityBenefitsSpecify: (value: string) => void
}) => {
  return (
    <PageCard title="KAP Survey" bodyStyle="p-4">
      {/* Section B: KAP (Knowledge, Attitudes, Practices) */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Balanced diet question */}
        <Controller
          control={control}
          name="balancedDiet"
          render={({ field }) => (
            <Select
              {...field}
              label="What is a balanced diet?"
              options={[
                {
                  value: 'A diet with only fruits and vegetables',
                  label: 'Only fruits and vegetables',
                },
                {
                  value: 'A diet with all food groups',
                  label: 'All food groups',
                },
                { value: 'I don’t know', label: 'I don’t know' },
              ]}
              message={errors.balancedDiet?.message}
              variant={errors.balancedDiet ? 'destructive' : 'default'}
            />
          )}
        />
        {/* What can happen if you don’t eat a balanced diet? */}
        <Controller
          control={control}
          name="dietConsequence"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="What can happen if you don’t eat a balanced diet?"
              options={[
                { value: 'sick', label: 'I can become sick more often' },
                { value: 'energy', label: 'I will have more energy' },
                { value: 'taller', label: 'I will become taller' },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val: unknown) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }

                setDietConsequenceSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.dietConsequence?.message}
              variant={errors.dietConsequence ? 'destructive' : 'default'}
            />
          )}
        />
        {dietConsequenceSpecify === 'Other' && (
          <Controller
            control={control}
            name="dietConsequenceSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Diet Consequence)"
                placeholder="Specify if Others"
                message={errors.dietConsequenceSpecify?.message}
                variant={
                  errors.dietConsequenceSpecify ? 'destructive' : 'default'
                }
              />
            )}
          />
        )}

        {/* List of food examples */}
        <Controller
          control={control}
          name="carbExamples"
          render={({ field }) => (
            <Select
              {...field}
              isCreatable
              isMulti
              label="*Examples of Carbohydrates"
              options={[{ value: 'Rice', label: 'Rice' }]}
              placeholder="E.g., rice, bread"
              message={errors.carbExamples?.message}
              variant={errors.carbExamples ? 'destructive' : 'default'}
            />
          )}
        />

        <Controller
          control={control}
          name="proteinExamples"
          render={({ field }) => (
            <Select
              {...field}
              isCreatable
              isMulti
              label="Examples of Proteins"
              placeholder="E.g., meat, eggs"
              message={errors.proteinExamples?.message}
              variant={errors.proteinExamples ? 'destructive' : 'default'}
              options={[
                { value: 'Meat', label: 'Meat' },
                { value: 'Eggs', label: 'Eggs' },
                { value: 'Fish', label: 'Fish' },
                { value: 'Dairy', label: 'Dairy' },
                { value: 'Vegetables', label: 'Vegetables' },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="fatExamples"
          render={({ field }) => (
            <Select
              {...field}
              isCreatable
              isMulti
              label="Examples of Fats and Oils"
              placeholder="E.g., butter, oil"
              message={errors.fatExamples?.message}
              variant={errors.fatExamples ? 'destructive' : 'default'}
              options={[
                { value: 'Butter', label: 'Butter' },
                { value: 'Margarine', label: 'Margarine' },
                { value: 'Olive Oil', label: 'Olive Oil' },
                { value: 'Vegetable Oil', label: 'Vegetable Oil' },
              ]}
            />
          )}
        />

        <Controller
          control={control}
          name="vitaminExamples"
          render={({ field }) => (
            <Select
              {...field}
              isCreatable
              isMulti
              label="Examples of Vitamins and Minerals"
              placeholder="E.g., fruits, vegetables"
              message={errors.vitaminExamples?.message}
              variant={errors.vitaminExamples ? 'destructive' : 'default'}
              options={[
                { value: 'Vitamin A', label: 'Vitamin A (e.g., Carrots)' },
                { value: 'Vitamin C', label: 'Vitamin C (e.g., Oranges)' },
                { value: 'Vitamin D', label: 'Vitamin D (e.g., Fish Oil)' },
                { value: 'Vitamin E', label: 'Vitamin E (e.g., Nuts)' },
                {
                  value: 'Vitamin K',
                  label: 'Vitamin K (e.g., Leafy Greens)',
                },
              ]}
            />
          )}
        />

        {/* Why is it so bad to eat too many sweets and candies? */}
        <Controller
          control={control}
          name="sweetsEffect"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="Why is it bad to eat too many sweets?"
              options={[
                {
                  value: 'tooth decay and weight gain',
                  label: 'Tooth decay and weight gain',
                },
                { value: 'taller', label: 'It makes you grow taller' },
                {
                  value: 'energy',
                  label: 'It gives you more energy for school',
                },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val: unknown) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }

                setSweetsEffectSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.sweetsEffect?.message}
              variant={errors.sweetsEffect ? 'destructive' : 'default'}
            />
          )}
        />
        {sweetsEffectSpecify === 'Other' && (
          <Controller
            control={control}
            name="sweetsEffectSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Sweets Effect)"
                placeholder="Specify if Others"
                message={errors.sweetsEffectSpecify?.message}
                variant={errors.sweetsEffectSpecify ? 'destructive' : 'default'}
              />
            )}
          />
        )}

        {/* What can happen if you eat too much salty food or oily food? */}
        <Controller
          control={control}
          name="saltyFoodEffect"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="What happens if you eat too much salty or oily food?"
              options={[
                {
                  value: 'unhealthy heart',
                  label: 'It can make your heart unhealthy',
                },
                { value: 'run faster', label: 'It helps you run faster' },
                {
                  value: 'stronger bones',
                  label: 'It gives you stronger bones',
                },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val: unknown) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }

                setSaltyFoodEffectSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.saltyFoodEffect?.message}
              variant={errors.saltyFoodEffect ? 'destructive' : 'default'}
            />
          )}
        />
        {saltyFoodEffectSpecify === 'Other' && (
          <Controller
            control={control}
            name="saltyFoodEffectSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Salty Food Effect)"
                placeholder="Specify if Others"
                message={errors.saltyFoodEffectSpecify?.message}
                variant={
                  errors.saltyFoodEffectSpecify ? 'destructive' : 'default'
                }
              />
            )}
          />
        )}

        {/* Physical Activity */}
        <Controller
          control={control}
          name="physicalActivity"
          render={({ field }) => (
            <Select
              {...field}
              label="How much physical activity should you do daily?"
              options={[
                { value: '30 minutes', label: '30 minutes' },
                { value: '1 hour', label: '1 hour' },
                { value: '2 hours', label: '2 hours' },
                { value: 'I don’t know', label: 'I don’t know' },
              ]}
              message={errors.physicalActivity?.message}
              variant={errors.physicalActivity ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Benefits of Physical Activity */}
        <Controller
          control={control}
          name="activityBenefits"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="What are the benefits of physical activity?"
              options={[
                {
                  value: 'better health and muscles',
                  label: 'Better health and stronger muscles',
                },
                { value: 'tired', label: 'It makes you tired' },
                {
                  value: 'no benefit',
                  label: 'It doesn’t have any benefit',
                },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val: unknown) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setActivityBenefitsSpecify(selectedValue.value)
              }}
              message={errors.activityBenefits?.message}
              variant={errors.activityBenefits ? 'destructive' : 'default'}
            />
          )}
        />
        {activityBenefitsSpecify === 'Other' && (
          <Controller
            control={control}
            name="activityBenefitsSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Activity Benefits)"
                placeholder="Specify if Others"
                message={errors.activityBenefitsSpecify?.message}
                variant={
                  errors.activityBenefitsSpecify ? 'destructive' : 'default'
                }
              />
            )}
          />
        )}

        {/* What types of activities are good for exercise? */}
        <Controller
          control={control}
          name="exerciseActivities"
          render={({ field }) => (
            <Select
              {...field}
              isCreatable
              label="What types of activities are good for exercise?"
              isMulti
              options={[
                { value: 'running', label: 'Running and playing sports' },
                { value: 'fetching water', label: 'Fetching water' },
                { value: 'reading', label: 'Reading a book' },
                { value: 'watching tv', label: 'Watching TV' },
              ]}
            />
          )}
        />
      </div>
    </PageCard>
  )
}

export default KAPSurvey
