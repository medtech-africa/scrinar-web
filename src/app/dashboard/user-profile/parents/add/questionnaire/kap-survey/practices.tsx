import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'

import { ParentFormData } from '@/types/questionnaire.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

// Nutrition Practices Options
const frequencyOptions = [
  { value: 'daily', label: 'Every day' },
  { value: 'few-times', label: 'A few times a week' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'Never' },
]

// Physical Activity Options
const durationOptions = [
  { value: 'less30', label: 'Less than 30 minutes' },
  { value: '30-60', label: '30 minutes to 1 hour' },
  { value: 'more60', label: 'More than 1 hour' },
  { value: 'na', label: 'Not applicable' },
]

const activityTypes = [
  { value: 'running', label: 'Running' },
  { value: 'sports', label: 'Playing sports' },
  { value: 'skipping', label: 'Skipping' },
  { value: 'dancing', label: 'Dancing' },
]

const choreTypes = [
  { value: 'water', label: 'Fetching water' },
  { value: 'cooking', label: 'Cooking and preparing meals' },
  { value: 'cleaning', label: 'Cleaning the house' },
  { value: 'gardening', label: 'Gardening or farming' },
  { value: 'carrying', label: 'Carrying heavy items (e.g., firewood, water)' },
  { value: 'siblings', label: 'Caring for younger siblings' },
]

const copingMethodsOptions = [
  { value: 'talk', label: 'Talk to a family member or friend' },
  {
    value: 'activities',
    label: 'Do something she/he enjoys, like drawing or playing games',
  },
  { value: 'sports', label: 'Play sports or run around' },
  { value: 'music', label: 'Listen to his/her favorite music' },
  { value: 'alone', label: 'Spend some time alone' },
]

const stressorOptions = [
  { value: 'schoolwork', label: 'Schoolwork or tests' },
  { value: 'home', label: 'Problems at home' },
  { value: 'friends', label: 'Issues with friends' },
  { value: 'chores', label: 'Chores or helping at home' },
  { value: 'time', label: 'Not having enough free time' },
  { value: 'health', label: 'Health problems' },
]

interface Props {
  control: Control<ParentFormData, any, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

export const PracticesSection = ({ control, errors }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Practices</h3>

      {/* Nutrition Practices */}
      <PageCard title="Nutrition Practices" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="nutritionPractices.fruitsVegetables"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select frequency"
                label="How often do you give your child fruits and vegetables?"
                labelStyle="lg:text-sm text-xs"
                {...rest}
                onChange={(val) => onChange(val)}
                options={frequencyOptions}
                variant={
                  errors?.nutritionPractices?.fruitsVegetables
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.nutritionPractices?.fruitsVegetables &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="nutritionPractices.snacks"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select frequency"
                label="How often do you give your child snacks like buns, doughnut, sausage, biscuits, etc?"
                labelStyle="lg:text-sm text-xs"
                {...rest}
                onChange={(val) => onChange(val)}
                options={frequencyOptions}
                variant={
                  errors?.nutritionPractices?.snacks ? 'destructive' : 'default'
                }
                message={
                  errors?.nutritionPractices?.snacks &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="nutritionPractices.sugaryBeverages"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select frequency"
                label="How often do you give your child sugary beverages or eat sugary snacks?"
                labelStyle="lg:text-sm text-xs"
                {...rest}
                onChange={(val) => onChange(val)}
                options={frequencyOptions}
                variant={
                  errors?.nutritionPractices?.sugaryBeverages
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.nutritionPractices?.sugaryBeverages &&
                  'Please select an option'
                }
              />
            )}
          />
        </div>
      </PageCard>

      {/* Physical Activity Practices */}
      <PageCard title="Physical Activity Practices" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="physicalActivityPractices.frequency"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select frequency"
                label="How often does your child engage in physical activity? (Playing, house chores, running errands)"
                labelStyle="lg:text-sm text-xs"
                {...rest}
                onChange={(val) => onChange(val)}
                options={frequencyOptions}
                variant={
                  errors?.physicalActivityPractices?.frequency
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.physicalActivityPractices?.frequency &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="physicalActivityPractices.duration"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select duration"
                label="How long does he/she usually engage in it for?"
                labelStyle="lg:text-sm text-xs"
                {...rest}
                onChange={(val) => onChange(val)}
                options={durationOptions}
                variant={
                  errors?.physicalActivityPractices?.duration
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.physicalActivityPractices?.duration &&
                  'Please select an option'
                }
              />
            )}
          />

