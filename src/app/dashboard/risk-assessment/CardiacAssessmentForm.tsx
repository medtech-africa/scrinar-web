import React from 'react'
import { PageCard } from '@/components/ui/page-card'
import { useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'

export const CardiacAssessmentForm = () => {
  const { watch } = useFormContext()

  const hasChestPain = watch('cardiac.chestPain') === 'Yes'
  const hasChestPainLocation = watch('cardiac.chestPainLocation') === 'Yes'

  return (
    <PageCard
      title="Cardiac Assessment Questionnaire"
      bodyStyle="px-4 pb-4 mt-4"
    >
      <PageCard
        title="Angina or Heart Attack Assessment"
        bodyStyle="px-4 pb-4 gap-4 grid grid-cols-1"
      >
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
      </PageCard>

      <PageCard
        title="Stroke and TIA Assessment"
        bodyStyle="px-4 mt-4 pb-4 gap-4 grid grid-cols-1"
      >
        <OptionWithRadioField
          label="Have you ever had any of the following: difficulty in talking, weakness of arm and/or leg on one side of the body or numbness on one side of the body?"
          options={['Yes', 'No']}
          form={{ id: 'cardiac.strokeSymptoms' }}
        />
      </PageCard>

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
    </PageCard>
  )
}

export default CardiacAssessmentForm
