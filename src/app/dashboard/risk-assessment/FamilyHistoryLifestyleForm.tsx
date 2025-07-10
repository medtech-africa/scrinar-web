import { Input } from '@/components/ui/input'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'

type Props = {
  onNext: () => void
}

export const FamilyHistoryLifestyleForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()
  const { selectedNcd } = useNcdFilter()
  const isRequiredField = useRequiredFieldLabel()

  return (
    <div title="Family History & Lifestyle">
      <Text as="h2" className="font-medium mb-2">
        Lifestyle/Behavioral Factors
      </Text>

      <div className="space-y-6">
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-3 md:mb-5">
            Lifestyle & Habits
          </Text>
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            {/* Tobacco Use */}
            <OptionWithRadioField
              label={isRequiredField(
                'Do you currently smoke or use any tobacco products?',
                'lifestyle.tobacco.currentlyUses'
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.tobaccoCurrentlyUses' }}
            />
            {watch('lifestyle.tobaccoCurrentlyUses') === 'Yes' && (
              <Controller
                name="lifestyle.tobaccoDailyUnits"
                control={control}
                rules={{
                  required:
                    selectedNcd === NCD.CVD || selectedNcd === NCD.DIABETES,
                }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter number of cigarettes/units daily"
                    label={isRequiredField(
                      'If yes, how many cigarettes or units daily?',
                      'lifestyle.tobacco.dailyAmount'
                    )}
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />
            )}
            <OptionWithRadioField
              label={isRequiredField(
                'Have you quit smoking in the past?',
                'lifestyle.tobacco.quit'
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.tobaccoQuit' }}
            />

            {/* Alcohol Consumption */}
            <OptionWithRadioField
              label={isRequiredField(
                'Do you consume alcohol?',
                'lifestyle.alcohol.uses'
              )}
              options={[
                'Never',
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.alcoholUsage' }}
            />
            {(watch('lifestyle.alcoholUsage')?.includes('Occasionally') ||
              watch('lifestyle.alcoholUsage')?.includes('Frequently') ||
              watch('lifestyle.alcoholUsage')?.includes('Regularly')) && (
              <>
                <Controller
                  name="lifestyle.alcoholDaysPerWeek"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter number of days per week"
                      label={isRequiredField(
                        'If yes, how many days per week?',
                        'lifestyle.alcohol.daysPerWeek'
                      )}
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
                <Controller
                  name="lifestyle.alcoholDrinksPerDay"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter average number of drinks per day"
                      label={isRequiredField(
                        'Average number of drinks per day',
                        'lifestyle.alcohol.drinksPerDay'
                      )}
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
              </>
            )}

            {/* Diet and Nutrition */}
            <OptionWithRadioField
              label={isRequiredField(
                'Do you consume processed foods (e.g., Corn-beef)?',
                'lifestyle.processedFoods'
              )}
              options={[
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.dietProcessedFoods' }}
            />
            <OptionWithRadioField
              label={isRequiredField(
                'Do you add salt to your food at the table?',
                'lifestyle.saltAtTable'
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.dietAddSalt' }}
            />
            <OptionWithRadioField
              label={isRequiredField(
                "How many servings of fruits and vegetables do you consume daily? (a serving is about the size of an adult's closed fist)",
                'lifestyle.fruitsVegetables'
              )}
              options={['None', '1-2 servings', '3-4 servings', '5+ servings']}
              form={{ id: 'lifestyle.dietFruitVegServings' }}
            />

            {/* Physical Activity */}
            <OptionWithRadioField
              label={isRequiredField(
                'Do you engage in physical activity?',
                'lifestyle.physicalActivity'
              )}
              options={[
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.physicalActivityEngages' }}
            />
            {Boolean(watch('lifestyle.physicalActivityEngages')) && (
              <>
                <Controller
                  name="lifestyle.physicalActivityType"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter type of activity (e.g., walking, gym, sports)"
                      label={isRequiredField(
                        'If yes, what type?',
                        'lifestyle.physicalActivityType'
                      )}
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
                <Controller
                  name="lifestyle.physicalActivityDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter duration in minutes/day"
                      label={isRequiredField(
                        'Duration (minutes/day)',
                        'lifestyle.physicalActivityDuration'
                      )}
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
                <Controller
                  name="lifestyle.physicalActivityFrequency"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter frequency in days/week"
                      label={isRequiredField(
                        'Frequency (days/week)',
                        'lifestyle.physicalActivityFrequency'
                      )}
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
              </>
            )}
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
