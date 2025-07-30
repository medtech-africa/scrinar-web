import React from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useNcdFilter } from './NcdFilterContext'
import calculateAge from '@/utils/calculateAge'
import { OptionWithRadioField } from './OptionWithRadioField'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
  disabled?: boolean
}

export const DiabetesAssessmentForm = ({ onNext, disabled }: Props) => {
  const { watch } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()
  const isRequiredField = useRequiredFieldLabel()

  // Only show this form for diabetes
  if (!hasNcdSelected(NCD.DIABETES)) {
    return null
  }

  // Get values from other sections
  const formData = watch()
  const dateOfBirth = formData?.personalInfo?.dateOfBirth
  const age = dateOfBirth ? calculateAge(dateOfBirth) : null
  const waist = formData?.vitals?.waist
  const bmi = formData?.vitals?.bmi
  const physicalActivity = formData?.lifestyle?.hasDailyPhysicalActivity
  const eatsFruitVegetableDaily = formData?.lifestyle?.vegetableServingsPerWeek
  const hasFamilyhistoryDiabetes = formData?.familyHistory?.diabetes

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Diabetes Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Evaluates risk factors for type 2 diabetes using validated risk
        assessment tools
      </Text>

      <div className="space-y-8">
        {/* Contributing Information Display */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Contributing Information from Other Sections
          </Text>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Age:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {age ? `${age} years` : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Waist Circumference:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {waist ? `${waist} cm` : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                BMI:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {bmi ? `${bmi} kg/m²` : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Physical Activity:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {physicalActivity ? physicalActivity : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Fruit/Vegetable Consumption:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {eatsFruitVegetableDaily
                  ? eatsFruitVegetableDaily
                  : 'Not provided'}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text variant="text/sm" className="text-gray-600">
                Family History of Diabetes:
              </Text>
              <Text variant="text/sm" className="font-medium">
                {hasFamilyhistoryDiabetes
                  ? hasFamilyhistoryDiabetes
                  : 'Not provided'}
              </Text>
            </div>
          </div>
          {(!age ||
            !waist ||
            !bmi ||
            !physicalActivity ||
            !eatsFruitVegetableDaily ||
            !hasFamilyhistoryDiabetes) && (
            <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <Text variant="text/sm" className="text-yellow-800">
                ⚠️ Please complete the Personal Information, Vitals &
                Measurements, Lifestyle Habits, and Family History sections to
                enable diabetes assessment.
              </Text>
            </div>
          )}
        </div>

        {/* Diabetes-Specific Questions */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Diabetes-Specific Risk Factors
          </Text>
          <div className="gap-4 grid grid-cols-1 lg:grid-cols-2">
            <OptionWithRadioField
              label={isRequiredField(
                'Are you currently taking antihypertensive medication (blood pressure medication)?',
                'lifestyle.usesAntihypertensiveMedication',
                formData
              )}
              options={['Yes', 'No']}
              form={{ id: 'lifestyle.usesAntihypertensiveMedication' }}
              disabled={disabled}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Have you ever been told by a healthcare provider that you have high blood glucose or prediabetes?',
                'previousHealthScreening.hasHistoryHighBloodGlucose',
                formData
              )}
              options={['Yes', 'No']}
              form={{
                id: 'previousHealthScreening.hasHistoryHighBloodGlucose',
              }}
              disabled={disabled}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        {!disabled && (
          <Button className="px-8" onClick={onNext} type="button">
            Save & continue
          </Button>
        )}
      </div>
    </div>
  )
}
