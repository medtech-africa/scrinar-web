import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { Select } from '@/components/ui/select'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'

type Props = {
  onNext: () => void
  disabled?: boolean
}

export const ColorectalCancerAssessmentForm = ({ onNext, disabled }: Props) => {
  const { register: customRegister, watch, setValue } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()
  const gender = watch('personalInfo.gender')?.toLowerCase()

  // Only show this form for Colorectal Cancer
  if (!hasNcdSelected(NCD.COLORECTAL_CANCER)) {
    return null
  }

  const hasBeenDiagnosedWithColorectalCancer = watch(
    'colorectalCancer.personalHistory'
  )

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Colorectal Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Estimates 5-year and lifetime risk
      </Text>

      <div className="space-y-6">
        {/* Personal History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Personal History
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Have you ever been diagnosed with colorectal cancer?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.personalHistory' }}
              disabled={disabled}
            />
            {hasBeenDiagnosedWithColorectalCancer === 'Yes' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <Text variant="text/sm" className="text-yellow-800">
                  <strong>Note:</strong> This risk assessment tool is designed
                  for individuals without a prior diagnosis of colorectal
                  cancer.
                </Text>
              </div>
            )}
          </div>
        </div>
        {hasBeenDiagnosedWithColorectalCancer === 'No' && (
          <>
            {/* Family History */}
            <div>
              <Text as="h3" variant="text/sm" className="font-medium mb-4">
                Family History
              </Text>
              <div className="space-y-4">
                <OptionWithRadioField
                  label="Have any of your first-degree relatives (parents, siblings, children) been diagnosed with colorectal cancer?"
                  options={['Yes', 'No']}
                  form={{
                    id: 'colorectalCancer.familyHistoryColorectalCancer',
                  }}
                  disabled={disabled}
                />

                {watch('colorectalCancer.familyHistoryColorectalCancer') ===
                  'Yes' && (
                  <OptionWithRadioField
                    label="How many of these relatives had cancer of the colon or rectum (cancer of the lower intestine)?"
                    options={['1', '2 or more', "I don't know"]}
                    form={{ id: 'colorectalCancer.numberOfRelatives' }}
                    disabled={disabled}
                  />
                )}

                <OptionWithRadioField
                  label="Have any of your first-degree relatives had colorectal polyps removed?"
                  options={['Yes', 'No']}
                  form={{ id: 'colorectalCancer.familyHistoryPolyps' }}
                  disabled={disabled}
                />
              </div>
            </div>

            {/* Medical History */}
            <div>
              <Text as="h3" variant="text/sm" className="font-medium mb-4">
                Medical History
              </Text>
              <div className="space-y-4">
                <OptionWithRadioField
                  label="During the past 10 years, have you had a colonoscopy, sigmoidoscopy, or both?"
                  options={['Yes', 'No', "I don't Know"]}
                  form={{ id: 'colorectalCancer.colonoscopyHistory' }}
                  disabled={disabled}
                />

                {watch('colorectalCancer.colonoscopyHistory') === 'Yes' && (
                  <OptionWithRadioField
                    label="In the past 10 years, did a healthcare provider tell the patient that he or she had a colon or rectal polyp?"
                    options={['Yes', 'No']}
                    form={{ id: 'colorectalCancer.personalHistoryPolyps' }}
                    disabled={disabled}
                  />
                )}

                <OptionWithRadioField
                  label="In the past 10 years, did a healthcare provider tell you that you have a colon or rectal polyp?"
                  options={['Yes', 'No', "I don't Know"]}
                  form={{ id: 'colorectalCancer.polypDiagnosis' }}
                  disabled={disabled}
                />
              </div>
            </div>

            {/* Medication Use */}
            <div>
              <Text as="h3" variant="text/sm" className="font-medium mb-4">
                Medication Use
              </Text>
              <div className="space-y-4 mt-4">
                <OptionWithRadioField
                  label="During the past 30 days, did you take medications containing aspirin at least 3 times a week?  such as: Vasoprin, Bufferin, Bayer, Excedrin, Other generic forms?"
                  options={['Yes', 'No']}
                  form={{ id: 'colorectalCancer.aspirinUse' }}
                  disabled={disabled}
                />

                <OptionWithRadioField
                  label="During the past 30 days, did you take medications that do not contain aspirin at least 3 times a week?"
                  options={['Yes', 'No']}
                  form={{ id: 'colorectalCancer.nsaidUse' }}
                  disabled={disabled}
                />
              </div>
              {/* Female specific questions */}
              {gender === 'female' && (
                <>
                  <OptionWithRadioField
                    label="Does the patient still have periods?"
                    options={['Yes', 'No']}
                    form={{ id: 'colorectalCancer.hasPeriods' }}
                    disabled={disabled}
                  />

                  {watch('colorectalCancer.hasPeriods') === 'No' && (
                    <div className="mt-4">
                      <Select
                        {...customRegister('colorectalCancer.lastPeriod')}
                        label="When did the patient have her last period"
                        options={convertStringsToOptionArray([
                          'Within the last year',
                          'Between 1 and 2 years ago',
                          '2 or more years ago',
                        ])}
                        value={{
                          value: watch('colorectalCancer.lastPeriod'),
                          label: watch('colorectalCancer.lastPeriod'),
                        }}
                        onChange={(selectedOption: any) => {
                          const value = selectedOption.value
                          setValue('colorectalCancer.lastPeriod', value)
                        }}
                      />
                      <div className="mt-4">
                        <OptionWithRadioField
                          label="During the past two years, has the patient used estrogen, progestin, or other female hormones (These hormones may be given as hormone pills, oral contraceptives, shots, skin patches, vaginal creams, or as vaginal suppositories)"
                          options={['Yes', 'No']}
                          form={{ id: 'colorectalCancer.usedFemaleHormones' }}
                          disabled={disabled}
                        />
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </>
        )}
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
