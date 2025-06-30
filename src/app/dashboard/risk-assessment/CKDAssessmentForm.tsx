import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Controller, useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
}

export const CKDAssessmentForm = ({ onNext }: Props) => {
  const { control } = useFormContext()
  const { selectedNcd } = useNcdFilter()

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
        CKD-EPI 2021 Equation - Estimates glomerular filtration rate (eGFR) to
        assess kidney function
      </Text>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <Text variant="text/sm" className="text-blue-800">
          <strong>Note:</strong> The 2021 CKD-EPI equation has removed race as a
          factor, providing more accurate estimates for all populations.
        </Text>
      </div>

      <div className="space-y-6">
        {/* Serum Creatinine */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Laboratory Values
          </Text>
          <Controller
            name="ckd.serumCreatinine"
            control={control}
            rules={{
              required: selectedNcd === NCD.CKD || selectedNcd === 'all',
              min: {
                value: 0.1,
                message: 'Creatinine must be greater than 0.1',
              },
              max: { value: 20, message: 'Creatinine must be less than 20' },
            }}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                step="0.01"
                placeholder="mg/dL"
                label="Serum Creatinine (mg/dL)"
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />
        </div>

        {/* Additional CKD Risk Factors */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Additional Risk Factors
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Do you have diabetes?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.diabetes' }}
            />

            <OptionWithRadioField
              label="Do you have hypertension (high blood pressure)?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.hypertension' }}
            />

            <OptionWithRadioField
              label="Do you have a family history of kidney disease?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.familyHistory' }}
            />

            <OptionWithRadioField
              label="Do you have cardiovascular disease?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.cardiovascularDisease' }}
            />

            <OptionWithRadioField
              label="Do you take medications that may affect kidney function?"
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
              label="Do you experience fatigue or weakness?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptoms.fatigue' }}
            />

            <OptionWithRadioField
              label="Do you experience swelling in your feet, ankles, or hands?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptoms.swelling' }}
            />

            <OptionWithRadioField
              label="Do you experience shortness of breath?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptoms.shortnessOfBreath' }}
            />

            <OptionWithRadioField
              label="Do you experience changes in urination (frequency, color, or amount)?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptoms.urinationChanges' }}
            />

            <OptionWithRadioField
              label="Do you experience nausea or loss of appetite?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptoms.nausea' }}
            />

            <OptionWithRadioField
              label="Do you experience muscle cramps or twitches?"
              options={['Yes', 'No']}
              form={{ id: 'ckd.symptoms.muscleCramps' }}
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
          Next
        </Button>
      </div>
    </div>
  )
}
