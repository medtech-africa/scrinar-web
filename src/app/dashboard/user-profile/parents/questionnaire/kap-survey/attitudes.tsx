import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'

import { ParentFormData } from '@/types/questionnaire.types'
import { Checkbox } from '@/components/ui/checkbox'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

// Nutrition Attitudes Options
const balancedDietImportanceOptions = [
  {
    value: 'important-health',
    label: "Yes, it's important for staying healthy",
  },
  { value: 'when-sick', label: 'Only when you are sick' },
  { value: 'weight-loss', label: 'Only when you want to lose weight' },
  {
    value: 'not-important',
    label: "It doesn't matter what you eat as long as you're not hungry",
  },
  { value: 'unknown', label: "I don't know" },
]

const healthyFoodDifficultyOptions = [
  { value: 'easy', label: "It's easy for me to give them healthy every day" },
  {
    value: 'taste',
    label: "It's hard because healthy food doesn't taste good",
  },
  { value: 'expensive', label: "It's too expensive to eat healthy food" },
  {
    value: 'impossible',
    label: "It's impossible because unhealthy food is everywhere",
  },
  { value: 'unknown', label: "I don't know" },
]

const bodySizeOptions = [
  { value: 'slim', label: 'Should be slim' },
  { value: 'fat', label: 'Should be fat' },
  { value: 'muscular', label: 'Should have muscles' },
  { value: 'balanced', label: 'Should not be too fat or slim' },
]

// Physical Activity Attitudes Options
const genderImportanceOptions = [
  { value: 'both', label: "Yes, it's important for both boys and girls" },
  { value: 'boys-only', label: "It's only important for boys" },
  { value: 'girls-only', label: "It's only important for girls" },
  { value: 'unknown', label: "I don't know" },
]

const girlsBarriersOptions = [
  { value: 'schoolwork', label: 'Time spent on schoolwork' },
  { value: 'chores', label: 'House chores' },
  { value: 'culture', label: 'Culture and traditional expectation' },
  { value: 'creation', label: 'Its the way girls are created' },
  { value: 'shy', label: 'Feeling shy' },
  { value: 'safety', label: 'Lack of safe places to play' },
  { value: 'health', label: 'Health reasons' },
  { value: 'none', label: 'None' },
]

const timeComparisonOptions = [
  { value: 'more', label: 'More time' },
  { value: 'less', label: 'Less time' },
  { value: 'same', label: 'The same amount of time' },
  { value: 'unknown', label: "I don't know" },
]

// Risky Behavior Attitudes Options
const smokingDrinkingViewOptions = [
  { value: 'harmful', label: 'They are harmful and should be avoided' },
  { value: 'moderate', label: 'They are okay in moderation' },
  { value: 'not-harmful', label: 'They are not harmful' },
  { value: 'unknown', label: "I don't know" },
]

const genderExperimentationOptions = [
  { value: 'yes', label: 'Yes, boys are more likely to experiment' },
  { value: 'no', label: 'No, it is equally unacceptable for both' },
  { value: 'not-sure', label: 'Not sure' },
]

const mentalHealthImportanceOptions = [
  { value: 'very', label: 'Very important' },
  { value: 'somewhat', label: 'Somewhat important' },
  { value: 'not-very', label: 'Not very important' },
  { value: 'not-at-all', label: 'Not important at all' },
]

