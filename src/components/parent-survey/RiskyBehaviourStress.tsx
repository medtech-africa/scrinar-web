import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React, { useState } from 'react'
import {
  feelingsOfstressOptions,
  makesFeelBetterOptionsOptions,
  stressorsOptions,
  thoughtsOnSubstancesOptions,
  YesorNoOptionsOther,
} from '@/types/studentsSurvey.types'
import { useFormContext } from 'react-hook-form'

const StressCausesForm = () => {
  const { register: customRegister, setValue } = useFormContext()
  const [showOtherInput, setShowOtherInput] = useState(false)

  const options = [
    'Eating healthy food',
    'Problems at home',
    'Too much homework or tests',
    'Issues with friends',
    'Chores or helping at home',
    'Health problems',
    'Not having enough free time',
    'Watching cartoons',
    'I don’t know',
    'Other (please specify)',
  ]

  const handleCheckboxChange = (option: string) => {
    if (option === 'Other (please specify)') {
      setShowOtherInput(!showOtherInput)
      if (!showOtherInput) {
        setValue('riskyBehavior.stressOther', '') // Clear "Other" input if unchecked
      }
    } else {
      setShowOtherInput(false)
      setValue('riskyBehavior.stressOther', '') // Clear "Other" input if other option is selected
      setValue('riskyBehavior.stressCauses', option)
    }
  }

  return (
    <div className="form-group">
      <label className="block text-sm font-medium mb-2">
        Which of the following can cause stress for children your age?
      </label>
      <div className="space-y-2">
        {options.map((option, index) => (
          <div key={index} className="flex items-center">
            <input
              type="radio"
              id={`stress-cause-${index}`}
              value={option}
              {...customRegister(`riskyBehavior.stressCauses`)}
              onChange={() => handleCheckboxChange(option)}
              className="mr-2"
            />
            <label htmlFor={`stress-cause-${index}`} className="text-sm">
              {option}
            </label>
          </div>
        ))}
        {showOtherInput && (
          <input
            type="text"
            {...customRegister('riskyBehavior.stressOther')}
            placeholder="Please specify"
            className="mt-2 border p-2 w-full"
          />
        )}
      </div>
    </div>
  )
}

export const ParentSurveyRiskyBehaviourStress = () => {
  const { register: customRegister, setValue, watch } = useFormContext()

  return (
    <PageCard title="Nutrition" bodyStyle="p-4">
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* Balanced diet importance */}
        <div className="form-group">
          <label className="block text-sm font-medium mb-2">
            How important do you think regular health check-ups are?
          </label>
          <div className="space-y-2">
            {[
              'Very important',
              'Important',
              'Slightly Important',
              'Not important',
              'Don’t know',
            ].map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`health-checkup-${index}`}
                  value={option}
                  className="mr-2"
                  {...customRegister('riskyBehavior.healthCheckupImportance')}
                />
                <label htmlFor={`health-checkup-${index}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="form-group">
          <label className="block text-sm font-medium mb-2">
            How important do you think it is to take care of your mental health?
          </label>
          <div className="space-y-2">
            {[
              'Very important',
              'Important',
              'Slightly Important',
              'Not important',
              'Don’t know',
            ].map((option, index) => (
              <div key={index} className="flex items-center">
                <input
                  type="radio"
                  id={`mental-health-${index}`}
                  value={option}
                  className="mr-2"
                  {...customRegister('riskyBehavior.mentalHealthImportance')}
                />
                <label htmlFor={`mental-health-${index}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <StressCausesForm />

        <Select
          {...customRegister('riskyBehavior.stressors')}
          label="What things make you feel stressed? (Choose all that apply)"
          isMulti
          isClearable={false}
          value={watch('riskyBehavior.stressors')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={stressorsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('riskyBehavior.stressors', value)
          }}
        />

        {/* What makes you feel better */}
        <Select
          {...customRegister('riskyBehavior.makesFeelBetter')}
          label="When you feel worried or upset, what helps you feel better? (Choose all that you do)"
          isMulti
          isClearable={false}
          value={watch('riskyBehavior.makesFeelBetter')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={makesFeelBetterOptionsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('riskyBehavior.makesFeelBetter', value)
          }}
        />

        {/* Thoughts on smoking and drinking alcohol */}
        <Select
          {...customRegister('riskyBehavior.thoughtsOnSubstances')}
          label="What do you think about smoking and drinking alcohol?"
          options={thoughtsOnSubstancesOptions}
          value={{
            value: watch('riskyBehavior.thoughtsOnSubstances'),
            label: watch('riskyBehavior.thoughtsOnSubstances'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('riskyBehavior.thoughtsOnSubstances', value)
          }}
        />

        <PageCard
          title="Long-term Stress Effects (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            // TODO use the custom options with others component
            {...customRegister('riskyBehavior.feelingsOfstress')}
            label="What can happen when you're stressed for a long time?"
            options={feelingsOfstressOptions}
            value={{
              value: watch('riskyBehavior.feelingsOfstress'),
              label: watch('riskyBehavior.feelingsOfstress'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('riskyBehavior.feelingsOfstress', value)
              setValue('riskyBehavior.feelingsOfstressOther', '')
            }}
          />
          {watch('riskyBehavior.feelingsOfstress') === 'Other' && (
            <Input
              {...customRegister('riskyBehavior.feelingsOfstressOther')}
              label="Specify if Others (Feelings of Stress)"
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        <Select
          {...customRegister('riskyBehavior.everSmoked')}
          label="Have you smoked in any form before?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('riskyBehavior.everSmoked'),
            label: watch('riskyBehavior.everSmoked'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('riskyBehavior.everSmoked', value)
          }}
        />

        {/* Current alcohol use */}
        <Select
          {...customRegister('riskyBehavior.currentAlcohol')}
          label="Do you currently take alcohol?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('riskyBehavior.currentAlcohol'),
            label: watch('riskyBehavior.currentAlcohol'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('riskyBehavior.currentAlcohol', value)
          }}
        />

        {/* Alcohol history */}
        <Select
          {...customRegister('riskyBehavior.everTakenAlcohol')}
          label="Have you ever taken alcohol before?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('riskyBehavior.everTakenAlcohol'),
            label: watch('riskyBehavior.everTakenAlcohol'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('riskyBehavior.everTakenAlcohol', value)
          }}
        />

        {/* Current smoking status */}
        <Select
          {...customRegister('riskyBehavior.currentSmoking')}
          label="Do you currently smoke?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('riskyBehavior.currentSmoking'),
            label: watch('riskyBehavior.currentSmoking'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('riskyBehavior.currentSmoking', value)
          }}
        />
      </div>
    </PageCard>
  )
}
