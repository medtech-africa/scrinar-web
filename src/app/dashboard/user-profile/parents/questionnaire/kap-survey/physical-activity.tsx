import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'

import { ParentFormData } from '@/types/questionnaire.types'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

interface Props {
  control: Control<ParentFormData, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

// Common options
const yesNoOptions = [
  { value: 'yes', label: 'Yes' },
  { value: 'no', label: 'No' },
]

export const PhysicalActivitySection = ({ control, errors, watch }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Physical Activity</h3>

      <Text className="text-base text-gray-800">
        Next I am going to ask you about the time you spend doing different
        types of physical activity in a typical week. Please answer these
        questions even if you do not consider yourself to be a physically active
        person. Think first about the time you spend doing work. Think of work
        as the things that you have to do such as paid or unpaid work,
        study/training, household chores, harvesting food/crops, fishing or
        hunting for food, seeking employment.
      </Text>

      {/* Work-Related Physical Activity */}
      <PageCard title="Work-Related Physical Activity" bodyStyle="p-4">
        <div className="space-y-6">
          {/* Vigorous Work Activity */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="physicalActivity.work.vigorous.does"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Does your work involve vigorous-intensity activity that
                    causes large increases in breathing or heart rate like
                    carrying or lifting heavy loads, digging or construction
                    work?
                  </Text>
                  <Select
                    placeholder="Select an option"
                    value={value}
                    onChange={onChange}
                    options={yesNoOptions}
                    variant={
                      errors?.physicalActivity?.work?.vigorous?.does
                        ? 'destructive'
                        : 'default'
                    }
                  />
                </div>
              )}
            />

