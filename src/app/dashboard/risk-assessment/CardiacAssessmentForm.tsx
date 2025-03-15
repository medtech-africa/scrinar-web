import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Text } from '@/components/ui/text'
import { Input } from '@/components/ui/input'

export const CardiacAssessmentForm = () => {
  const { control, watch } = useFormContext()

  const hasChestPain = watch('cardiac.chestPain') === 'Yes'
  const hasChestPainLocation = watch('cardiac.chestPainLocation') === 'Yes'

  return (
    <div className="">
      <Text as="h3" variant="text/sm" className="font-medium mb-6 md:mb-8">
        Cardiac Assessment Questionnaire
      </Text>
      <div>
        <Text as="h4" variant="text/sm" className="font-medium mb-2">
          Angina or Heart Attack Assessment
        </Text>
        <OptionWithRadioField
          label="Have you ever had any pain or discomfort or any pressure or heaviness in your chest?"
          options={['Yes', 'No']}
          form={{ id: 'cardiac.chestPain' }}
        />

        {hasChestPain && (
          <>
            <OptionWithRadioField
              label="Do you get the pain in the center of the chest or left chest or left arm?"
              options={['Yes', 'No']}
              form={{ id: 'cardiac.chestPainLocation' }}
            />

            {hasChestPainLocation && (
              <>
                <OptionWithRadioField
                  label="Do you get it when you walk at an ordinary pace on level or when you walk uphill or hurry?"
                  options={['Yes', 'No']}
                  form={{ id: 'cardiac.painOnExertion' }}
                />

                <OptionWithRadioField
                  label="Do you slowdown if you get the pain while walking?"
                  options={['Yes', 'No']}
                  form={{ id: 'cardiac.slowDownWithPain' }}
                />

                <OptionWithRadioField
                  label="Does the pain go away if you stand still or if you take a tablet under the tongue?"
                  options={['Yes', 'No']}
                  form={{ id: 'cardiac.painRelievedByRest' }}
                />

                <OptionWithRadioField
                  label="Does the pain go away in less than 10 minutes?"
                  options={['Yes', 'No']}
                  form={{ id: 'cardiac.painDurationLessThan10Min' }}
                />

                <OptionWithRadioField
                  label="Have you ever had a severe chest pain across the front of your chest lasting for half an hour or more?"
                  options={['Yes', 'No']}
                  form={{ id: 'cardiac.severePainOver30Min' }}
                />
              </>
            )}
          </>
        )}
      </div>

      <div className="mt-4">
        <Text as="h4" variant="text/sm" className="font-medium mb-2">
          Stroke and TIA Assessment
        </Text>
        <OptionWithRadioField
          label="Have you ever had any of the following: difficulty in talking, weakness of arm and/or leg on one side of the body or numbness on one side of the body?"
          options={['Yes', 'No']}
          form={{ id: 'cardiac.strokeSymptoms' }}
        />
      </div>

      {/* Alert section for referral conditions */}
      {(watch('cardiac.painOnExertion') === 'Yes' ||
        watch('cardiac.slowDownWithPain') === 'Yes' ||
        watch('cardiac.painRelievedByRest') === 'Yes' ||
        watch('cardiac.painDurationLessThan10Min') === 'Yes' ||
        watch('cardiac.severePainOver30Min') === 'Yes') && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            Based on the responses, the patient may have angina or heart attack
            and needs referral.
          </p>
        </div>
      )}

      {watch('cardiac.strokeSymptoms') === 'Yes' && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 text-sm">
            Based on the responses, the patient may have had a TIA or stroke and
            needs referral.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <OptionWithRadioField
          label="Cardiovascular Disease (CVD)"
          options={['Yes', 'No']}
          form={{ id: 'familyHistory.cvd' }}
        />
        <OptionWithRadioField
          label="Diabetes"
          options={['Yes', 'No']}
          form={{ id: 'familyHistory.diabetes' }}
        />
        <OptionWithRadioField
          label="Hypertension"
          options={['Yes', 'No']}
          form={{ id: 'familyHistory.hypertension' }}
        />
        <OptionWithRadioField
          label="Cancer"
          options={['Yes', 'No']}
          form={{ id: 'familyHistory.cancer' }}
        />
        <OptionWithRadioField
          label="Stroke"
          options={['Yes', 'No']}
          form={{ id: 'familyHistory.stroke' }}
        />
        <div>
          <OptionWithRadioField
            label="Other NCDs (specify)"
            options={['Yes', 'No']}
            form={{ id: 'familyHistory.otherNcdsOption' }}
          />

          {watch('familyHistory.otherNcdsOption') === 'Yes' && (
            <Controller
              name="familyHistory.otherNcds"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Specify"
                  label="Other NCDs (specify)"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default CardiacAssessmentForm
