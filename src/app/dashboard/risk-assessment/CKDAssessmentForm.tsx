import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'

type Props = {
  onNext: () => void
}

export const CKDAssessmentForm = ({ onNext }: Props) => {
  const { selectedNcd } = useNcdFilter()
  const isRequiredField = useRequiredFieldLabel()

  // Only show this form for CKD or all NCDs
  if (selectedNcd !== 'all' && selectedNcd !== NCD.CKD) {
    return null
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Chronic Kidney Disease (CKD) Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Estimates glomerular filtration rate (eGFR) to assess kidney function
      </Text>

      {/* <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <Text variant="text/sm" className="text-blue-800">
          <strong>Note:</strong> The 2021 CKD-EPI equation has removed race as a
          factor, providing more accurate estimates for all populations.
        </Text>
      </div> */}

      <div className="space-y-6">
        {/* Additional CKD Risk Factors */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Additional Risk Factors
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label={isRequiredField('Do you have diabetes?', 'ckd.diabetes')}
              options={['Yes', 'No']}
              form={{ id: 'symptoms.diabetes' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you have hypertension (high blood pressure)?',
                'ckd.hypertension'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.hypertension' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you have a family history of kidney disease?',
                'ckd.familyHistoryKidneyDisease'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.familyHistory' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you have cardiovascular disease?',
                'ckd.cardiovascularDisease'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.cardiovascularDisease' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you take medications that may affect kidney function?',
                'ckd.medicationsAffectingKidney'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.medications' }}
            />
          </div>
        </div>

        {/* Symptoms Assessment */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Symptoms Assessment
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label={isRequiredField(
                'Do you experience fatigue or weakness?',
                'ckd.fatigue'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptomsFatigue' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you experience swelling in your feet, ankles, or hands?',
                'ckd.swelling'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptomsSwelling' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you experience shortness of breath?',
                'ckd.shortnessOfBreath'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptomsShortnessOfBreath' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                'Do you experience changes in urination (frequency, color, or amount)?',
                'ckd.urinationChanges'
              )}
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptomsUrinationChanges' }}
            />

            <OptionWithRadioField
              label="Do you experience nausea or loss of appetite?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptomsNausea' }}
            />

            <OptionWithRadioField
              label="Do you experience muscle cramps or twitches?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptomsMuscleCramps' }}
            />
          </div>
        </div>

        {/* Lifestyle Factors */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Lifestyle Factors
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Do you currently smoke?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.smoking' }}
            />

            <OptionWithRadioField
              label="Do you consume alcohol regularly?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.alcohol' }}
            />

            <OptionWithRadioField
              label="Do you follow a low-sodium diet?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.lowSodiumDiet' }}
            />

            <OptionWithRadioField
              label="Do you exercise regularly?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.exercise' }}
            />
          </div>
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