interface Props {
  control: Control<ParentFormData, any, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

export const AttitudesSection = ({ control, errors }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Attitudes</h3>

      {/* Nutrition Attitudes */}
      <PageCard title="Nutrition Attitudes" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="nutritionAttitudes.balancedDietImportance"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="Do you think it's important to eat a balanced diet every day?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={balancedDietImportanceOptions}
                variant={
                  errors?.nutritionAttitudes?.balancedDietImportance
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.nutritionAttitudes?.balancedDietImportance &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="nutritionAttitudes.healthyFoodDifficulty"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="Do you think giving your child healthy food everyday is difficult for you?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={healthyFoodDifficultyOptions}
                variant={
                  errors?.nutritionAttitudes?.healthyFoodDifficulty
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.nutritionAttitudes?.healthyFoodDifficulty &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="nutritionAttitudes.idealBoysSize"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="What do you think is the ideal body size for boys?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={bodySizeOptions}
                variant={
                  errors?.nutritionAttitudes?.idealBoysSize
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.nutritionAttitudes?.idealBoysSize &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="nutritionAttitudes.idealGirlsSize"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="What do you think is an ideal body size for girls?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={bodySizeOptions}
                variant={
                  errors?.nutritionAttitudes?.idealGirlsSize
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.nutritionAttitudes?.idealGirlsSize &&
                  'Please select an option'
                }
              />
            )}
          />
        </div>
      </PageCard>

      {/* Physical Activity Attitudes */}
      <PageCard title="Physical Activity Attitudes" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="physicalActivityAttitudes.genderImportance"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="Is it important for both boys and girls to be physically active?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={genderImportanceOptions}
                variant={
                  errors?.physicalActivityAttitudes?.genderImportance
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.physicalActivityAttitudes?.genderImportance &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="physicalActivityAttitudes.boysMoreActive"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Do you believe boys should be more physically active than
                  girls?
                </Text>
                <div className="flex items-center space-x-2">
                  <Checkbox checked={value} onCheckedChange={onChange} />
                  <Text className="text-sm">Yes</Text>
                </div>
              </div>
            )}
          />

          <div className="space-y-2">
            <Text className="lg:text-sm text-xs font-medium">
              What do you think can prevent girls from being as physically
              active as boys?
            </Text>
            <Controller
              control={control}
              name="physicalActivityAttitudes.girlsBarriers"
              render={({ field: { onChange, value } }) => (
                <div className="grid grid-cols-1 gap-2">
                  {girlsBarriersOptions.map((option) => (
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

          <Controller
            control={control}
            name="physicalActivityAttitudes.mixedActivities"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Should boys and girls do the same types of sports and
                  activities?
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
            name="physicalActivityAttitudes.timeComparison"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="Do you think that girls in your community have more or less time for physical activities outside of house chores compared to boys?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={timeComparisonOptions}
                variant={
                  errors?.physicalActivityAttitudes?.timeComparison
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.physicalActivityAttitudes?.timeComparison &&
                  'Please select an option'
                }
              />
            )}
          />
        </div>
      </PageCard>

      {/* Risky Behavior Attitudes */}
      <PageCard title="Risky Behaviour and Stress Attitudes" bodyStyle="p-4">
        <div className="space-y-4">
          <Controller
            control={control}
            name="riskyBehaviorAttitudes.smokingDrinkingView"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="What do you think about smoking and drinking alcohol?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={smokingDrinkingViewOptions}
                variant={
                  errors?.riskyBehaviorAttitudes?.smokingDrinkingView
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.riskyBehaviorAttitudes?.smokingDrinkingView &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="riskyBehaviorAttitudes.genderExperimentation"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="Do you think it is more acceptable for boys to experiment with smoking and alcohol than girls?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={genderExperimentationOptions}
                variant={
                  errors?.riskyBehaviorAttitudes?.genderExperimentation
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.riskyBehaviorAttitudes?.genderExperimentation &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="riskyBehaviorAttitudes.childrenStress"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Do you think children can be stressed?
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
            name="riskyBehaviorAttitudes.mentalHealthImportance"
            render={({ field: { onChange, ...rest } }) => (
              <Select
                placeholder="Select an option"
                label="How important do you think it is to take care of your children's mental health?"
                labelStyle="lg:text-base text-sm"
                {...rest}
                onChange={(val) => onChange(val)}
                options={mentalHealthImportanceOptions}
                variant={
                  errors?.riskyBehaviorAttitudes?.mentalHealthImportance
                    ? 'destructive'
                    : 'default'
                }
                message={
                  errors?.riskyBehaviorAttitudes?.mentalHealthImportance &&
                  'Please select an option'
                }
              />
            )}
          />

          <Controller
            control={control}
            name="riskyBehaviorAttitudes.genderHealthResistance"
            render={({ field: { value, onChange } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Do you believe boys are more resistant to sickness than girls?
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
    </div>
  )
}
