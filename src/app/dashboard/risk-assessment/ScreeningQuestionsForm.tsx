import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'

type Props = {
  onNext: () => void
}
export const ScreeningQuestionsForm = ({ onNext }: Props) => {
  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Medical History
      </Text>
      <Text variant="text/xs" className="text-gray-500 mb-6 md:mb-8">
        Medical, symptoms and health conditions screening questions
      </Text>
      <div>
        <Text as="h3" variant="text/sm" className="font-medium mb-6 md:mb-8">
          Symptoms and Health Conditions
        </Text>
        <div className="pb-4 gap-4 grid grid-cols-2">
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
        </div>
      </div>

      <div>
        <Text as="h3" variant="text/sm" className="font-medium mb-6 md:mb-8">
          Sleep Patterns
        </Text>
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
      </div>

      <div className="flex justify-end mt-6">
        <Button
          variant="primary"
          className="bg-red-600 hover:bg-red-700 text-white px-8"
          onClick={onNext}
          type="button"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
