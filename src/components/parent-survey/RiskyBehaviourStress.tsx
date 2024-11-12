import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React, { useState } from 'react'
import { feelingsOfstressOptions } from '@/types/studentsSurvey.types'
import { useFormContext } from 'react-hook-form'
import { OptionsWithOthersField } from '../student-survey/OptionWithOthersField'

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
        Which of the following can cause stress at your age?
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
          {...customRegister('riskyBehavior.thingsDoneToChildToEaseWorryUpset')}
          label="When your child feels worried or upset, what do you do to help them feel better? (Choose all that you do)"
          isMulti
          isClearable={false}
          value={watch('riskyBehavior.thingsDoneToChildToEaseWorryUpset')?.map(
            (option: any) => {
              return { value: option, label: option }
            }
          )}
          options={[
            'Listen to them without interrupting',
            'Give them a hug or other comforting physical contact',
            'Talk to them about what’s bothering them',
            'Help them find a solution to their problem',
            'Give them space to calm down on their own',
            'Offer comfort through a favourite item (e.g., favourite food, etc)',
          ]}
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map((option: any) => option.value)
            setValue('riskyBehavior.thingsDoneToChildToEaseWorryUpset', value)
          }}
        />

        <OptionsWithOthersField
          label="What can happen when you're stressed for a long time?"
          options={feelingsOfstressOptions.map((v) => v.label)}
          form={{
            id: 'riskyBehavior.feelingsOfstress',
          }}
        />

        <OptionsWithOthersField
          label="What can happen if adolescents are exposed to smoking at home?"
          options={[
            'It can harm their lungs and overall health',
            'They might be more likely to start smoking themselves',
            'Smoking exposure isn’t necessarily harmful if done occasionally',
            "I'm not sure",
            'Other (please specify)',
          ]}
          form={{
            id: 'riskyBehavior.whenAdolescentsExposedToSmoking',
          }}
        />
      </div>
    </PageCard>
  )
}
