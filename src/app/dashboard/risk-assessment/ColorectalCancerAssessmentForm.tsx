import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { Select } from '@/components/ui/select'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'

type Props = {
  onNext: () => void
}

export const ColorectalCancerAssessmentForm = ({ onNext }: Props) => {
  const { watch, setValue } = useFormContext()
  const { selectedNcd } = useNcdFilter()

  // Only show this form for Colorectal Cancer or all NCDs
  if (selectedNcd !== 'all' && selectedNcd !== NCD.COLORECTAL_CANCER) {
    return null
  }

  const hasBeenDiagnosedWithColorectalCancer = watch(
    'colorectalCancer.personalHistory'
  )

  // If patient has been diagnosed with colorectal cancer, show warning and skip form
  if (hasBeenDiagnosedWithColorectalCancer === 'Yes') {
    return (
      <div>
        <Text as="h2" className="font-medium mb-2">
          Colorectal Cancer Risk Assessment
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
          NCI Colorectal Cancer Risk Assessment Tool (CCRAT) - Not validated for
          patients with prior colorectal cancer diagnosis
        </Text>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <Text variant="text/sm" className="text-yellow-800">
            <strong>Note:</strong> This risk assessment tool is designed for
            individuals without a prior diagnosis of colorectal cancer.
          </Text>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="px-8" onClick={onNext} type="button">
            Next
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Colorectal Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        NCI Colorectal Cancer Risk Assessment Tool (CCRAT) - Estimates 5-year
        and lifetime risk
      </Text>

      <div className="space-y-6">
        {/* Personal History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Personal History
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Have you ever been diagnosed with colorectal cancer?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.personalHistory' }}
            />

            <OptionWithRadioField
              label="Have you ever had colorectal polyps removed?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.personalHistoryPolyps' }}
            />

            <OptionWithRadioField
              label="Have you been diagnosed with inflammatory bowel disease (Crohn's disease or ulcerative colitis)?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.inflammatoryBowelDisease' }}
            />
          </div>
        </div>

        {/* Family History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Family History
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Have any of your first-degree relatives (parents, siblings, children) been diagnosed with colorectal cancer?"
              options={['Yes', 'No']}
              form={{ id: 'familyHistory.colorectalCancer' }}
            />

            <OptionWithRadioField
              label="Have any of your first-degree relatives had colorectal polyps removed?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.familyHistoryPolyps' }}
            />

            {watch('familyHistory.colorectalCancer') === 'Yes' && (
              <Select
                label="How many of these relatives had cancer of the colon or rectum?"
                options={convertStringsToOptionArray([
                  '1',
                  '2 or more',
                  "I don't know",
                ])}
                value={{
                  value: watch('colorectalCancer.numberOfRelatives'),
                  label: watch('colorectalCancer.numberOfRelatives'),
                }}
                onChange={(selectedOption: any) => {
                  const value = selectedOption.value
                  setValue('colorectalCancer.numberOfRelatives', value)
                }}
              />
            )}
          </div>
        </div>

        {/* Smoking Status */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Smoking Status
          </Text>
          <OptionWithRadioField
            label="Do you currently smoke cigarettes?"
            options={[
              'Yes, currently smoking',
              'Former smoker',
              'Never smoked',
            ]}
            form={{ id: 'colorectalCancer.smokingStatus' }}
          />
        </div>

        {/* Diet and Physical Activity */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Diet and Physical Activity
          </Text>
          <div className="space-y-4">
            <Select
              label="In the last month, about how many servings of vegetables or leafy green salads did you eat per week?"
              options={convertStringsToOptionArray([
                'None',
                'Less than 1 serving/week',
                '1-2 servings/week',
                '3-4 servings/week',
                '5-6 servings/week',
                '7-10 servings/week',
                'More than 10 servings/week',
              ])}
              value={{
                value: watch('colorectalCancer.vegetableConsumption'),
                label: watch('colorectalCancer.vegetableConsumption'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('colorectalCancer.vegetableConsumption', value)
              }}
            />

            <Select
              label="In the last month, how much did you usually eat in each serving of vegetables or leafy green salads?"
              options={convertStringsToOptionArray([
                '½ cup or less',
                'Between ½ cup - 1½ cups',
                '1½ cups - 3 cups',
                '3 cups - 5 cups',
                'More than 5 cups',
              ])}
              value={{
                value: watch('colorectalCancer.vegetableServingSize'),
                label: watch('colorectalCancer.vegetableServingSize'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('colorectalCancer.vegetableServingSize', value)
              }}
            />

            <Select
              label="In the last year, in how many months did you do any kind of moderate physical activity?"
              options={convertStringsToOptionArray([
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
              ])}
              value={{
                value: watch('colorectalCancer.moderateActivityMonths'),
                label: watch('colorectalCancer.moderateActivityMonths'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('colorectalCancer.moderateActivityMonths', value)
              }}
            />

            {watch('colorectalCancer.moderateActivityMonths') !== '0' && (
              <Select
                label="During those months, on average, about how many hours per week did you do moderate physical activities?"
                options={convertStringsToOptionArray([
                  'Up to 1 hour/week',
                  'Between 1 - 2 hours/week',
                  '2 - 3 hours/week',
                  '3 - 4 hours/week',
                  'More than 4 hours/week',
                ])}
                value={{
                  value: watch('colorectalCancer.moderateActivityHours'),
                  label: watch('colorectalCancer.moderateActivityHours'),
                }}
                onChange={(selectedOption: any) => {
                  const value = selectedOption.value
                  setValue('colorectalCancer.moderateActivityHours', value)
                }}
              />
            )}

            <Select
              label="In the last year, in how many months, if any, did you do any kind of vigorous activity?"
              options={convertStringsToOptionArray([
                '0',
                '1',
                '2',
                '3',
                '4',
                '5',
                '6',
                '7',
                '8',
                '9',
                '10',
                '11',
                '12',
              ])}
              value={{
                value: watch('colorectalCancer.vigorousActivityMonths'),
                label: watch('colorectalCancer.vigorousActivityMonths'),
              }}
              onChange={(selectedOption: any) => {
                const value = selectedOption.value
                setValue('colorectalCancer.vigorousActivityMonths', value)
              }}
            />

            {watch('colorectalCancer.vigorousActivityMonths') !== '0' && (
              <Select
                label="During those months, on average, about how many hours per week did you do vigorous physical activities?"
                options={convertStringsToOptionArray([
                  'Up to 1 hour/week',
                  'Between 1 - 2 hours/week',
                  '2 - 3 hours/week',
                  '3 - 4 hours/week',
                  'More than 4 hours/week',
                ])}
                value={{
                  value: watch('colorectalCancer.vigorousActivityHours'),
                  label: watch('colorectalCancer.vigorousActivityHours'),
                }}
                onChange={(selectedOption: any) => {
                  const value = selectedOption.value
                  setValue('colorectalCancer.vigorousActivityHours', value)
                }}
              />
            )}
          </div>
        </div>

        {/* Medical History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Medical History
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="During the past 10 years, have you had a colonoscopy, sigmoidoscopy, or both?"
              options={['Yes', 'No', "I don't Know"]}
              form={{ id: 'colorectalCancer.colonoscopyHistory' }}
            />

            <OptionWithRadioField
              label="In the past 10 years, did a healthcare provider tell you that you have a colon or rectal polyp?"
              options={['Yes', 'No', "I don't Know"]}
              form={{ id: 'colorectalCancer.polypDiagnosis' }}
            />
          </div>
        </div>

        {/* Medication Use */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Medication Use
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="During the past 30 days, did you take medications containing aspirin at least 3 times a week?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.aspirinUse' }}
            />

            <OptionWithRadioField
              label="During the past 30 days, did you take medications that do not contain aspirin at least 3 times a week?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.nsaidUse' }}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext} type="button">
          Next
        </Button>
      </div>
    </div>
  )
}
