import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import { useNcdFilter } from './NcdFilterContext'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
  disabled?: boolean
}

export const COPDAssessmentForm = ({ onNext, disabled }: Props) => {
  const { register: customRegister, watch } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()
  const isRequiredField = useRequiredFieldLabel()

  // Get all form data for conditional required field logic
  const formData = watch()

  // Only show this form for COPD
  if (!hasNcdSelected(NCD.COPD)) {
    return null
  }

  const copdQuestions = [
    {
      label:
        'In the past 12 months, have you had a cough that lasted more than 3 months?',
      key: 'coughDuration',
    },
    {
      label:
        'In the past 12 months, have you had shortness of breath that gets worse with physical activity?',
      key: 'shortnessOfBreath',
    },
    {
      label:
        'Do you experience limitations in your daily activities due to breathing problems?',
      key: 'activityLimitations',
    },
    {
      label:
        'Have you been exposed to dust, fumes, or chemicals at work or home?',
      key: 'exposureToDust',
    },
  ]

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        COPD Assessment Questionnaire
      </Text>
      {/* <Text variant="text/sm" className="text-gray-500 mb-4">
        Five-Item Questionnaire for Chronic Obstructive Pulmonary Disease (COPD)
        Risk Assessment
      </Text> */}

      <div className="space-y-6">
        <div className="overflow-x-auto">
          <div className="min-w-[600px] p-4">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-blue-200 text-sm">
                  <th className="border border-gray-300 px-4 py-2 text-left min-w-[400px]">
                    Question
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center min-w-[80px]">
                    Yes
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-center min-w-[80px]">
                    No
                  </th>
                </tr>
              </thead>
              <tbody>
                {copdQuestions.map((question) => (
                  <tr
                    key={question.key}
                    className="odd:bg-white even:bg-gray-100"
                  >
                    <td className="border border-gray-300 px-4 py-2 text-sm">
                      {question.label}
                    </td>
                    {['Yes', 'No'].map((value) => (
                      <td
                        key={question.key + '_' + value}
                        className="border border-gray-300 px-4 py-2 text-center relative"
                      >
                        <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                          <span className="w-full h-full flex items-center justify-center">
                            <input
                              {...customRegister(`copd.${question.key}`)}
                              value={value}
                              type="radio"
                              title={question.key}
                              disabled={disabled}
                            />
                          </span>
                        </label>
                      </td>
                    ))}
                  </tr>
                ))}

                <tr className="odd:bg-white even:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    Do you currently smoke cigarettes?
                  </td>
                  {['Yes, currently smoking', 'Never smoked'].map((value) => (
                    <td
                      key={'smoking_' + value}
                      className="border border-gray-300 px-4 py-2 text-center relative"
                    >
                      <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <span className="w-full h-full flex items-center justify-center">
                          <input
                            {...customRegister(
                              'lifestyle.currentSmokingStatus'
                            )}
                            value={value}
                            type="radio"
                            title="lifestyle.currentSmokingStatus"
                            disabled={disabled}
                          />
                        </span>
                      </label>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-2">
            Peak Flow meter assessment
          </Text>
          <Text variant="text/sm" className="mb-4">
            Ask patient to blow into the peak flow meter and record the value
            below.
          </Text>
          <Input
            {...customRegister('copd.pefLevel')}
            placeholder="Enter PEF Level"
            label={isRequiredField(
              'PEF Level (L/min)',
              'copd.pefLevel',
              formData
            )}
            labelStyle="lg:text-sm text-xs"
            type="number"
            min="0"
            max="1000"
            step="1"
            disabled={disabled}
          />
        </div>
      </div>

      {!disabled && (
        <div className="flex justify-end mt-6">
          <Button
            className="px-8"
            onClick={onNext}
            type="button"
            disabled={disabled}
          >
            Save & continue
          </Button>
        </div>
      )}
    </div>
  )
}
