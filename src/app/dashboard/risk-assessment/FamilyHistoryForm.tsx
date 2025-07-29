import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useRiskAssessmentStorage } from '@/hooks/useRiskAssessmentStorage'
import { slugify } from '@/utils/slugify'

type Props = {
  onNext: () => void
}

export const FamilyHistoryForm = ({ onNext }: Props) => {
  const { register: customRegister, setValue, watch } = useFormContext()
  const formData = watch()
  const storeRiskAssessment = useRiskAssessmentStorage((store) => store.store)
  const [others, setOthers] = useState<Record<string, string | null>>({})

  useEffect(() => {
    storeRiskAssessment(
      slugify(formData.personalInfo.fullName + formData.personalInfo.gender),
      formData
    )
  }, [formData, storeRiskAssessment])

  useEffect(() => {
    Object.entries(others).forEach(([key, value]) => {
      if (value) {
        setValue(`familyHistory.${key}`, value)
      }
    })
  }, [others])

  const medicalConditions = [
    {
      label:
        'Cardiovascular disease eg stroke, heart disease, other vascular disease',
      key: 'cvd',
    },
    {
      label: 'Diabetes',
      key: 'diabetes',
    },
    {
      label: 'Hypertension',
      key: 'hypertension',
    },
    {
      label: 'Breast Cancer',
      key: 'breastCancer',
    },
    {
      label: 'Ovarian Cancer',
      key: 'ovarianCancer',
    },
    {
      label: 'Prostate cancer',
      key: 'prostateCancer',
    },
    {
      label: 'Colorectal cancer',
      key: 'colorectalCancer',
    },
    {
      label: 'Other NCDs eg Asthma',
      key: 'otherNcds',
    },
  ]

  return (
    <div title="Family History & Lifestyle">
      <Text as="h2" className="font-medium mb-2">
        Family History
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-4">
        In this section, &apos;family history&apos; refers to your first-degree
        relatives, that is, your biological parents, siblings, and children.
        These are the family members who share up to 50% of their genes with
        you.
      </Text>

      {/* Clear Instructions */}
      {/* <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Text variant="text/sm" className="text-blue-800 font-medium mb-2">
          📋 Instructions for Data Collection
        </Text>
        <Text variant="text/sm" className="text-blue-700">
          Please ask patient or caregiver about each of the following symptoms
          or conditions. If the patient is unsure about any family history,
          select &quot;Don&apos;t Know&quot; rather than guessing
        </Text>
      </div> */}

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-blue-200 text-sm">
                <th className="border border-gray-300 px-4 py-2 text-left min-w-[300px]">
                  Medical Condition
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center min-w-[80px]">
                  None
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center min-w-[80px]">
                  Mother
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center min-w-[80px]">
                  Father
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center min-w-[120px]">
                  Brother/Sister (Full Sibling)
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center min-w-[80px]">
                  Children
                </th>
                <th className="border border-gray-300 px-4 py-2 text-center min-w-[150px]">
                  Other (Write the relative)
                </th>
              </tr>
            </thead>
            <tbody>
              {medicalConditions.map((condition) => (
                <tr
                  key={condition.key}
                  className="odd:bg-white even:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2 text-sm">
                    {condition.label}
                  </td>
                  {['none', 'mother', 'father', 'sibling', 'children'].map(
                    (value) => (
                      <td
                        key={condition.key + '_' + value}
                        className="border border-gray-300 px-4 py-2 text-center relative"
                      >
                        <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                          <span className="w-full h-full flex items-center justify-center">
                            <input
                              {...customRegister(
                                `familyHistory.${condition.key}`
                              )}
                              value={value}
                              onChange={(e) => {
                                setOthers((prev) => ({
                                  ...prev,
                                  [condition.key]: null,
                                }))
                                const value = e.target.value
                                if (value) {
                                  setValue(
                                    `familyHistory.${condition.key}`,
                                    value
                                  )
                                }
                              }}
                              type="radio"
                              title={condition.key}
                            />
                          </span>
                        </label>
                      </td>
                    )
                  )}
                  <td className="border border-gray-300 px-4 py-2">
                    <Input
                      onChange={(e) => {
                        const value = e.target.value
                        setOthers((prev) => ({
                          ...prev,
                          [condition.key]: value,
                        }))
                      }}
                      value={others[condition.key] ?? ''}
                      placeholder="Specify relative"
                    />
                  </td>
                </tr>
              ))}
              {/* Additional NCDs section */}
              {/* <tr className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  NCD 1
                </td>
                {['none', 'mother', 'father', 'sibling', 'children'].map(
                  (value) => (
                    <td
                      key={'ncd1_' + value}
                      className="border border-gray-300 px-4 py-2 text-center relative"
                    >
                      <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <span className="w-full h-full flex items-center justify-center">
                          <input
                            {...customRegister('familyHistory.ncd1')}
                            value={value}
                            onChange={(e) => {
                              const isChecked = e.target.value
                              const value = e.target.value
                              if (isChecked) {
                                setValue('familyHistory.ncd1Others', null)
                                setValue('familyHistory.ncd1', value)
                              }
                            }}
                            type="radio"
                            title="ncd1"
                          />
                        </span>
                      </label>
                    </td>
                  )
                )}
                <td className="border border-gray-300 px-4 py-2">
                  <Input
                    {...customRegister('familyHistory.ncd1Others')}
                    onChange={(e) => {
                      const value = e.target.value
                      setValue('familyHistory.ncd1Others', value)
                      setValue('familyHistory.ncd1', null)
                    }}
                    placeholder="Specify relative"
                  />
                </td>
              </tr>
              <tr className="odd:bg-white even:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2 text-sm">
                  NCD 2, etc
                </td>
                {['none', 'mother', 'father', 'sibling', 'children'].map(
                  (value) => (
                    <td
                      key={'ncd2_' + value}
                      className="border border-gray-300 px-4 py-2 text-center relative"
                    >
                      <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                        <span className="w-full h-full flex items-center justify-center">
                          <input
                            {...customRegister('familyHistory.ncd2')}
                            value={value}
                            onChange={(e) => {
                              const isChecked = e.target.value
                              const value = e.target.value
                              if (isChecked) {
                                setValue('familyHistory.ncd2Others', null)
                                setValue('familyHistory.ncd2', value)
                              }
                            }}
                            type="radio"
                            title="ncd2"
                          />
                        </span>
                      </label>
                    </td>
                  )
                )}
                <td className="border border-gray-300 px-4 py-2">
                  <Input
                    {...customRegister('familyHistory.ncd2Others')}
                    onChange={(e) => {
                      const value = e.target.value
                      setValue('familyHistory.ncd2Others', value)
                      setValue('familyHistory.ncd2', null)
                    }}
                    placeholder="Specify relative"
                  />
                </td>
              </tr> */}
            </tbody>
          </table>
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
