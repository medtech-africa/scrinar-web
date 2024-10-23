import React from 'react'
import { Select } from '../ui/select'
import { Input } from '../ui/input'
import { Control, Controller, FieldErrors } from 'react-hook-form'
import { IStudentsSurveyData } from '@/types/studentsSurvey.types'
import { PageCard } from '../ui/page-card'

const RiskyBehavior = ({
  control,
  errors,
  setSmokingDrinkingSpecify,
  smokingDrinkingSpecify,
  setHealthCheckupsSpecify,
  healthCheckupsSpecify,
  setFeelingsOfStressSpecify,
  feelingsOfStressSpecify,
  setStressSignsSpecify,
  stressSignsSpecify,
}: {
  control: Control<IStudentsSurveyData>
  errors: FieldErrors<IStudentsSurveyData>
  setSmokingDrinkingSpecify: (value: string) => void
  smokingDrinkingSpecify: string
  setHealthCheckupsSpecify: (value: string) => void
  healthCheckupsSpecify: string
  setFeelingsOfStressSpecify: (value: string) => void
  feelingsOfStressSpecify: string
  setStressSignsSpecify: (value: string) => void
  stressSignsSpecify: string
}) => {
  return (
    <PageCard title="Risky Behaviour and Stress" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Effects of smoking and drinking alcohol */}
        <Controller
          control={control}
          name="smokingDrinkingEffects"
          render={({
            field: { onChange, value, ...field },
            fieldState: { error },
          }) => (
            <Select
              {...field}
              value={value.value}
              label="What are some effects of smoking and drinking alcohol?"
              options={[
                {
                  value: 'Health problems and diseases',
                  label: 'Health problems and diseases',
                },
                {
                  value: 'Look cool',
                  label: 'It makes you look cool and fit in with friends',
                },
                { value: 'No effect', label: 'It doesn’t have any effect' },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val) => {
                const selectedValue = val as {
                  value: string
                  label: string
                }
                onChange(selectedValue?.value)
                setSmokingDrinkingSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={error?.message}
              variant={error ? 'destructive' : 'default'}
            />
          )}
        />

        {smokingDrinkingSpecify === 'Other' && (
          <Controller
            control={control}
            name="smokingDrinkingEffectsSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Smoking/Drinking Effects)"
                placeholder="Specify if Others"
                message={errors.smokingDrinkingEffectsSpecify?.message}
                variant={
                  errors.smokingDrinkingEffectsSpecify
                    ? 'destructive'
                    : 'default'
                }
              />
            )}
          />
        )}

        {/* Importance of health check-ups */}
        <Controller
          control={control}
          name="healthCheckupsImportance"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="Why are regular health check-ups important?"
              options={[
                {
                  value: 'Healthy',
                  label:
                    'To make sure you are healthy and catch problems early',
                },
                { value: 'Avoid school', label: 'To avoid school' },
                {
                  value: 'Not important',
                  label: 'It is not important if you are not sick',
                },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setHealthCheckupsSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.healthCheckupsImportance?.message}
              variant={
                errors.healthCheckupsImportance ? 'destructive' : 'default'
              }
            />
          )}
        />
        {healthCheckupsSpecify === 'Other' && (
          <Controller
            control={control}
            name="healthCheckupsImportanceSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Health Check-ups Importance)"
                placeholder="Specify if Others"
                message={errors.healthCheckupsImportanceSpecify?.message}
                variant={
                  errors.healthCheckupsImportanceSpecify
                    ? 'destructive'
                    : 'default'
                }
              />
            )}
          />
        )}

        {/* Causes of stress */}
        <Controller
          control={control}
          name="stressCauses"
          render={({ field }) => (
            <Select
              {...field}
              label="Which of the following can cause stress?"
              isMulti
              options={[
                { value: 'Healthy food', label: 'Eating healthy food' },
                { value: 'Homework', label: 'Too much homework or tests' },
                { value: 'Friends', label: 'Playing with friends' },
                { value: 'Cartoons', label: 'Watching cartoons' },
                { value: 'I don’t know', label: 'I don’t know' },
                { value: 'Other', label: 'Other' },
              ]}
              message={errors.stressCauses?.message}
              variant={errors.stressCauses ? 'destructive' : 'default'}
            />
          )}
        />

        {/* Long-term stress effects */}
        <Controller
          control={control}
          name="feelingsOfstress"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="What can happen when you're stressed for a long time?"
              options={[
                {
                  value: 'Sick and tired',
                  label: 'It can make you feel sick and tired',
                },
                { value: 'Stronger', label: 'It makes you stronger' },
                { value: 'Focus', label: 'It helps you focus better' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setFeelingsOfStressSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.feelingsOfstress?.message}
              variant={errors.feelingsOfstress ? 'destructive' : 'default'}
            />
          )}
        />
        {feelingsOfStressSpecify === 'Other' && (
          <Controller
            control={control}
            name="feelingsOfstressSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Feelings of Stress)"
                placeholder="Specify if Others"
                message={errors.feelingsOfstressSpecify?.message}
                variant={
                  errors.feelingsOfstressSpecify ? 'destructive' : 'default'
                }
              />
            )}
          />
        )}

        {/* Signs of stress */}
        <Controller
          control={control}
          name="stressSigns"
          render={({ field: { onChange, ...field } }) => (
            <Select
              {...field}
              label="Which of these feelings can be a sign of stress?"
              options={[
                { value: 'Happiness', label: 'Happiness' },
                { value: 'Excitement', label: 'Excitement' },
                { value: 'Anger or sadness', label: 'Anger or sadness' },
                { value: 'Relaxation', label: 'Relaxation' },
                { value: 'Other', label: 'Other' },
              ]}
              onChange={(val) => {
                onChange(val)
                const selectedValue = val as {
                  value: string
                  label: string
                }
                setStressSignsSpecify(
                  selectedValue.value === 'Other' ? 'Other' : ''
                )
              }}
              message={errors.stressSigns?.message}
              variant={errors.stressSigns ? 'destructive' : 'default'}
            />
          )}
        />
        {stressSignsSpecify === 'Other' && (
          <Controller
            control={control}
            name="stressSignsSpecify"
            render={({ field }) => (
              <Input
                {...field}
                label="Specify if Others (Signs of Stress)"
                placeholder="Specify if Others"
                message={errors.stressSignsSpecify?.message}
                variant={errors.stressSignsSpecify ? 'destructive' : 'default'}
              />
            )}
          />
        )}
      </div>
    </PageCard>
  )
}

export default RiskyBehavior
