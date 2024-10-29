import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import {
  activityDurationOptions,
  balancedDietOptions,
  checkupImportanceOptions,
  foodOptions,
  longTermStressOptions,
  physicalActivityImportanceOptions,
  saltFatRisksOptions,
  secondhandSmokingOptions,
  smokingRisksOptions,
  stressFactorsOptions,
  stressSignsOptions,
  sugarEffectsOptions,
  suitableActivitiesOptions,
} from '@/constants/parent'
import { ParentFormData } from '@/types/questionnaire.types'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

interface Props {
  control: Control<ParentFormData, any, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

export const KnowledgeSection = ({ control, errors, watch }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Knowledge</h3>

      <div className="space-y-8">
        {/* Nutrition Knowledge */}
        <PageCard title="Nutrition Knowledge" bodyStyle="p-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Nutrition</h3>

            <Controller
              control={control}
              name="nutrition.balancedDiet"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="What do you understand by balanced diet?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={balancedDietOptions}
                  variant={
                    errors?.nutrition?.balancedDiet ? 'destructive' : 'default'
                  }
                  message={
                    errors?.nutrition?.balancedDiet && 'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="nutrition.sugarEffects"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="Why should we avoid giving children too much sugar??"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={sugarEffectsOptions}
                  variant={
                    errors?.nutrition?.balancedDiet ? 'destructive' : 'default'
                  }
                  message={
                    errors?.nutrition?.balancedDiet && 'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="nutrition.saltFatRisks"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="What are the dangers of eating too much salt and fat?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={saltFatRisksOptions}
                  variant={
                    errors?.nutrition?.saltFatRisks ? 'destructive' : 'default'
                  }
                  message={
                    errors?.nutrition?.saltFatRisks && 'Please select an option'
                  }
                />
              )}
            />

            <div className="space-y-2">
              <Text className="lg:text-base text-sm">
                What foods do you think are important for boys to eat?
              </Text>
              <div className="grid grid-cols-1 gap-2">
                {foodOptions.map((option) => (
                  <Controller
                    key={option.value}
                    control={control}
                    name="nutrition.boysFood"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), option.value]
                              : field.value?.filter(
                                  (value) => value !== option.value
                                )
                            field.onChange(newValue)
                          }}
                        />
                        <Text className="text-sm">{option.label}</Text>
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Text className="lg:text-base text-sm">
                What foods do you think are important for girls to eat?
              </Text>
              <div className="grid grid-cols-1 gap-2">
                {foodOptions.map((option) => (
                  <Controller
                    key={option.value}
                    control={control}
                    name="nutrition.girlsFood"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), option.value]
                              : field.value?.filter(
                                  (value) => value !== option.value
                                )
                            field.onChange(newValue)
                          }}
                        />
                        <Text className="text-sm">{option.label}</Text>
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </PageCard>

        {/* Physical Activity Knowledge */}
        <PageCard title="Physical Activity Knowledge" bodyStyle="p-4">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Physical Activity</h3>

            <Controller
              control={control}
              name="generalPhysicalActivity.importance"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="Why is it important for children to be physically active?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={physicalActivityImportanceOptions}
                  variant={
                    errors?.generalPhysicalActivity?.importance
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.generalPhysicalActivity?.importance &&
                    'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="generalPhysicalActivity.childDailyActivity"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="How much physical activity do you think your child should engage in daily?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={activityDurationOptions}
                  variant={
                    errors?.generalPhysicalActivity?.childDailyActivity
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.generalPhysicalActivity?.childDailyActivity &&
                    'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="generalPhysicalActivity.adultDailyActivity"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="How much physical activity do you think you should engage in daily?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={activityDurationOptions}
                  variant={
                    errors?.generalPhysicalActivity?.adultDailyActivity
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.generalPhysicalActivity?.adultDailyActivity &&
                    'Please select an option'
                  }
                />
              )}
            />

            <div className="space-y-2">
              <Text className="lg:text-base text-sm">
                What types of physical activities are suitable for children?
              </Text>
              <div className="grid grid-cols-1 gap-2">
                {suitableActivitiesOptions.map((option) => (
                  <Controller
                    key={option.value}
                    control={control}
                    name="generalPhysicalActivity.suitableActivities"
                    render={({ field }) => (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value?.includes(option.value)}
                          onCheckedChange={(checked) => {
                            const newValue = checked
                              ? [...(field.value || []), option.value]
                              : field.value?.filter(
                                  (value) => value !== option.value
                                )
                            field.onChange(newValue)
                          }}
                        />
                        <Text className="text-sm">{option.label}</Text>
                      </div>
                    )}
                  />
                ))}
              </div>
            </div>
          </div>
        </PageCard>

        {/*  Risky Behavior knowledge  */}
        <PageCard title="Risky Behavior knowledge" bodyStyle="p-4">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold">
              Risky Behaviour and Stress
            </h3>

            {/* Health Risks of Smoking and Alcohol */}
            <Controller
              control={control}
              name="riskyBehavior.smokingRisks"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    What health risks are associated with smoking and alcohol
                    consumption?
                  </Text>
                  <div className="grid grid-cols-1 gap-2">
                    {smokingRisksOptions.map((option) => (
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
                  {errors?.riskyBehavior?.smokingRisks && (
                    <Text className="text-red-500 text-sm">
                      Please select at least one option
                    </Text>
                  )}
                </div>
              )}
            />

            {/* Effects of Secondhand Smoking */}
            <Controller
              control={control}
              name="riskyBehavior.secondhandSmoking"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="What can happen if children are exposed to smoking at home?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={secondhandSmokingOptions}
                  variant={
                    errors?.riskyBehavior?.secondhandSmoking
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.riskyBehavior?.secondhandSmoking &&
                    'Please select an option'
                  }
                />
              )}
            />

            {/* Importance of Health Checkups */}
            <Controller
              control={control}
              name="riskyBehavior.checkupImportance"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select an option"
                  label="Why are regular health check-ups important for your child?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={checkupImportanceOptions}
                  variant={
                    errors?.riskyBehavior?.checkupImportance
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.riskyBehavior?.checkupImportance &&
                    'Please select an option'
                  }
                />
              )}
            />

            {/* Stress Factors */}
            <Controller
              control={control}
              name="riskyBehavior.stressFactors"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Which of the following can cause stress for your child?
                  </Text>
                  <div className="grid grid-cols-1 gap-2">
                    {stressFactorsOptions.map((option) => (
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
                  {errors?.riskyBehavior?.stressFactors && (
                    <Text className="text-red-500 text-sm">
                      Please select at least one option
                    </Text>
                  )}
                </div>
              )}
            />

            {/* Long Term Stress Effects */}
            <Controller
              control={control}
              name="riskyBehavior.longTermStress"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    What can happen when your child is stressed for a long time?
                  </Text>
                  <div className="grid grid-cols-1 gap-2">
                    {longTermStressOptions.map((option) => (
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
                  {errors?.riskyBehavior?.longTermStress && (
                    <Text className="text-red-500 text-sm">
                      Please select at least one option
                    </Text>
                  )}
                </div>
              )}
            />

            {/* Signs of Stress */}
            <Controller
              control={control}
              name="riskyBehavior.stressSigns"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Which of these feelings can be a sign of stress in your
                    child?
                  </Text>
                  <div className="grid grid-cols-1 gap-2">
                    {stressSignsOptions.map((option) => (
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
                  {errors?.riskyBehavior?.stressSigns && (
                    <Text className="text-red-500 text-sm">
                      Please select at least one option
                    </Text>
                  )}
                </div>
              )}
            />

            {watch('riskyBehavior.stressSigns')?.includes('other') && (
              <Controller
                control={control}
                name="riskyBehavior.otherStressSigns"
                render={({ field }) => (
                  <Input
                    {...field}
                    label="Please specify other signs"
                    labelStyle="lg:text-base text-sm"
                    placeholder="Enter other signs of stress"
                    variant={
                      errors?.riskyBehavior?.otherStressSigns
                        ? 'destructive'
                        : 'default'
                    }
                  />
                )}
              />
            )}
          </div>
        </PageCard>
      </div>
    </div>
  )
}

export default KnowledgeSection
