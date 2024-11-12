import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React, { useState } from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import {
  feelingsOfstressOptions,
  makesFeelBetterOptionsOptions,
  stressorsOptions,
  thoughtsOnSubstancesOptions,
  YesorNoOptionsOther,
} from '@/types/studentsSurvey.types'

const StressCausesForm = ({ studentId = '' }) => {
  const { customRegister, setValue } = useCustomRegister(studentId)
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
        setValue('stressOther', '') // Clear "Other" input if unchecked
      }
    } else {
      setShowOtherInput(false)
      setValue('stressOther', '') // Clear "Other" input if other option is selected
      setValue('stressCauses', option)
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
              {...customRegister(`stressCauses`)}
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
            {...customRegister('stressOther')}
            placeholder="Please specify"
            className="mt-2 border p-2 w-full"
          />
        )}
      </div>
    </div>
  )
}

export const RiskyBehaviourStress = ({
  studentId,
}: {
  studentId: string
  studentSurvey: any
}) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

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
                  {...customRegister('healthCheckupImportance')}
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
                  {...customRegister('mentalHealthImportance')}
                />
                <label htmlFor={`mental-health-${index}`} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>

        <StressCausesForm studentId={studentId} />

        <Select
          {...customRegister('stressors')}
          label="What things make you feel stressed? (Choose all that apply)"
          isMulti
          isClearable={false}
          value={watch('stressors')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={stressorsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('stressors', value)
          }}
        />

        {/* What makes you feel better */}
        <Select
          {...customRegister('makesFeelBetter')}
          label="When you feel worried or upset, what helps you feel better? (Choose all that you do)"
          isMulti
          isClearable={false}
          value={watch('makesFeelBetter')?.map((option: any) => {
            return { value: option, label: option }
          })}
          options={makesFeelBetterOptionsOptions}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('makesFeelBetter', value)
          }}
        />

        {/* Thoughts on smoking and drinking alcohol */}
        <Select
          {...customRegister('thoughtsOnSubstances')}
          label="What do you think about smoking and drinking alcohol?"
          options={thoughtsOnSubstancesOptions}
          value={{
            value: watch('thoughtsOnSubstances'),
            label: watch('thoughtsOnSubstances'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('thoughtsOnSubstances', value)
          }}
        />

        <PageCard
          title="Long-term Stress Effects (If Other, Please Specify)"
          bodyStyle="flex flex-col pb-4 px-4 gap-1"
        >
          <Select
            {...customRegister('feelingsOfstress')}
            label="What can happen when you're stressed for a long time?"
            options={feelingsOfstressOptions}
            value={{
              value: watch('feelingsOfstress'),
              label: watch('feelingsOfstress'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('feelingsOfstress', value)
              setValue('feelingsOfstressOther', '')
            }}
          />
          {watch('feelingsOfstress') === 'Other' && (
            <Input
              {...customRegister('feelingsOfstressOther')}
              label="Specify if Others (Feelings of Stress)"
              placeholder="Specify if Others"
            />
          )}
        </PageCard>

        <Select
          {...customRegister('everSmoked')}
          label="Have you smoked in any form before?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('everSmoked'),
            label: watch('everSmoked'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('everSmoked', value)
          }}
        />

        {/* Current alcohol use */}
        <Select
          {...customRegister('currentAlcohol')}
          label="Do you currently take alcohol?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('currentAlcohol'),
            label: watch('currentAlcohol'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('currentAlcohol', value)
          }}
        />

        {/* Alcohol history */}
        <Select
          {...customRegister('everTakenAlcohol')}
          label="Have you ever taken alcohol before?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('everTakenAlcohol'),
            label: watch('everTakenAlcohol'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('everTakenAlcohol', value)
          }}
        />

        {/* Current smoking status */}
        <Select
          {...customRegister('currentSmoking')}
          label="Do you currently smoke?"
          options={YesorNoOptionsOther}
          value={{
            value: watch('currentSmoking'),
            label: watch('currentSmoking'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('currentSmoking', value)
          }}
        />
      </div>
    </PageCard>
  )
}
