import { PageCard } from '@/components/ui/page-card'
import React from 'react'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'

const NutritionalBenefitsForm = () => {
  const { register: customRegister, setValue } = useFormContext()

  const foodGroups = [
    {
      label: 'Who is primarily responsible for farming in your household',
      key: 'farming_responsibility',
    },
    {
      label: 'Who is primarily responsible for providing the family income',
      key: 'income_responsibility',
    },
    {
      label:
        'Who is primarily responsible for cooking meals in your household?',
      key: 'cooking_responsibility',
    },
    {
      label:
        'Who is responsible for washing dishes and cleaning up after meals?',
      key: 'cleaning_responsibility',
    },
    {
      label:
        'Who is primarily responsible for childcare (e.g., feeding, bathing, helping with schoolwork)?',
      key: 'childcare_responsibility',
    },
    {
      label:
        'Who is primarily responsible for collecting water for the household?',
      key: 'water_collection_responsibility',
    },
    {
      label:
        'Who is responsible for collecting firewood or other fuels for cooking?',
      key: 'fuel_collection_responsibility',
    },
    {
      label:
        'Who is responsible for purchasing household items (e.g., food stuffs, clothes, other supplies)?',
      key: 'purchasing_responsibility',
    },
    {
      label:
        'Who is responsible for selling items (e.g., goods, food, produce) for the household?',
      key: 'selling_responsibility',
    },
    {
      label: 'Who typically handles household budgeting and managing finances?',
      key: 'budgeting_responsibility',
    },
    {
      label:
        'Who takes the lead in making decisions about the children’s education (e.g., school choice, extracurricular activities)?',
      key: 'education_decision_responsibility',
    },
    {
      label:
        'Who is responsible for taking care of the family’s health (e.g., deciding what health facility, ensuring family members take medication)?',
      key: 'healthcare_responsibility',
    },
  ]

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200 text-sm">
            <th className="border border-gray-300 px-4 py-2">Question</th>
            <th className="border border-gray-300 px-4 py-2">Mother</th>
            <th className="border border-gray-300 px-4 py-2">Father</th>
            <th className="border border-gray-300 px-4 py-2">Both (parent)</th>
            <th className="border border-gray-300 px-4 py-2">Son</th>
            <th className="border border-gray-300 px-4 py-2">Daughter</th>
            <th className="border border-gray-300 px-4 py-2">
              Someone Else (Please Specify)
            </th>
          </tr>
        </thead>
        <tbody>
          {foodGroups.map((group) => (
            <tr key={group.key} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2 text-sm">
                {group.label}
              </td>
              {['mother', 'father', 'both_parent', 'son', 'daughter'].map(
                (value) => (
                  <td
                    key={group.key + '_' + value}
                    className="border border-gray-300 px-4 py-2 text-center relative"
                  >
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                      <span className="w-full h-full flex items-center justify-center">
                        <input
                          {...customRegister(
                            `genderHouseholdRole.${group.key}`
                          )}
                          value={value}
                          onChange={(e) => {
                            const isChecked = e.target.value
                            const value = e.target.value
                            if (isChecked) {
                              setValue(
                                `genderHouseholdRole.others.${group.key}`,
                                null
                              )
                              setValue(
                                `genderHouseholdRole.${group.key}`,
                                value
                              )
                            }
                          }}
                          type="radio"
                          title={group.key}
                        />
                      </span>
                    </label>
                  </td>
                )
              )}
              <td className="border border-gray-300 px-4 py-2">
                <Input
                  {...customRegister(`genderHouseholdRole.others.${group.key}`)}
                  onChange={(e) => {
                    const value = e.target.value
                    setValue(`genderHouseholdRole.others.${group.key}`, value)
                    setValue(`genderHouseholdRole.${group.key}`, null)
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const ParentGenderHouseHoldRoles = () => {
  return (
    <div className="space-y-4">
      <PageCard
        title="Knowledge of Food Groups and their functions"
        bodyStyle="px-4"
      >
        <NutritionalBenefitsForm />
      </PageCard>
    </div>
  )
}
