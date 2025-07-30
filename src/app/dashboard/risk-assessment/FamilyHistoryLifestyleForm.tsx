import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'

type Props = {
  onNext: () => void
  disabled?: boolean
}

export const FamilyHistoryLifestyleForm = ({ onNext, disabled }: Props) => {
  const { control, watch, setValue } = useFormContext()
  const isRequiredField = useRequiredFieldLabel()

  const hasDailyPhysicalActivity = watch('lifestyle.hasDailyPhysicalActivity')

  // Get all form data for conditional required field logic
  const formData = watch()

  const processedFoodsFrequency = watch('lifestyle.processedFoodsFrequency')
  const addSaltAtTable = watch('lifestyle.addSaltAtTable')
  const vegetableServingsPerWeek = watch('lifestyle.vegetableServingsPerWeek')
  const vegetableServingSize = watch('lifestyle.vegetableServingSize')

  // Diet assessment system
  useEffect(() => {
    const dietQuestions = {
      processedFoodsFrequency,
      addSaltAtTable,
      vegetableServingsPerWeek,
      vegetableServingSize,
    }

    // Check if any diet questions are filled
    const hasAnyDietData = Object.values(dietQuestions).some(
      (value) => value && value.trim() !== ''
    )

    if (!hasAnyDietData) {
      // If no diet questions are filled, set diet to 'low'
      setValue('lifestyle.diet', 'low')
      return
    }

    // Calculate diet score based on available filled questions
    let score = 0
    let totalQuestions = 0

    // Processed foods scoring (lower frequency = better score)
    if (dietQuestions.processedFoodsFrequency) {
      totalQuestions++
      switch (dietQuestions.processedFoodsFrequency) {
        case 'Never':
          score += 3
          break
        case 'Seldomly (less than once a week)':
          score += 2
          break
        case 'Occasionally (1–2 times a week)':
          score += 1
          break
        case 'Regularly (3–5 times a week)':
          score += 0
          break
        case 'Frequently (6 or more times a week)':
          score += 0
          break
      }
    }

    // Salt usage scoring
    if (dietQuestions.addSaltAtTable) {
      totalQuestions++
      switch (dietQuestions.addSaltAtTable) {
        case 'No':
          score += 3
          break
        case 'Yes':
          score += 0
          break
      }
    }

    // Vegetable servings scoring
    if (dietQuestions.vegetableServingsPerWeek) {
      totalQuestions++
      switch (dietQuestions.vegetableServingsPerWeek) {
        case 'None':
          score += 0
          break
        case 'Less than 1 serving/week':
          score += 0
          break
        case '1-2 servings/week':
          score += 1
          break
        case '3-4 servings/week':
          score += 2
          break
        case '5-6 servings/week':
          score += 3
          break
        case '7-10 servings/week':
          score += 3
          break
        case 'More than 10 servings/week':
          score += 3
          break
      }
    }

    // Vegetable serving size scoring
    if (dietQuestions.vegetableServingSize) {
      totalQuestions++
      switch (dietQuestions.vegetableServingSize) {
        case '½ cup or less':
          score += 0
          break
        case 'Between ½ cup - 1½ cups':
          score += 1
          break
        case '1½ cups - 3 cups':
          score += 2
          break
        case '3 cups - 5 cups':
          score += 3
          break
        case 'More than 5 cups':
          score += 3
          break
      }
    }

    // Calculate average score and determine diet quality
    if (totalQuestions > 0) {
      const averageScore = score / totalQuestions
      let dietQuality: 'poor' | 'moderate' | 'good'

      if (averageScore >= 2.5) {
        dietQuality = 'good'
      } else if (averageScore >= 1.5) {
        dietQuality = 'moderate'
      } else {
        dietQuality = 'poor'
      }

      setValue('lifestyle.diet', dietQuality)
    }
  }, [
    processedFoodsFrequency,
    addSaltAtTable,
    vegetableServingsPerWeek,
    vegetableServingSize,
    setValue,
  ])

  //create a check for all diet questions and add a need field called lifestyle.diet: 'poor' | 'moderate' | 'good'. this will be gotten from available filled diet questions (if no diet questions are filled, then it should be 'low' and analyze available filled diet question without any required field). Run it here

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
                'lifestyle.everSmoked',
                formData
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.everSmoked' }}
              disabled={disabled}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you currently smoke cigarettes?',
                'lifestyle.currentSmokingStatus',
                formData
              )}
              options={[
                'Yes, currently smoking',
                'Former smoker',
                'Never smoked',
              ]}
              form={{ id: 'lifestyle.currentSmokingStatus' }}
              disabled={disabled}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'How often do you consume alcohol?',
                'lifestyle.alcoholFrequency',
                formData
              )}
              options={[
                'Never',
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.alcoholFrequency' }}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Diet Section */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-3 md:mb-5">
            Diet
          </Text>

          {/* Diet Quality Indicator */}
          {watch('lifestyle.diet') && watch('lifestyle.diet') !== 'low' && (
            <div className="mb-4 p-3 rounded-lg border">
              <Text variant="text/sm" className="font-medium mb-1">
                Calculated Diet Quality:
              </Text>
              <div className="flex items-center space-x-2">
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    watch('lifestyle.diet') === 'good'
                      ? 'bg-green-100 text-green-800'
                      : watch('lifestyle.diet') === 'moderate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                  }`}
                >
                  {watch('lifestyle.diet')?.toUpperCase()}
                </span>
                <Text variant="text/sm" className="text-gray-600">
                  Based on available diet information
                </Text>
              </div>
            </div>
          )}

          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <OptionWithRadioField
              label={isRequiredField(
                'How often do you consume processed foods such as corned beef, sausages, noodles?',
                'lifestyle.processedFoodsFrequency',
                formData
              )}
              options={[
                'Never',
                'Seldomly (less than once a week)',
                'Occasionally (1–2 times a week)',
                'Regularly (3–5 times a week)',
                'Frequently (6 or more times a week)',
              ]}
              form={{ id: 'lifestyle.processedFoodsFrequency' }}
              disabled={disabled}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you add salt to your food at the table?',
                'lifestyle.addSaltAtTable',
                formData
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.addSaltAtTable' }}
              disabled={disabled}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'In the last month, about how many servings of vegetables or leafy green salads did you eat per week? (serving is each time you had vegetables or leafy greens, and includes leafy green salads and raw, cooked, canned, and frozen vegetables (including beans) Does not include fried vegetables like French fries or fried potatoes.)',
                'lifestyle.vegetableServingsPerWeek',
                formData
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
              disabled={disabled}
            />

            <OptionWithRadioField
              label={isRequiredField(
                "In the last month, how much did you usually eat in each serving of vegetables or leafy green salads? (a cup is about the size of an adult's closed fist)",
                'lifestyle.vegetableServingSize',
                formData
              )}
              options={[
                '½ cup or less',
                'Between ½ cup - 1½ cups',
                '1½ cups - 3 cups',
                '3 cups - 5 cups',
                'More than 5 cups',
              ]}
              form={{ id: 'lifestyle.vegetableServingSize' }}
              disabled={disabled}
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
                'lifestyle.hasDailyPhysicalActivity',
                formData
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.hasDailyPhysicalActivity' }}
              disabled={disabled}
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
                      'lifestyle.moderateActivityMonths',
                      formData
                    )}
                    labelStyle="lg:text-sm text-xs"
                    disabled={disabled}
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
                    disabled={disabled}
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
                      'lifestyle.vigorousActivityMonths',
                      formData
                    )}
                    labelStyle="lg:text-sm text-xs"
                    disabled={disabled}
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
                    disabled={disabled}
                  />
                )}
              />
            </div>
          )}
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
