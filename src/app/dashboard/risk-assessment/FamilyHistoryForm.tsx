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
      <Text variant="text/sm" className="text-gray-500 mb-4">
        Family History of NCDs (History of NCDs in First Degree relatives eg
        mother, father, brother or sister.)
      </Text>

      {/* Clear Instructions */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <Text variant="text/sm" className="text-blue-800 font-medium mb-2">
          📋 Instructions for Data Collection
        </Text>
        <Text variant="text/sm" className="text-blue-700">
          Please ask patient or caregiver about each of the following symptoms
          or conditions. If the patient is unsure about any family history,
          select &quot;Don&apos;t Know&quot; rather than guessing.
        </Text>
      </div>
      {/* Helper Text for Family Definition */}
      <div className="mb-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
        <Text variant="text/sm" className="text-gray-600">
          <span className="font-medium">Family includes:</span> parents,
          siblings, grandparents, aunts, uncles, and first cousins.
        </Text>
      </div>

      <div className="space-y-6">
        <div>
          <Text variant="text/sm" className="text-gray-500 mb-4">
            Does anyone in your family have or had any of the following
            conditions?
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <OptionWithRadioField
              label="Cardiovascular Disease (CVD)"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.cvd' }}
            />
            <OptionWithRadioField
              label="Diabetes (Type 1 or Type 2)"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.diabetes' }}
            />
            <OptionWithRadioField
              label="Hypertension (High Blood Pressure)"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.hypertension' }}
            />
            <OptionWithRadioField
              label="Cancer"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.cancer' }}
            />
            <OptionWithRadioField
              label="Breast Cancer"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.breastCancer' }}
            />
            <OptionWithRadioField
              label="Ovarian Cancer"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.ovarianCancer' }}
            />
            <OptionWithRadioField
              label="Prostate Cancer"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.prostateCancer' }}
            />
            <OptionWithRadioField
              label="Colorectal Cancer"
              options={['Yes', 'No', "Don't Know"]}
              form={{ id: 'familyHistory.colorectalCancer' }}
            />
            <OptionWithRadioField
              label="Stroke"
              options={['Yes', 'No', "Don't Know"]}
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
          {/* Family History Timeline */}
          <div className="mt-6">
            <Text as="h3" variant="text/md" className="font-medium mb-3">
              Family History Timeline
            </Text>
            <Controller
              name="familyHistory.timeline"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  placeholder="Enter records of family members diagnosed with NCDs and their age at diagnosis (e.g., Father - Diabetes at age 45, Mother - Hypertension at age 50)"
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                ></textarea>
              )}
            />
            <Text variant="text/sm" className="text-gray-500 mt-2">
              Please include: family member, condition, age at diagnosis, and
              current status (if known)
            </Text>
          </div>
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Text variant="text/sm" className="text-green-700">
              💡 <span className="font-medium">Tip:</span> If you&apos;re unsure
              about any family history, it&apos;s better to select
              &quot;Don&apos;t Know&quot; than to guess. This helps maintain
              data quality.
            </Text>
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
