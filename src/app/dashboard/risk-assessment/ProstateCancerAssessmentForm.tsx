import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useNcdFilter } from './NcdFilterContext'
import { BadgeField } from '@/components/ui/badge'

type Props = {
  onNext: () => void
}

export const ProstateCancerAssessmentForm = ({ onNext }: Props) => {
  const { register: customRegister, watch } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()

  // Watch PSA level from blood tests
  const psaLevel = watch('bloodTest.psaLevel')

  // Only show this form for Prostate Cancer
  if (!hasNcdSelected('prostateCancer')) {
    return null
  }

  // Check if PSA level is available
  const hasPsaLevel = psaLevel && psaLevel.trim() !== ''

  const urinarySymptoms = [
    {
      label:
        'How often have you had a sensation of not emptying your bladder completely after you finished urinating?',
      key: 'urinarySymptomsIncompleteEmptying',
    },
    {
      label:
        'How often have you had to urinate again less then two hours after you finished urinating?',
      key: 'urinarySymptomsFrequency',
    },
    {
      label:
        'How often have you found you stopped and started again several times when you urinated?',
      key: 'urinarySymptomsIntermittency',
    },
    {
      label:
        'How often have you found it difficult to hold back urinating after you have felt the need?',
      key: 'urinarySymptomsUrgency',
    },
    {
      label:
        'How often have you noticed a reduction in the strength and force of your urinary stream?',
      key: 'urinarySymptomsWeakStream',
    },
    {
      label: 'How often have you had to push or strain to begin urinating?',
      key: 'urinarySymptomsStraining',
    },
    {
      label:
        'From the time you go to bed at night until the time you rise in the morning, how many times do you need to get up to urinate?',
      key: 'urinarySymptomsNocturia',
    },
  ]

  const frequencyOptions = [
    'never',
    'One out of every 5 times',
    'One out of every 3 times',
    'One out of every 2 times',
    '2 out of every 3 times',
    'Almost every time',
  ]

  // Map frequency options to score values
  const frequencyOptionsToScoreMap: Record<string, string> = {
    never: 'never',
    'One out of every 5 times': 'about 1 time in 5',
    'One out of every 3 times': 'about 1 time in 3',
    'One out of every 2 times': 'about 1 time in 2',
    '2 out of every 3 times': 'about 2 times in 3',
    'Almost every time': 'almost always',
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Prostate Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Estimates risk of prostate cancer and likelihood of aggressive disease
      </Text>

      <div className="space-y-6">
        {/* PSA Level Display */}
        {hasPsaLevel && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <Text
              as="h3"
              variant="text/sm"
              className="font-medium mb-2 text-blue-800"
            >
              PSA Level Available
            </Text>
            <Text variant="text/sm" className="text-blue-700 mb-3">
              PSA level of <strong>{psaLevel} ng/mL</strong> has been provided.
              The risk assessment will use PSA-based calculations instead of
              symptom-based assessment.
            </Text>
            <div className="flex items-center space-x-2">
              <BadgeField
                variant="success"
                value={`PSA: ${psaLevel} ng/mL`}
                className="text-xs"
              />
            </div>
          </div>
        )}

        {/* Urinary Symptoms - Only show when PSA level is not available */}
        {!hasPsaLevel && (
          <div>
            <Text as="h3" variant="text/sm" className="font-medium mb-4">
              Urinary Symptoms over the past Month
            </Text>
            <Text variant="text/sm" className="text-gray-600 mb-4">
              In the past 1 month, have you:
            </Text>

            <div className="overflow-x-auto">
              <div className="min-w-[500px]">
                <table className="table-auto w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-100 text-sm">
                      <th className="border border-gray-300 px-4 py-2 text-left min-w-[300px]">
                        Symptom
                      </th>
                      {frequencyOptions.map((option) => (
                        <th
                          key={option}
                          className="border border-gray-300 px-4 py-2 text-center min-w-[120px] text-xs"
                        >
                          {option}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {urinarySymptoms.map((symptom) => (
                      <tr
                        key={symptom.key}
                        className="odd:bg-white even:bg-gray-50"
                      >
                        <td className="border border-gray-300 px-4 py-2 text-sm">
                          {symptom.label}
                        </td>
                        {frequencyOptions.map((value) => (
                          <td
                            key={symptom.key + '_' + value}
                            className="border border-gray-300 px-4 py-2 text-center relative"
                          >
                            <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                              <span className="w-full h-full flex items-center justify-center">
                                <input
                                  {...customRegister(
                                    `prostateCancer.${symptom.key}`
                                  )}
                                  value={frequencyOptionsToScoreMap[value]}
                                  type="radio"
                                  title={symptom.key}
                                />
                              </span>
                            </label>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext} type="button">
          Save & continue
        </Button>
      </div>
    </div>
  )
}
