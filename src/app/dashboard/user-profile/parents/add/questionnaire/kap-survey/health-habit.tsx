import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'

import { ParentFormData } from '@/types/questionnaire.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

// Alcohol consumption options
const alcoholFrequencyOptions = [
  { value: 'daily', label: 'Daily' },
  { value: '5-6', label: '5-6 days per week' },
  { value: '3-4', label: '3-4 days per week' },
  { value: '1-2', label: '1-2 days per week' },
  { value: '1-3-month', label: '1-3 days per month' },
  { value: 'less-month', label: 'Less than once a month' },
  { value: 'never', label: 'Never' },
]

const daysOfTheWeek = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

interface Props {
  control: Control<ParentFormData, any, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

export const HealthHabitSection = ({ control, errors, watch }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Health Habit</h3>

      {/* Smoking Habits */}
      <PageCard title="Smoking Habits" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="smoking.currentSmoker"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Do you currently smoke any tobacco products, such as
                  cigarettes, cigars or pipes?
                </Text>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <Text className="text-sm">Yes</Text>
                </div>
              </div>
            )}
          />

          {watch('smoking.currentSmoker') ? (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="smoking.dailySmoker"
                render={({ field: { value, onChange } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Do you currently smoke tobacco products every day?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="smoking.startAge"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="How old were you when you first started smoking?"
                    labelStyle="lg:text-sm text-xs"
                    variant={
                      errors?.smoking?.startAge ? 'destructive' : 'default'
                    }
                  />
                )}
              />

              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  On average, how many of the following products do you smoke
                  each day/week?
                </Text>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    control={control}
                    name="smoking.consumption.manufactured"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Manufactured cigarettes"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.smoking?.consumption?.manufactured
                            ? 'destructive'
                            : 'default'
                        }
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="smoking.consumption.handRolled"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Hand-rolled cigarettes"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.smoking?.consumption?.handRolled
                            ? 'destructive'
                            : 'default'
                        }
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="smoking.consumption.pipes"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Pipes full of tobacco"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.smoking?.consumption?.pipes
                            ? 'destructive'
                            : 'default'
                        }
                      />
                    )}
                  />

                  <Controller
                    control={control}
                    name="smoking.consumption.shisha"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        label="Number of Shisha sessions"
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          errors?.smoking?.consumption?.shisha
                            ? 'destructive'
                            : 'default'
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="smoking.pastSmoker"
                render={({ field: { value, onChange } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      In the past, did you ever smoke any tobacco products?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              {watch('smoking.pastSmoker') && (
                <Controller
                  control={control}
                  name="smoking.pastDailySmoker"
                  render={({ field: { value, onChange } }) => (
                    <div className="space-y-2">
                      <Text className="lg:text-sm text-xs font-medium">
                        In the past, did you ever smoke daily?
                      </Text>
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={value} onCheckedChange={onChange} />
                        <Text className="text-sm">Yes</Text>
                      </div>
                    </div>
                  )}
                />
              )}
            </div>
          )}

          <Controller
            control={control}
            name="smoking.secondhandHome"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  During the past 30 days, did someone smoke inside your home,
                  e.g sitting room, bedroom (not yourself)?
                </Text>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <Text className="text-sm">Yes</Text>
                </div>
              </div>
            )}
          />

          <Controller
            control={control}
            name="smoking.secondhandWork"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  During the past 30 days, did someone smoke in closed areas in
                  your workplace (in the building, in a work area or a specific
                  office)?
                </Text>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <Text className="text-sm">Yes</Text>
                </div>
              </div>
            )}
          />
        </div>
      </PageCard>

      {/* Alcohol Consumption */}
      <PageCard title="Alcohol Consumption" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="alcohol.everConsumed"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Have you ever consumed any alcohol such as beer, wine,
                  spirits, sachet alcohol, bitters, etc even if it&apos;s a few
                  sips (excluding alcohol based medication)?
                </Text>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <Text className="text-sm">Yes</Text>
                </div>
              </div>
            )}
          />

          <Controller
            control={control}
            name="alcohol.last12Months"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Have you consumed any alcohol within the past 12 months even
                  if it&apos;s a few sips (excluding alcohol based medication)?
                </Text>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <Text className="text-sm">Yes</Text>
                </div>
              </div>
            )}
          />

          {!watch('alcohol.last12Months') && (
            <Controller
              control={control}
              name="alcohol.stoppedHealth"
              render={({ field: { value, onChange } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Have you stopped drinking due to health reasons, such as a
                    negative impact on your health or on the advice of your
                    doctor or other health worker?
                  </Text>
                  <div className="flex items-center space-x-2">
                    <Checkbox checked={value} onCheckedChange={onChange} />
                    <Text className="text-sm">Yes</Text>
                  </div>
                </div>
              )}
            />
          )}

          {watch('alcohol.everConsumed') && (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="alcohol.frequency"
                render={({ field: { onChange, ...rest } }) => (
                  <Select
                    placeholder="Select frequency"
                    label="During the past 12 months, how frequently have you had at least one standard alcoholic drink? (If you only had a few sips, your answer will be “never”)"
                    labelStyle="lg:text-sm text-xs"
                    {...rest}
                    onChange={(val) => onChange(val)}
                    options={alcoholFrequencyOptions}
                    variant={
                      errors?.alcohol?.frequency ? 'destructive' : 'default'
                    }
                    message={
                      errors?.alcohol?.frequency && 'Please select an option'
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="alcohol.last30Days"
                render={({ field: { value, onChange } }) => (
                  <div className="space-y-2">
                    <Text className="lg:text-sm text-xs font-medium">
                      Have you consumed any alcohol within the past 30 days,
                      even if it&apos;s a few sips (excluding alcohol based
                      medication)?
                    </Text>
                    <div className="flex items-center space-x-2">
                      <Checkbox checked={value} onCheckedChange={onChange} />
                      <Text className="text-sm">Yes</Text>
                    </div>
                  </div>
                )}
              />

              <Controller
                control={control}
                name="alcohol.monthlyOccasions"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="During the past 30 days, how many times have you had at least one standard alcoholic drink? A standard drink is one glass of beer, wine, or a shot of local spirits, all having about the same amount of alcohol If you only had a few sips, your answer will be “never”"
                    labelStyle="lg:text-sm text-xs"
                    variant={
                      errors?.alcohol?.monthlyOccasions
                        ? 'destructive'
                        : 'default'
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="alcohol.averageDrinks"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="During the past 30 days, when you drank alcohol, how many standard drinks on average did you have in one sitting?"
                    labelStyle="lg:text-sm text-xs"
                    variant={
                      errors?.alcohol?.averageDrinks ? 'destructive' : 'default'
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="alcohol.maxDrinks"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="During the past 30 days, what was the largest number of standard drinks you had on a single occasion, counting all types of alcoholic drinks together?"
                    labelStyle="lg:text-sm text-xs"
                    variant={
                      errors?.alcohol?.maxDrinks ? 'destructive' : 'default'
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="alcohol.sixPlusOccasions"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    label="During the past 30 days, how many times did you have six or more standard drinks in a single drinking occasion?"
                    labelStyle="lg:text-sm text-xs"
                    variant={
                      errors?.alcohol?.sixPlusOccasions
                        ? 'destructive'
                        : 'default'
                    }
                  />
                )}
              />

              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  During each of the past 7 days, how many standard drinks did
                  you have each day?
                </Text>
                <div className="grid grid-cols-2 gap-4">
                  {daysOfTheWeek.map((day: (typeof daysOfTheWeek)[number]) => (
                    <Controller
                      key={day}
                      control={control}
                      name={`alcohol.weeklyConsumption.${day}`}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label={day.charAt(0).toUpperCase() + day.slice(1)}
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            errors?.alcohol?.weeklyConsumption?.[day]
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Text className="lg:text-sm text-xs font-medium">
                  Homebrewed Alcohol Consumption
                </Text>
                <Controller
                  control={control}
                  name="alcohol.homebrewed.consumed"
                  render={({ field: { value, onChange } }) => (
                    <div className="space-y-2">
                      <Text className="lg:text-sm text-xs">
                        During the past 7 days, did you consume any homebrewed
                        alcohol, ogogoro, palm wine, any alcohol not intended
                        for drinking e.g. alcohol based medicines? (USE
                        SHOWCARD)
                      </Text>
                      <div className="flex items-center space-x-2">
                        <Checkbox checked={value} onCheckedChange={onChange} />
                        <Text className="text-sm">Yes</Text>
                      </div>
                    </div>
                  )}
                />

                {watch('alcohol.homebrewed.consumed') && (
                  <div className="grid grid-cols-1 gap-4 pl-4">
                    <Controller
                      control={control}
                      name="alcohol.homebrewed.spirits"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label="Homebrewed spirits (e.g., ogogoro)"
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            errors?.alcohol?.homebrewed?.spirits
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="alcohol.homebrewed.beerWine"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label="Homebrewed beer or wine (e.g., palm wine)"
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            errors?.alcohol?.homebrewed?.beerWine
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="alcohol.homebrewed.other"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          label="Alcohol not intended for drinking, e.g. alcohol-based medicines, perfumes, after shaves)"
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            errors?.alcohol?.homebrewed?.beerWine
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </PageCard>
    </div>
  )
}
