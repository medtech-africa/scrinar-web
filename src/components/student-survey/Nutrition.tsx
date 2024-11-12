import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import React from 'react'
import { useCustomRegister } from '@/hooks/useCustomRegister'
import { OptionsWithOthersField } from './OptionWithOthersField'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

const NutritionalBenefitsForm = (props: StudentNutritionSurveyProps) => {
  const { customRegister } = useCustomRegister(props.studentId)

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

const MealFrequency = (props: StudentNutritionSurveyProps) => {
  const { customRegister } = useCustomRegister(props.studentId)

  const foodGroups = [
    {
      label:
        'In a typical week, how often do you eat breakfast in the morning?',
      key: 'breakfast_frequency',
    },
    {
      label: 'When you eat breakfast, what time do you usually eat it?',
      key: 'breakfast_time',
      isFullWidth: true,
    },
    {
      label: 'If you do not eat breakfast every morning, why?',
      key: 'breakfast_skipped_reason',
      isFullWidth: true,
    },
    {
      label: 'In a typical week, how often do you eat lunch?',
      key: 'lunch_frequency',
    },
    {
      label: 'In a typical week, how often do you eat dinner?',
      key: 'dinner_frequency',
    },
  ]

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200 text-sm">
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">Everyday</th>
            <th className="border border-gray-300 px-4 py-2">
              Almost every day
            </th>
            <th className="border border-gray-300 px-4 py-2">
              4 or 5 days a week
            </th>
            <th className="border border-gray-300 px-4 py-2">
              2 or 3 days a week
            </th>
            <th className="border border-gray-300 px-4 py-2">Occasionally</th>
            <th className="border border-gray-300 px-4 py-2">Not at all</th>
          </tr>
        </thead>
        <tbody>
          {foodGroups.map((group) => (
            <tr key={group.key} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {group.label}
              </td>
              {(group.isFullWidth
                ? ['']
                : [
                    'everyday',
                    'almost_every_day',
                    'four_or_five_days_a_week',
                    'two_or_three_days_a_week',
                    'occasionally',
                    'not_at_all',
                  ]
              ).map((value) => (
                <td
                  key={group.key + '_' + value}
                  className="border border-gray-300 px-4 py-2 text-center relative"
                  colSpan={group.isFullWidth ? 6 : 1}
                >
                  {group.isFullWidth ? (
                    <div className="w-full h-full flex items-center justify-center">
                      <Input
                        {...customRegister(
                          `nutrition.mealFrequency.${group.key}`
                        )}
                        type={'text'}
                        title={group.key}
                        className="w-full"
                      />
                    </div>
                  ) : (
                    <label
                      className={cn(
                        'absolute inset-0 flex items-center justify-center cursor-pointer'
                      )}
                    >
                      <span className="w-full h-full flex items-center justify-center">
                        <Input
                          {...customRegister(
                            `nutrition.mealFrequency.${group.key}`
                          )}
                          value={value}
                          type={'radio'}
                          title={group.key}
                          // className="sr-only" // Hide the radio button visually
                        />
                      </span>
                    </label>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const FoodGroupFrequency = (props: StudentNutritionSurveyProps) => {
  const { customRegister } = useCustomRegister(props.studentId)

  const foodHabits = [
    {
      label:
        'In a typical week, on how many days do you eat “beans, nuts, meat, fish or milk products”?',
      key: 'protein_sources_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you eat “a variety of foods from different food groups” (e.g. 4-star diet, 3 food groups)”?',
      key: 'varied_diet_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you eat “green leafy vegetables”?',
      key: 'green_leafy_vegetables_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you consume snacks like buns, doughnut, sausage, biscuits, etc?',
      key: 'unhealthy_snacks_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you drink sugary beverages like coke, fanta etc?',
      key: 'sugary_drinks_frequency',
    },
  ]

  return (
    <div className="p-4">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-blue-200 text-sm">
            <th className="border border-gray-300 px-4 py-2"></th>
            <th className="border border-gray-300 px-4 py-2">
              Almost every meal
            </th>
            <th className="border border-gray-300 px-4 py-2">
              Almost every day
            </th>
            <th className="border border-gray-300 px-4 py-2">
              4 or 5 days a week
            </th>
            <th className="border border-gray-300 px-4 py-2">
              2 or 3 days a week
            </th>
            <th className="border border-gray-300 px-4 py-2">Occasionally</th>
            <th className="border border-gray-300 px-4 py-2">Not at all</th>
          </tr>
        </thead>
        <tbody>
          {foodHabits.map((group) => (
            <tr key={group.key} className="odd:bg-white even:bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                {group.label}
              </td>
              {[
                'almost_every_meal',
                'almost_every_day',
                'four_or_five_days_a_week',
                'two_or_three_days_a_week',
                'occasionally',
                'not_at_all',
              ].map((value) => (
                <td
                  key={group.key + '_' + value}
                  className="border border-gray-300 px-4 py-2 text-center relative"
                >
                  <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                    <span className="w-full h-full flex items-center justify-center">
                      <input
                        {...customRegister(
                          `nutrition.foodGroupFrequency.${group.key}`
                        )}
                        value={value}
                        type={'radio'}
                        title={group.key}
                        // className="sr-only" // Hide the radio button visually
                      />
                    </span>
                  </label>
                </td>
              ))}
            </tr>
          ))}
          <tr className="odd:bg-white even:bg-gray-100">
            <td className="border border-gray-300 px-4 py-2">
              How many cups of vegetables do you eat on one of those days? (one
              cup is about the size of an adult’s closed fist)
            </td>
            {['1', '2', '3', '4', '5', 'More than 5'].map((value) => (
              <td
                className="border border-gray-300 px-4 py-2 text-center relative"
                key={`vegetable_portion_size_${value}`}
              >
                <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                  <p className="w-full h-full flex flex-col items-center justify-center">
                    <input
                      {...customRegister(
                        `nutrition.foodGroupFrequency.vegetable_portion_size`
                      )}
                      value={value}
                      type={'radio'}
                      // className="sr-only" // Hide the radio button visually
                    />
                    <span>{value}</span>
                  </p>
                </label>
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  )
}

type StudentNutritionSurveyProps = {
  studentId: string
}

export const StudentNutritionSurvey = ({
  studentId,
}: StudentNutritionSurveyProps) => {
  const { customRegister, setValue, watch } = useCustomRegister(studentId)

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
            label="What do you think can happen if you eat a lot of sweets and candies?"
            options={[
              'It can cause tooth decay and make you gain weight',
              'It makes you grow taller',
              'It gives you more energy for school',
              'I don’t know',
              'Other (please specify)',
            ]}
            studentId={studentId}
            form={{
              id: 'nutrition.effectsOfTooMuchSweets',
            }}
          />

          <OptionsWithOthersField
            label="What do you think can happen if you eat a lot of salty food or food with a lot of oil?"
            options={[
              'It can make your heart and body unhealthy',
              'It helps you run faster',
              'It gives you stronger bones',
              'I don’t know',
              'Other (please specify)',
            ]}
            studentId={studentId}
            form={{
              id: 'nutrition.effectsOfTooMuchSaltAndOil',
            }}
          />

          <OptionsWithOthersField
            label="What do you think you could change in your diet to make it healthier?"
            options={[
              'Eat more fruits',
              'Eat more vegetables',
              'Drinking water instead of sugary drinks',
              'Eat less junk food like chips and candy',
              'No change',
              'Other (please specify)',
            ]}
            studentId={studentId}
            form={{
              id: 'nutrition.changeInDietToBeHealthy',
            }}
          />

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
        <NutritionalBenefitsForm studentId={studentId} />
      </PageCard>
      <PageCard title="Meal frequency " bodyStyle="px-4">
        <MealFrequency studentId={studentId} />
      </PageCard>
      <PageCard title="Food group frequency " bodyStyle="px-4">
        <FoodGroupFrequency studentId={studentId} />
        <Select
          {...customRegister('nutrition.foodGroupFrequency.snack_source')}
          label="How do you get the  snacks or sugary drinks that you take? multiple choice allowed)"
          options={convertStringsToOptionArray([
            'I buy it by myself at school',
            'My parents/guardian give me at home',
            'My parents/guardian give me money to buy it',
          ])}
          isMulti
          isCreatable
          value={
            watch('nutrition.foodGroupFrequency.snack_source')
              ? convertStringsToOptionArray(
                  watch('nutrition.foodGroupFrequency.snack_source')
                )
              : []
          }
          onChange={(selectedOption: any) => {
            const value = selectedOption?.map(
              (option: { value: string }) => option.value
            )
            setValue('nutrition.foodGroupFrequency.snack_source', value)
          }}
        />
      </PageCard>
    </div>
  )
}
