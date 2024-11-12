import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'

const NutritionalBenefitsForm = () => {
  const { register: customRegister } = useFormContext()

  const foodGroups = [
    { label: 'Cereals (e.g., maize, rice, sorghums)', key: 'cereals' },
    { label: 'Roots (e.g., yam, cassava, potatoes)', key: 'roots' },
    { label: 'Beans & nuts', key: 'beans_nuts' },
    { label: 'Meat, fish, egg & milk products', key: 'meat_fish' },
    { label: 'Vegetables', key: 'vegetables' },
    { label: 'Fruits', key: 'fruits' },
  ]

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200 text-sm">
            <th className="border border-gray-300 px-4 py-2">Food Group</th>
            <th className="border border-gray-300 px-4 py-2">
              Give you energy (energy-giving foods)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Help your muscles and bones grow (body-building foods)
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Protect your body from diseases and illness (protective foods)
            </th>
            <th className="border border-gray-300 px-4 py-2">Not sure</th>
          </tr>
        </thead>
        <tbody>
          {foodGroups.map((group) => (
            <tr key={group.key} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {group.label}
              </td>
              {['energy', 'body_building', 'protective', 'not_sure'].map(
                (value) => (
                  <td
                    key={group.key + '_' + value}
                    className="border border-gray-300 px-4 py-2 text-center relative"
                  >
                    <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                      <span className="w-full h-full flex items-center justify-center">
                        <input
                          {...customRegister(
                            `nutrition.foodKnowledge.${group.key}`
                          )}
                          value={value}
                          type="radio"
                          title={group.key}
                          // className="sr-only" // Hide the radio button visually
                        />
                      </span>
                    </label>
                  </td>
                )
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export const ParentNutritionSurvey = () => {
  const { register: customRegister, setValue, watch } = useFormContext()

  return (
    <div className="space-y-4">
      <PageCard title="Nutrition" bodyStyle="px-4">
        <div className="grid md:grid-cols-[repeat(auto-fill,_minmax(320px,_1fr))] grid-cols-1 gap-6">
          <Select
            {...customRegister('nutrition.awareImportanceOfFoodVariety')}
            label="Do you know that taking “a diet with a variety of foods from different food groups” is important for your health?"
            options={convertStringsToOptionArray(['Yes', 'No', 'Not sure'])}
            value={{
              value: watch('nutrition.awareImportanceOfFoodVariety'),
              label: watch('nutrition.awareImportanceOfFoodVariety'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('nutrition.awareImportanceOfFoodVariety', value)
            }}
          />
          <Select
            {...customRegister('nutrition.awareFoodHasDiffBenefits')}
            label="Do you know that food has 3 different nutritional benefits?"
            options={convertStringsToOptionArray(['Yes', 'No', 'Not sure'])}
            value={{
              value: watch('nutrition.awareFoodHasDiffBenefits'),
              label: watch('nutrition.awareFoodHasDiffBenefits'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('nutrition.awareFoodHasDiffBenefits', value)
            }}
          />

          {watch('nutrition.awareFoodHasDiffBenefits') === 'Yes' && (
            <>
              <Select
                {...customRegister('nutrition.foodBenefits')}
                label="Can you mention any of them?"
                options={convertStringsToOptionArray([])}
                isMulti
                isCreatable
                value={convertStringsToOptionArray(
                  watch('nutrition.foodBenefits')
                )}
                onChange={(selectedOption: any) => {
                  const value = selectedOption?.map(
                    (option: { value: string }) => option.value
                  )
                  setValue('nutrition.foodBenefits', value)
                }}
              />
            </>
          )}

          <OptionsWithOthersField
            label="What do you think can happen if your child eats a lot of sweets and candies?"
            options={[
              'It can cause tooth decay and make you gain weight',
              'It makes you grow taller',
              'It gives you more energy for school',
              'I don’t know',
              'Other (please specify)',
            ]}
            form={{
              id: 'nutrition.effectsOfTooMuchSweets',
            }}
          />

          <OptionsWithOthersField
            label="What do you think can happen if your child eat a lot of salty food or food with a lot of oil?"
            options={[
              'It can make your heart and body unhealthy',
              'It helps you run faster',
              'It gives you stronger bones',
              'I don’t know',
              'Other (please specify)',
            ]}
            form={{
              id: 'nutrition.effectsOfTooMuchSaltAndOil',
            }}
          />

          <Select
            {...customRegister('nutrition.necessityForHealthChildDiet')}
            label="Do you think it is necessary to make your child’s diet healthier?"
            options={convertStringsToOptionArray([
              "Yes it's necessary",
              'Not necessary',
            ])}
            value={{
              value: watch('nutrition.necessityForHealthChildDiet'),
              label: watch('nutrition.necessityForHealthChildDiet'),
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.value
              setValue('nutrition.necessityForHealthChildDiet', value)
            }}
          />

          {watch('nutrition.necessityForHealthChildDiet') ===
            "Yes it's necessary" && (
            <>
              <OptionsWithOthersField
                label="What do you think you could change in your child’s diet to make it healthier?"
                options={[
                  'Eat more fruits',
                  'Eat more vegetables',
                  'Drinking water instead of sugary drinks',
                  'Eat less junk food like chips and candy',
                  'No change',
                  'Other (please specify)',
                ]}
                form={{
                  id: 'nutrition.changeInDietToBeHealthy',
                }}
              />
            </>
          )}
          {watch('nutrition.necessityForHealthChildDiet') ===
            'Not necessary' && (
            <>
              <Input
                {...customRegister(
                  'nutrition.whyNotNecessityForHealthChildDiet'
                )}
                label="If you answered no, why do you think it's not necessary?"
              />
            </>
          )}

          <Input
            {...customRegister('nutrition.numberDailyMeals')}
            label="How many meals do you eat daily?"
            type="number"
          />

          <Input
            {...customRegister('nutrition.reasonChangeImpactHealth')}
            label="Why do you feel that change would help you stay healthy?"
          />
        </div>
      </PageCard>
      <PageCard
        title="Knowledge of Food Groups and their functions"
        bodyStyle="px-4"
      >
        <NutritionalBenefitsForm />
      </PageCard>
    </div>
  )
}
