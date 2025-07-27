import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useNcdFilter } from './NcdFilterContext'

type Props = {
  onNext: () => void
}

export const ProstateCancerAssessmentForm = ({ onNext }: Props) => {
  const { register: customRegister } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()

  // Only show this form for Prostate Cancer
  if (!hasNcdSelected('prostateCancer')) {
    return null
  }

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

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Prostate Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Estimates risk of prostate cancer and likelihood of aggressive disease
      </Text>

      <div className="space-y-6">
        {/* Family History */}
        {/* <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Family History
          </Text>
          <div className="space-y-2">
            <Text variant="text/sm" className="text-gray-600 mb-4">
              Did any of your close family members (brother, father or uncle on
              your father&apos;s or mother&apos;s side) suffer from prostate
              cancer now or in the past? *
            </Text>
            {['No', 'Yes'].map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  {...customRegister('prostateCancer.familyHistory')}
                  type="radio"
                  value={option}
                />
                <Text variant="text/sm">{option}</Text>
              </label>
            ))}
          </div>
        </div> */}

        {/* Urinary Symptoms */}
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
                                value={value}
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
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext} type="button">
          Save & continue
        </Button>
      </div>
    </div>
  )
}