            {watch('physicalActivity.work.vigorous.does') === 'yes' && (
              <div className="space-y-4 pl-4">
                <Controller
                  control={control}
                  name="physicalActivity.work.vigorous.daysPerWeek"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={7}
                      label="In a typical week, on how many days do you do vigorous-intensity activities as part of your work?"
                      labelStyle="lg:text-base text-sm"
                      variant={
                        errors?.physicalActivity?.work?.vigorous?.daysPerWeek
                          ? 'destructive'
                          : 'default'
                      }
                    />
                  )}
                />

                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    How much time do you spend doing vigorous-intensity
                    activities at work on a typical day?
                  </Text>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name="physicalActivity.work.vigorous.hoursPerDay"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          max={24}
                          label="Hours"
                          labelStyle="lg:text-base text-sm"
                          variant={
                            errors?.physicalActivity?.work?.vigorous
                              ?.hoursPerDay
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Moderate Work Activity */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="physicalActivity.work.moderate.does"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Does your work involve moderate-intensity activity that
                    causes small increases in breathing or heart rate such as
                    brisk walking or carrying light loads?
                  </Text>
                  <Select
                    placeholder="Select an option"
                    value={value}
                    onChange={onChange}
                    options={yesNoOptions}
                    variant={
                      errors?.physicalActivity?.work?.moderate?.does
                        ? 'destructive'
                        : 'default'
                    }
                  />
                </div>
              )}
            />

            {watch('physicalActivity.work.moderate.does') === 'yes' && (
              <div className="space-y-4 pl-4">
                <Controller
                  control={control}
                  name="physicalActivity.work.moderate.daysPerWeek"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={7}
                      label="In a typical week, on how many days do you do moderate-intensity activities as part of your work?"
                      labelStyle="lg:text-base text-sm"
                      variant={
                        errors?.physicalActivity?.work?.moderate?.daysPerWeek
                          ? 'destructive'
                          : 'default'
                      }
                    />
                  )}
                />

                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    How much time do you spend doing moderate-intensity
                    activities at work on a typical day?
                  </Text>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name="physicalActivity.work.moderate.hoursPerDay"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          max={24}
                          label="Hours"
                          labelStyle="lg:text-base text-sm"
                          variant={
                            errors?.physicalActivity?.work?.moderate
                              ?.hoursPerDay
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageCard>

      {/* Travel-Related Physical Activity */}
      <PageCard title="Travel to and from Places" bodyStyle="p-4">
        <div className="space-y-4">
          <Text className="text-sm text-gray-500">
            The next questions exclude the physical activities at work that you
            have already mentioned. Now I would like to ask you about the usual
            way you move around from place-to-place. For example to work, for
            shopping, to market, to place of worship.
          </Text>

          <Controller
            control={control}
            name="physicalActivity.travel.walking"
            render={({ field: { onChange, value } }) => (
              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  Do you walk or use a bicycle (pedal cycle) to get to and from
                  places?
                </Text>
                <Select
                  placeholder="Select an option"
                  value={value}
                  onChange={onChange}
                  options={yesNoOptions}
                  variant={
                    errors?.physicalActivity?.travel?.walking
                      ? 'destructive'
                      : 'default'
                  }
                />
              </div>
            )}
          />

          {watch('physicalActivity.travel.walking') === 'yes' && (
            <div className="space-y-4 pl-4">
              <Controller
                control={control}
                name="physicalActivity.travel.daysPerWeek"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    max={7}
                    label="In a typical week, on how many days do you walk or bicycle to get to and from places?"
                    labelStyle="lg:text-base text-sm"
                    variant={
                      errors?.physicalActivity?.travel?.daysPerWeek
                        ? 'destructive'
                        : 'default'
                    }
                  />
                )}
              />

              <div className="space-y-2">
                <Text className="lg:text-sm text-xs font-medium">
                  How much time do you spend walking or bicycling for travel on
                  a typical day?
                </Text>
                <div className="grid grid-cols-2 gap-4">
                  <Controller
                    control={control}
                    name="physicalActivity.travel.hoursPerDay"
                    render={({ field }) => (
                      <Input
                        {...field}
                        type="number"
                        min={0}
                        max={24}
                        label="Hours"
                        labelStyle="lg:text-base text-sm"
                        variant={
                          errors?.physicalActivity?.travel?.hoursPerDay
                            ? 'destructive'
                            : 'default'
                        }
                      />
                    )}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </PageCard>

      {/* Recreational Physical Activity */}
      <PageCard title="Recreational Activities" bodyStyle="p-4">
        <div className="space-y-6">
          {/* Vigorous Recreational Activities */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="physicalActivity.recreation.vigorous.does"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Do you do any vigorous-intensity sports, fitness or
                    recreational (leisure) activities that cause large increases
                    in breathing or heart rate like running or football?
                  </Text>
                  <Select
                    placeholder="Select an option"
                    value={value}
                    onChange={onChange}
                    options={yesNoOptions}
                    variant={
                      errors?.physicalActivity?.recreation?.vigorous?.does
                        ? 'destructive'
                        : 'default'
                    }
                  />
                </div>
              )}
            />

            {watch('physicalActivity.recreation.vigorous.does') === 'yes' && (
              <div className="space-y-4 pl-4">
                <Controller
                  control={control}
                  name="physicalActivity.recreation.vigorous.daysPerWeek"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={7}
                      label="In a typical week, on how many days do you do vigorous-intensity sports, fitness or recreational activities?"
                      labelStyle="lg:text-base text-sm"
                      variant={
                        errors?.physicalActivity?.recreation?.vigorous
                          ?.daysPerWeek
                          ? 'destructive'
                          : 'default'
                      }
                    />
                  )}
                />

                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    How much time do you spend doing vigorous-intensity sports,
                    fitness or recreational activities on a typical day?
                  </Text>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name="physicalActivity.recreation.vigorous.hoursPerDay"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          max={24}
                          label="Hours"
                          labelStyle="lg:text-base text-sm"
                          variant={
                            errors?.physicalActivity?.recreation?.vigorous
                              ?.hoursPerDay
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Moderate Recreational Activities */}
          <div className="space-y-4">
            <Controller
              control={control}
              name="physicalActivity.recreation.moderate.does"
              render={({ field: { onChange, value } }) => (
                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    Do you do any moderate-intensity sports, fitness or
                    recreational activities that cause a small increase in
                    breathing or heart rate such as brisk walking, swimming,
                    volleyball?
                  </Text>
                  <Select
                    placeholder="Select an option"
                    value={value}
                    onChange={onChange}
                    options={yesNoOptions}
                    variant={
                      errors?.physicalActivity?.recreation?.moderate?.does
                        ? 'destructive'
                        : 'default'
                    }
                  />
                </div>
              )}
            />

            {watch('physicalActivity.recreation.moderate.does') === 'yes' && (
              <div className="space-y-4 pl-4">
                <Controller
                  control={control}
                  name="physicalActivity.recreation.moderate.daysPerWeek"
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={7}
                      label="In a typical week, on how many days do you do moderate-intensity sports, fitness or recreational activities?"
                      labelStyle="lg:text-base text-sm"
                      variant={
                        errors?.physicalActivity?.recreation?.moderate
                          ?.daysPerWeek
                          ? 'destructive'
                          : 'default'
                      }
                    />
                  )}
                />

                <div className="space-y-2">
                  <Text className="lg:text-sm text-xs font-medium">
                    How much time do you spend doing moderate-intensity sports,
                    fitness or recreational activities on a typical day?
                  </Text>
                  <div className="grid grid-cols-2 gap-4">
                    <Controller
                      control={control}
                      name="physicalActivity.recreation.moderate.hoursPerDay"
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          min={0}
                          max={24}
                          label="Hours"
                          labelStyle="lg:text-base text-sm"
                          variant={
                            errors?.physicalActivity?.recreation?.moderate
                              ?.hoursPerDay
                              ? 'destructive'
                              : 'default'
                          }
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </PageCard>

      {/* Sedentary Behavior */}
      <PageCard title="Sedentary Behaviour" bodyStyle="p-4">
        <div className="space-y-4">
          <Text className="text-sm text-gray-500">
            The following question is about sitting or reclining at work, at
            home, getting to and from places, or with friends including time
            spent sitting at a desk, sitting with friends, traveling in car,
            bus, train, reading, playing cards or watching television, but do
            not include time spent sleeping.
          </Text>

          <div className="space-y-2">
            <Text className="lg:text-sm text-xs font-medium">
              How much time do you usually spend sitting or reclining on a
              typical day?
            </Text>
            <Controller
              control={control}
              name="physicalActivity.sedentary.hoursPerDay"
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  min={0}
                  max={24}
                  label="Hours per day"
                  labelStyle="lg:text-base text-sm"
                  variant={
                    errors?.physicalActivity?.sedentary?.hoursPerDay
                      ? 'destructive'
                      : 'default'
                  }
                />
              )}
            />
          </div>
        </div>
      </PageCard>
    </div>
  )
}
