import React, { useEffect, useMemo } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { messageCheck, variantValidityCheck } from './utils'
import { BadgeField } from '@/components/ui/badge'

type Props = {
  onNext: () => void
  disabled?: boolean
}

export const COPDAssessmentForm = ({ onNext, disabled }: Props) => {
  const {
    register: customRegister,
    watch,
    control,
    setValue,
  } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()

  const readings = [
    watch('vitals.pefReading1'),
    watch('vitals.pefReading2'),
    watch('vitals.pefReading3'),
  ]
    .filter(Boolean)
    .map(Number)

  const bestReading = useMemo(
    () => (readings.length > 0 ? Math.max(...readings) : 0),
    [readings]
  )

  useEffect(() => {
    setValue('copd.pefLevel', bestReading, { shouldValidate: true })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bestReading])

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

        <div className="mt-4">
          <Text as="h3" variant="text/sm" className="font-medium mb-2">
            Peak Expiratory Flow (PEF) - Best of 3 Readings
          </Text>
          <Text variant="text/sm" className="text-gray-500 mb-3">
            The best out of 3 readings is recorded
          </Text>

          <div className="space-y-3">
            {[1, 2, 3].map((reading) => (
              <div key={reading} className="flex items-center gap-3">
                <Text variant="text/sm" className="w-8">
                  {reading}.
                </Text>
                <Controller
                  name={`vitals.pefReading${reading}`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter PEF reading"
                      label={`Reading ${reading} (L/min)`}
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                      type="number"
                      min="0"
                      max="1000"
                      disabled={disabled}
                      className="flex-1"
                    />
                  )}
                />
              </div>
            ))}

            {/* Best PEF Result */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between">
                <Text variant="text/sm" className="font-medium">
                  Best PEF Result:
                </Text>
                <div className="flex items-center gap-2">
                  <Text
                    variant="display/sm"
                    weight="bold"
                    className="text-gray-700"
                  >
                    {(() => {
                      const gender = watch('personalInfo.gender')?.toLowerCase()

                      if (readings.length === 0) return '-'

                      return (
                        <div className="flex items-center gap-2">
                          <span>{bestReading} L/min</span>
                          {bestReading > 0 && (
                            <BadgeField
                              variant={
                                gender === 'female'
                                  ? bestReading >= 250
                                    ? 'success'
                                    : 'error'
                                  : gender === 'male'
                                    ? bestReading >= 350
                                      ? 'success'
                                      : 'error'
                                    : undefined
                              }
                              value={
                                gender === 'female'
                                  ? bestReading >= 250
                                    ? 'Normal'
                                    : 'Below Normal'
                                  : gender === 'male'
                                    ? bestReading >= 350
                                      ? 'Normal'
                                      : 'Below Normal'
                                    : undefined
                              }
                            />
                          )}
                        </div>
                      )
                    })()}
                  </Text>
                </div>
              </div>
              <Text variant="text/xs" className="text-gray-600 mt-2">
                Normal levels: Females ≥ 250 L/min, Males ≥ 350 L/min
              </Text>
            </div>
          </div>
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
