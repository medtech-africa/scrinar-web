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

const FoodGroupFrequency = () => {
  const { register: customRegister } = useFormContext()

  const foodHabits = [
    {
      label:
        'In a typical week, on how many days do you give your child “beans, nuts, meat, fish or milk products”?',
      key: 'protein_sources_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you give your child “a variety of foods from different food groups” (e.g. 4-star diet, 3 food groups)”',
      key: 'varied_diet_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you give your child “green leafy vegetables”?',
      key: 'green_leafy_vegetables_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you give your child snacks like buns, doughnut, sausage, biscuits, etc?',
      key: 'unhealthy_snacks_frequency',
    },
    {
      label:
        'In a typical week, on how many days do you give your child sugary beverages like coke, fanta etc?',
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
              How many cups of vegetables do you give your child on one of those
              days? (one cup is about the size of an adult’s closed fist)
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

export const ParentNutritionSurvey = ({ isFemale = false }) => {
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

          <PageCard title="Decision making around food">
            <OptionsWithOthersField
              label="Who provides money for family meals?"
              options={[
                'Myself',
                'My husband',
                'Both my husband and I equally',
                'Extended family members (e.g., grandparents, uncles, aunts)',
                'Older children',
                'Government assistance or social programs',
                'Community support or charity organizations',
                'Other (please specify)',
              ]}
              form={{
                id: 'nutrition.providesMoneyForMeals',
              }}
            />

            <OptionsWithOthersField
              label="Who in the household decides how much is spent on fruits and vegetables?"
              options={[
                'Myself',
                'My husband',
                'Both my husband and I equally',
                'Extended family members (e.g., grandparents, uncles, aunts)',
                'Older children',
                'Community support or charity organizations',
                'Other (please specify)',
              ]}
              form={{
                id: 'nutrition.decidesMoneyOnFruits',
              }}
            />

            <OptionsWithOthersField
              label="Who decides daily meals for the family?"
              options={[
                'Myself',
                'My husband',
                'Both myself and my husband together',
                'Parents (inlaws)',
                'Parents (my own)',
                'Other (please specify)',
                'Not sure',
              ]}
              form={{
                id: 'nutrition.decidesMealsForFamily',
              }}
            />
          </PageCard>

          {isFemale && (
            <>
              <PageCard title="Food preparation in the home">
                <Input
                  {...customRegister('riskyBehavior.noOfDailyMeals')}
                  label="How many meals do you make for your family daily?"
                  type="number"
                />

                <OptionsWithOthersField
                  label="How do you determine the Quantity of salt to use when cooking?"
                  options={[
                    'Gradual adding of salt to taste',
                    'Use of bare-hands to add salt',
                    'Use of visual measure to gauge the added salt',
                    'Use of measuring spoon to add salt',
                    'Other (please specify)',
                  ]}
                  form={{
                    id: 'nutrition.saltQuantityDetermination',
                  }}
                />

                <OptionsWithOthersField
                  label="Which of these do you use when cooking"
                  options={[
                    'Salt only',
                    'Seasoning cubes/powder only',
                    'Natural Spices only (eg crayfish, locust beans)',
                    'Salt combined with seasoning cubes/powder',
                    'Salt combined with Natural spices',
                    'Seasoning cubes/powder combined with Natural spices',
                    'Natural spice, salt and seasoning cubes',
                    'Other (please specify)',
                  ]}
                  form={{
                    id: 'nutrition.thingsUsedWhenCooking',
                  }}
                />

                <OptionsWithOthersField
                  label="How often does your family eat fried foods (eg fried egg, fried plantain) or oily foods (eg stew with plenty oil)"
                  options={[
                    'Every meal',
                    'Almost every meal',
                    'Almost every day (not necessarily in every meal)',
                    '4 or 5 days a week',
                    '2 or 3 days a week',
                    'Occasionally',
                    'Not at all',
                  ]}
                  form={{
                    id: 'nutrition.friedFood',
                  }}
                />

                <OptionsWithOthersField
                  label="What source of fuel do you most often use for cooking?"
                  options={[
                    'Firewood',
                    'Charcoal',
                    'Kerosene',
                    'Cooking Gas',
                    'Electricity eg electric cooker',
                    'Biomass (e.g., crop waste, animal dung)',
                    'Other (please specify)',
                  ]}
                  form={{
                    id: 'nutrition.sourceOfFuel',
                  }}
                />

                <OptionsWithOthersField
                  label="What do you consider when making meals for your family?"
                  options={[
                    'Cost',
                    'Ease of preparation',
                    "My husband's preferences",
                    "My children's preferences",
                    'Health reasons',
                    'Other (please specify)',
                  ]}
                  form={{
                    id: 'nutrition.considerationBeforeMeals',
                  }}
                />
              </PageCard>

              <PageCard title="Breakfast/Lunch Patterns">
                <OptionsWithOthersField
                  label="How often do you give your child breakfast in the morning?"
                  options={[
                    'Everyday',
                    'Almost every day',
                    '4 or 5 days a week',
                    '2 or 3 days a week',
                    'Occasionally',
                    'Not at all',
                  ]}
                  form={{
                    id: 'nutrition.childBreakfast',
                  }}
                />

                <OptionsWithOthersField
                  label="If you don’t give them breakfast every morning, why?"
                  options={[
                    'Lack of time',
                    "Child doesn't want to eat in the morning",
                    'Financial reasons',
                    'Limited food availability',
                    'Other (please specify)',
                  ]}
                  form={{
                    id: 'nutrition.noChildBreakfast',
                  }}
                />

                <OptionsWithOthersField
                  label="How do you provide lunch to your JSS children (choose all that you do)"
                  options={[
                    'I give them home cooked food to take to school',
                    'I give them money to buy lunch at school',
                    'I buy lunch from a vendor or nearby shop for them',
                    'I involve them in choosing their lunch options',
                    "I don't provide lunch",
                    'Other (please specify)',
                  ]}
                  form={{
                    id: 'nutrition.childLunch',
                  }}
                />
              </PageCard>
            </>
          )}
        </div>
      </PageCard>
      <PageCard
        title="Knowledge of Food Groups and their functions"
        bodyStyle="px-4"
      >
        <NutritionalBenefitsForm />
      </PageCard>

      <PageCard title="Food group frequency" bodyStyle="px-4">
        <FoodGroupFrequency />
      </PageCard>
    </div>
  )
}
