import { PageCard } from '@/components/ui/page-card'
import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'

export const ScreeningQuestionsForm = () => {
  // const { control, watch } = useFormContext()

  return (
    <PageCard title="Screening Questions">
      <PageCard
        title="Symptoms and Health Conditions"
        bodyStyle="px-4 pb-4 gap-4 grid grid-cols-2"
      >
        <OptionWithRadioField
          label="Do you experience chest pain or discomfort?"
          options={[
            'No, I do not experience chest pain or discomfort',
            'Yes, but only during physical activity or stress, and it goes away with rest or medication',
            'Yes, sometimes even at rest, and it does not always improve with rest or medication',
            'Yes, it is severe and persistent',
          ]}
          form={{ id: 'symptoms.chestPain' }}
        />
        <OptionWithRadioField
          label="Do you experience shortness of breath?"
          options={[
            'No difficulty breathing during normal activities',
            'Mild difficulty breathing during moderate physical activity (e.g., climbing stairs, walking briskly)',
            'Moderate difficulty breathing with minimal physical activit (e.g., walking short distances, light housework)',
            'Severe difficulty breathing even at rest',
          ]}
          form={{ id: 'symptoms.shortnessOfBreath' }}
        />
        <OptionWithRadioField
          label="Do you experience an irregular heartbeat?"
          options={['Yes', 'No']}
          form={{ id: 'symptoms.irregularHeartbeat' }}
        />

        {/* Diagnosed Health Conditions */}
        <OptionWithRadioField
          label="Do you have hypertension?"
          options={['Yes', 'No']}
          form={{ id: 'diagnosedConditions.hypertension' }}
        />
        <OptionWithRadioField
          label="Do you have diabetes?"
          options={['Yes', 'No']}
          form={{ id: 'diagnosedConditions.diabetes' }}
        />
        <OptionWithRadioField
          label="Do you have high cholesterol?"
          options={['Yes', 'No']}
          form={{ id: 'diagnosedConditions.highCholesterol' }}
        />
      </PageCard>

      <PageCard title="Sleep Patterns" bodyStyle="px-4 pb-4">
        {/* Sleep Patterns */}
        <OptionWithRadioField
          label="How many hours do you sleep per night on average?"
          options={[
            'Less than 5 hours',
            '5-7 hours',
            '7-9 hours',
            'More than 9 hours',
          ]}
          form={{ id: 'sleepPatterns.hoursPerNight' }}
        />
      </PageCard>
    </PageCard>
  )
}
