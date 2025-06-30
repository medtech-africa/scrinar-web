import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
}

export const COPDAssessmentForm = ({ onNext }: Props) => {
  const { selectedNcd } = useNcdFilter()

  // Only show this form for COPD or all NCDs
  if (selectedNcd !== 'all' && selectedNcd !== NCD.COPD) {
    return null
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        COPD Assessment Questionnaire
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Five-Item Questionnaire for Chronic Obstructive Pulmonary Disease (COPD)
        Risk Assessment
      </Text>

      <div className="space-y-6">
        <Text as="h3" variant="text/sm" className="font-medium mb-4">
          Respiratory Symptoms Assessment
        </Text>

        <div className="space-y-4">
          <OptionWithRadioField
            label="In the past 12 months, have you had a cough that lasted more than 3 months?"
            options={['Yes', 'No']}
            form={{ id: 'copd.coughDuration' }}
          />

          <OptionWithRadioField
            label="In the past 12 months, have you had shortness of breath that gets worse with physical activity?"
            options={['Yes', 'No']}
            form={{ id: 'copd.shortnessOfBreath' }}
          />

          <OptionWithRadioField
            label="Do you experience limitations in your daily activities due to breathing problems?"
            options={['Yes', 'No']}
            form={{ id: 'copd.activityLimitations' }}
          />

          <OptionWithRadioField
            label="Have you been exposed to dust, fumes, or chemicals at work or home?"
            options={['Yes', 'No']}
            form={{ id: 'copd.exposureToDust' }}
          />

          <OptionWithRadioField
            label="Have you ever smoked cigarettes?"
            options={['Yes', 'No']}
            form={{ id: 'copd.everSmoked' }}
          />
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
