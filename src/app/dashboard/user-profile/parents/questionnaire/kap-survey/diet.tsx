import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'

import { ParentFormData } from '@/types/questionnaire.types'
import { Control, Controller, FieldErrors, UseFormWatch } from 'react-hook-form'

// Frequency options
const frequencyOptions = [
  { value: 'always', label: 'Always' },
  { value: 'often', label: 'Often' },
  { value: 'sometimes', label: 'Sometimes' },
  { value: 'rarely', label: 'Rarely' },
  { value: 'never', label: 'Never' },
]

// Salt perception options
const saltPerceptionOptions = [
  { value: 'far-too-much', label: 'Far too much' },
  { value: 'too-much', label: 'Too much' },
  { value: 'right-amount', label: 'Just the right amount' },
  { value: 'too-little', label: 'Too little' },
  { value: 'far-too-little', label: 'Far too little' },
]

interface Props {
  control: Control<ParentFormData, ParentFormData>
  errors: FieldErrors<ParentFormData>
  watch: UseFormWatch<ParentFormData>
}

export const DietSection = ({ control, errors }: Props) => {
  return (
    <div className="space-y-6">
      <h3 className="sr-only">Diet</h3>

      {/* Fruits and Vegetables */}
      <PageCard title="Fruits and Vegetables" bodyStyle="p-4">
        <div className="space-y-4">
          <Text className="text-sm text-gray-500 mb-4">
            The next questions ask about the fruits and vegetables that you
            usually eat. I have a nutrition card here that shows you some
            examples of local fruits and vegetables. Each picture represents the
            size of a serving. As you answer these questions please think of a
            typical week in the last year.
          </Text>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Fruits */}
            <div className="space-y-4">
              <Text className="font-medium">Fruits</Text>
              <Controller
                control={control}
                name="diet.fruits.daysPerWeek"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    max={7}
                    label="In a typical week, on how many days do you eat fruit?"
                    labelStyle="lg:text-base text-sm"
                    placeholder="Enter number of days (0-7)"
                    variant={
                      errors?.diet?.fruits?.daysPerWeek
                        ? 'destructive'
                        : 'default'
                    }
                    message={
                      errors?.diet?.fruits?.daysPerWeek &&
                      'Please enter a valid number of days'
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="diet.fruits.servingsPerDay"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    label="How many servings of fruit do you eat on one of those days?"
                    labelStyle="lg:text-base text-sm"
                    placeholder="Enter number of servings"
                    helperText="Think of one day you can recall easily. Refer to the showcard for serving sizes."
                    variant={
                      errors?.diet?.fruits?.servingsPerDay
                        ? 'destructive'
                        : 'default'
                    }
                    message={
                      errors?.diet?.fruits?.servingsPerDay &&
                      'Please enter a valid number of servings'
                    }
                  />
                )}
              />
            </div>

            {/* Vegetables */}
            <div className="space-y-4">
              <Text className="font-medium">Vegetables</Text>
              <Controller
                control={control}
                name="diet.vegetables.daysPerWeek"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    max={7}
                    label="In a typical week, on how many days do you eat vegetables?"
                    labelStyle="lg:text-base text-sm"
                    placeholder="Enter number of days (0-7)"
                    variant={
                      errors?.diet?.vegetables?.daysPerWeek
                        ? 'destructive'
                        : 'default'
                    }
                    message={
                      errors?.diet?.vegetables?.daysPerWeek &&
                      'Please enter a valid number of days'
                    }
                  />
                )}
              />

              <Controller
                control={control}
                name="diet.vegetables.servingsPerDay"
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    min={0}
                    label="How many servings of vegetables do you eat on one of those days?"
                    labelStyle="lg:text-base text-sm"
                    placeholder="Enter number of servings"
                    helperText="Think of one day you can recall easily. Refer to the showcard for serving sizes."
                    variant={
                      errors?.diet?.vegetables?.servingsPerDay
                        ? 'destructive'
                        : 'default'
                    }
                    message={
                      errors?.diet?.vegetables?.servingsPerDay &&
                      'Please enter a valid number of servings'
                    }
                  />
                )}
              />
            </div>
          </div>
        </div>
      </PageCard>

      {/* Dietary Salt */}
      <PageCard title="Dietary Salt" bodyStyle="p-4">
        <div className="space-y-6">
          <Text className="text-sm text-gray-500">
            With the next questions, we would like to learn more about salt in
            your diet. Dietary salt includes ordinary table salt, unrefined salt
            such as sea salt, iodized salt, salty seasonings such as maggi,
            knorr (see showcard).
          </Text>

          <Text className="text-sm text-gray-500">
            The following questions are on adding salt to the food right before
            you eat it, on how food is prepared in your home, on eating
            processed foods that are high in salt such as noodles, hot dog, and
            questions on controlling your salt intake. Please answer the
            questions even if you consider yourself to eat a diet low in salt.
          </Text>

          <div className="space-y-4">
            <Controller
              control={control}
              name="diet.salt.addingSalt"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select frequency"
                  label="How often do you add salt or a salty sauce such as soy sauce to your food right before you eat it or as you are eating it?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={frequencyOptions}
                  variant={
                    errors?.diet?.salt?.addingSalt ? 'destructive' : 'default'
                  }
                  message={
                    errors?.diet?.salt?.addingSalt && 'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="diet.salt.cookingSalt"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select frequency"
                  label="How often is salt, seasoning cubes/powder or a salty sauce added in cooking or preparing foods in your household?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={frequencyOptions}
                  variant={
                    errors?.diet?.salt?.cookingSalt ? 'destructive' : 'default'
                  }
                  message={
                    errors?.diet?.salt?.cookingSalt && 'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="diet.salt.processedFood"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select frequency"
                  label="How often do you eat processed food high in salt? E.g., indomie, hot dog, suya, snacks like pringles, salty crackers biscuits"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={frequencyOptions}
                  variant={
                    errors?.diet?.salt?.processedFood
                      ? 'destructive'
                      : 'default'
                  }
                  message={
                    errors?.diet?.salt?.processedFood &&
                    'Please select an option'
                  }
                />
              )}
            />

            <Controller
              control={control}
              name="diet.salt.perception"
              render={({ field: { onChange, ...rest } }) => (
                <Select
                  placeholder="Select perception"
                  label="How much salt or salty sauce do you think you consume?"
                  labelStyle="lg:text-base text-sm"
                  {...rest}
                  onChange={(val) => onChange(val)}
                  options={saltPerceptionOptions}
                  variant={
                    errors?.diet?.salt?.perception ? 'destructive' : 'default'
                  }
                  message={
                    errors?.diet?.salt?.perception && 'Please select an option'
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
