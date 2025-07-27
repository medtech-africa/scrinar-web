import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'

type Props = {
  onNext: () => void
}

export const FamilyHistoryLifestyleForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()
  const isRequiredField = useRequiredFieldLabel()

  const hasDailyPhysicalActivity = watch('lifestyle.hasDailyPhysicalActivity')

  return (
    <div title="Family History & Lifestyle">
      <Text as="h2" className="font-medium mb-2">
        Lifestyle Habits
      </Text>

      <div className="space-y-8">
        {/* Smoking and Alcohol Section */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-3 md:mb-5">
            Smoking and alcohol
          </Text>
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <OptionWithRadioField
              label={isRequiredField(
                'Have you ever smoked cigarettes?',
                'lifestyle.everSmoked'
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.everSmoked' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you currently smoke cigarettes?',
                'lifestyle.currentSmokingStatus'
              )}
              options={[
                'Yes, currently smoking',
                'Former smoker',
                'Never smoked',
              ]}
              form={{ id: 'lifestyle.currentSmokingStatus' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'How often do you consume alcohol?',
                'lifestyle.alcoholFrequency'
              )}
              options={[
                'Never',
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.alcoholFrequency' }}
            />
          </div>
        </div>

        {/* Diet Section */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-3 md:mb-5">
            Diet
          </Text>
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <OptionWithRadioField
              label={isRequiredField(
                'How often do you consume processed foods such as corned beef, sausages, noodles?',
                'lifestyle.processedFoodsFrequency'
              )}
              options={[
                'Never',
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.processedFoodsFrequency' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you add salt to your food at the table?',
                'lifestyle.addSaltAtTable'
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.addSaltAtTable' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'In the last month, about how many servings of vegetables or leafy green salads did you eat per week? (serving is each time you had vegetables or leafy greens, and includes leafy green salads and raw, cooked, canned, and frozen vegetables (including beans) Does not include fried vegetables like French fries or fried potatoes.)',
                'lifestyle.vegetableServingsPerWeek'
              )}
              options={[
                'None',
                'Less than 1 serving/week',
                '1-2 servings/week',
                '3-4 servings/week',
                '5-6 servings/week',
                '7-10 servings/week',
                'More than 10 servings/week',
              ]}
              form={{ id: 'lifestyle.vegetableServingsPerWeek' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                "In the last month, how much did you usually eat in each serving of vegetables or leafy green salads? (a cup is about the size of an adult's closed fist)",
                'lifestyle.vegetableServingSize'
              )}
              options={[
                '½ cup or less',
                'Between ½ cup - 1½ cups',
                '1½ cups - 3 cups',
                '3 cups - 5 cups',
                'More than 5 cups',
              ]}
              form={{ id: 'lifestyle.vegetableServingSize' }}
            />
          </div>
        </div>

        {/* Physical Activity Section */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-3 md:mb-5">
            Physical Activity
          </Text>
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <OptionWithRadioField
              label={isRequiredField(
                'Over the past 12 months, do you usually have at least 30 minutes of daily physical activity at work and/or during leisure time (including normal daily activity)?',
                'lifestyle.hasDailyPhysicalActivity'
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.hasDailyPhysicalActivity' }}
            />
          </div>

          {hasDailyPhysicalActivity === 'Yes' && (
            <div className="gap-4 grid grid-cols-1 lg:grid-cols-2 mt-4">
              <Controller
                name="lifestyle.moderateActivityMonths"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    max="12"
                    placeholder="How many months"
                    label={isRequiredField(
                      'In the past 12 months, how many months did you do any moderate physical activity? (Moderate activities DO NOT cause you to sweat or breathe hard. Some examples include vacuuming, gardening, easy walking for exercise, and so on.)',
                      'lifestyle.moderateActivityMonths'
                    )}
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />

              <Controller
                name="lifestyle.moderateActivityHoursPerWeek"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Select hours per week"
                    label="During those months, on average, about how many hours per week did you do moderate physical activities?"
                    labelStyle="lg:text-sm text-xs"
                    options={[
                      {
                        value: 'Up to 1 hour/week',
                        label: 'Up to 1 hour/week',
                      },
                      {
                        value: 'Between 1 - 2 hours/week',
                        label: 'Between 1 - 2 hours/week',
                      },
                      { value: '2 - 3 hours/week', label: '2 - 3 hours/week' },
                      { value: '3 - 4 hours/week', label: '3 - 4 hours/week' },
                      {
                        value: 'More than 4 hours/week',
                        label: 'More than 4 hours/week',
                      },
                    ]}
                  />
                )}
              />

              <Controller
                name="lifestyle.vigorousActivityMonths"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min="0"
                    max="12"
                    placeholder="How many months"
                    label={isRequiredField(
                      'In the past 12 months, how many months did you do any vigorous physical activity? (Vigorous activities include all activities that DO cause you to sweat or breathe hard. Some examples include racquet sports, basketball, running, fast biking, exercise class, weight lifting, backpacking, swimming, and heavy labor such as shoveling dirt.)',
                      'lifestyle.vigorousActivityMonths'
                    )}
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />

              <Controller
                name="lifestyle.vigorousActivityHoursPerWeek"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Select hours per week"
                    label="During those months, on average, about how many hours per week did you do vigorous physical activities?"
                    labelStyle="lg:text-sm text-xs"
                    options={[
                      {
                        value: 'Up to 1 hour/week',
                        label: 'Up to 1 hour/week',
                      },
                      {
                        value: 'Between 1 - 2 hours/week',
                        label: 'Between 1 - 2 hours/week',
                      },
                      { value: '2 - 3 hours/week', label: '2 - 3 hours/week' },
                      { value: '3 - 4 hours/week', label: '3 - 4 hours/week' },
                      {
                        value: 'More than 4 hours/week',
                        label: 'More than 4 hours/week',
                      },
                    ]}
                  />
                )}
              />
            </div>
          )}
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
