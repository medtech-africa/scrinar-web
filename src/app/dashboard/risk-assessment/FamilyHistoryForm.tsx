import { Input } from '@/components/ui/input'
import React, { useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import { useRiskAssessmentStorage } from '@/hooks/useRiskAssessmentStorage'
import { slugify } from '@/utils/slugify'

type Props = {
  onNext: () => void
}

export const FamilyHistoryForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()
  const formData = watch()
  const storeRiskAssessment = useRiskAssessmentStorage((store) => store.store)

  useEffect(() => {
    console.group('I ran')
    storeRiskAssessment(
      slugify(formData.personalInfo.fullName + formData.personalInfo.gender),
      formData
    )
  }, [formData, storeRiskAssessment])

  return (
    <div title="Family History & Lifestyle">
      <Text as="h2" className="font-medium mb-2">
        Family History
      </Text>

      <div className="space-y-6">
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

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext} type="button">
          Next
        </Button>
      </div>
    </div>
  )
}
