import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import CardiacAssessmentForm from './CardiacAssessmentForm'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'

type Props = {
  onNext: () => void
}

export const FamilyHistoryLifestyleForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()

  return (
    <div title="Family History & Lifestyle">
      <Text as="h2" className="font-medium mb-2">
        Lifestyle/Behavioral Factors
      </Text>
      <Text variant="text/xs" className="text-gray-500 mb-6 md:mb-8">
        Family History of NCDs (History of NCDs in First Degree relatives eg
        mother, father, brother or sister.)
      </Text>

      <div className="space-y-6">
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-6 md:mb-8">
            Lifestyle & Habits
          </Text>
          <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {/* Tobacco Use */}
            <OptionWithRadioField
              label="Do you currently smoke or use any tobacco products?"
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.tobacco.currentlyUses' }}
            />
            {watch('lifestyle.tobacco.currentlyUses') === 'Yes' && (
              <Controller
                name="lifestyle.tobacco.dailyUnits"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter number of cigarettes/units daily"
                    label="If yes, how many cigarettes or units daily?"
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />
            )}
            <OptionWithRadioField
              label="Have you quit smoking in the past?"
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.tobacco.quit' }}
            />

            {/* Alcohol Consumption */}
            <OptionWithRadioField
              label="Do you consume alcohol?"
              options={[
                'Never',
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.alcohol.usage' }}
            />
            {['Occasionally', 'Frequently', 'Regularly'].includes(
              watch('lifestyle.alcohol.usage')
            ) && (
              <>
                <Controller
                  name="lifestyle.alcohol.daysPerWeek"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter number of days per week"
                      label="If yes, how many days per week?"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
                <Controller
                  name="lifestyle.alcohol.drinksPerDay"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter average number of drinks per day"
                      label="Average number of drinks per day"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
              </>
            )}

            {/* Diet and Nutrition */}
            <OptionWithRadioField
              label="Do you consume processed foods (e.g., Corn-beef)?"
              options={[
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.diet.processedFoods' }}
            />
            <OptionWithRadioField
              label="Do you add salt to your food at the table?"
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.diet.addSalt' }}
            />
            <OptionWithRadioField
              label="How many servings of fruits and vegetables do you consume daily? (a serving is about the size of an adult’s closed fist)"
              options={['None', '1-2 servings', '3-4 servings', '5+ servings']}
              form={{ id: 'lifestyle.diet.fruitVegServings' }}
            />

            {/* Physical Activity */}
            <OptionWithRadioField
              label="Do you engage in physical activity?"
              options={[
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.physicalActivity.engages' }}
            />
            {watch('lifestyle.physicalActivity.engages') === 'Yes' && (
              <>
                <Controller
                  name="lifestyle.physicalActivity.type"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter type of activity (e.g., walking, gym, sports)"
                      label="If yes, what type?"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
                <Controller
                  name="lifestyle.physicalActivity.duration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter duration in minutes/day"
                      label="Duration (minutes/day)"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
                <Controller
                  name="lifestyle.physicalActivity.frequency"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter frequency in days/week"
                      label="Frequency (days/week)"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
              </>
            )}
          </div>
        </div>

        <CardiacAssessmentForm />
      </div>

      <div className="flex justify-end mt-6">
        <Button
          variant="primary"
          className="bg-red-600 hover:bg-red-700 text-white px-8"
          onClick={onNext}
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