          <div className="space-y-2">
            <Text className="lg:text-sm text-xs font-medium">
              What types of physical activity and games does he/she enjoy?
            </Text>
            <Controller
              control={control}
              name="physicalActivityPractices.activities"
              render={({ field: { onChange, value } }) => (
                <div className="grid grid-cols-2 gap-2">
                  {activityTypes.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(value || []), option.value]
                            : value?.filter((v) => v !== option.value)
                          onChange(newValue)
                        }}
                      />
                      <Text className="text-sm">{option.label}</Text>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Text className="lg:text-sm text-xs font-medium">
              What types of house chores does he/she regularly perform?
            </Text>
            <Controller
              control={control}
              name="physicalActivityPractices.choreTypes"
              render={({ field: { onChange, value } }) => (
                <div className="grid grid-cols-2 gap-2">
                  {choreTypes.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(value || []), option.value]
                            : value?.filter((v) => v !== option.value)
                          onChange(newValue)
                        }}
                      />
                      <Text className="text-sm">{option.label}</Text>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="physicalActivityPractices.screenTime.mobile"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Average hours spent with mobile games, computer/internet daily"
                  labelStyle="lg:text-sm text-xs"
                  variant={
                    errors?.physicalActivityPractices?.screenTime?.mobile
                      ? 'destructive'
                      : 'default'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="physicalActivityPractices.screenTime.tv"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  label="Average hours spent watching TV/Playing video games daily"
                  labelStyle="lg:text-sm text-xs"
                  variant={
                    errors?.physicalActivityPractices?.screenTime?.tv
                      ? 'destructive'
                      : 'default'
                  }
                />
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Controller
              control={control}
              name="physicalActivityPractices.sleep.bedtime"
              render={({ field }) => (
                <Input
                  {...field}
                  type="time"
                  label="When does he/she go to bed at night?"
                  labelStyle="lg:text-sm text-xs"
                  variant={
                    errors?.physicalActivityPractices?.sleep?.bedtime
                      ? 'destructive'
                      : 'default'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="physicalActivityPractices.sleep.wakeTime"
              render={({ field }) => (
                <Input
                  {...field}
                  type="time"
                  label="When does he/she wake up in the morning?"
                  labelStyle="lg:text-sm text-xs"
                  variant={
                    errors?.physicalActivityPractices?.sleep?.wakeTime
                      ? 'destructive'
                      : 'default'
                  }
                />
              )}
            />
          </div>
        </div>
      </PageCard>

      {/* Risky Behavior and Stress Practices */}
      <PageCard title="Risky Behaviour and Stress Practices" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="riskyBehaviorPractices.checkups"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select frequency"
                label="How often do you take your child to the doctor for health check-ups?"
                labelStyle="lg:text-sm text-xs"
                {...rest}
                onChange={(val) => onChange(val)}
                options={[
                  {
                    value: 'regularly',
                    label: 'Regularly (e.g., once a year)',
                  },
                  {
                    value: 'occasionally',
                    label: 'Occasionally (e.g., when sick)',
                  },
                  { value: 'rarely', label: 'Rarely' },
                  { value: 'never', label: 'Never' },
                ]}
                variant={
                  errors?.riskyBehaviorPractices?.checkups
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.riskyBehaviorPractices?.checkups &&
                  'Please select an option'
                }
              />
            )}
          />

          <div className="space-y-2">
            <Text className="lg:text-sm text-xs font-medium">
              When your child is worried or upset, what helps him/her feel
              better?
            </Text>
            <Controller
              control={control}
              name="riskyBehaviorPractices.copingMethods"
              render={({ field: { onChange, value } }) => (
                <div className="grid grid-cols-2 gap-2">
                  {copingMethodsOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(value || []), option.value]
                            : value?.filter((v) => v !== option.value)
                          onChange(newValue)
                        }}
                      />
                      <Text className="text-sm">{option.label}</Text>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>

          <div className="space-y-2">
            <Text className="lg:text-sm text-xs font-medium">
              What things make your child feel stressed?
            </Text>
            <Controller
              control={control}
              name="riskyBehaviorPractices.stressors"
              render={({ field: { onChange, value } }) => (
                <div className="grid grid-cols-2 gap-2">
                  {stressorOptions.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        checked={value?.includes(option.value)}
                        onCheckedChange={(checked) => {
                          const newValue = checked
                            ? [...(value || []), option.value]
                            : value?.filter((v) => v !== option.value)
                          onChange(newValue)
                        }}
                      />
                      <Text className="text-sm">{option.label}</Text>
                    </div>
                  ))}
                </div>
              )}
            />
          </div>
        </div>
      </PageCard>
    </div>
  )
}
