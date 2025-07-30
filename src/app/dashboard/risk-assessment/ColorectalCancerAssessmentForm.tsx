import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
  disabled?: boolean
}

export const ColorectalCancerAssessmentForm = ({ onNext, disabled }: Props) => {
  const { watch } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()

  // Only show this form for Colorectal Cancer
  if (!hasNcdSelected(NCD.COLORECTAL_CANCER)) {
    return null
  }

  const hasBeenDiagnosedWithColorectalCancer = watch(
    'colorectalCancer.personalHistory'
  )

  // If patient has been diagnosed with colorectal cancer, show warning and skip form
  if (hasBeenDiagnosedWithColorectalCancer === 'Yes') {
    return (
      <div>
        <Text as="h2" className="font-medium mb-2">
          Colorectal Cancer Risk Assessment
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
          Not validated for patients with prior colorectal cancer diagnosis
        </Text>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <Text variant="text/sm" className="text-yellow-800">
            <strong>Note:</strong> This risk assessment tool is designed for
            individuals without a prior diagnosis of colorectal cancer.
          </Text>
        </div>

        <div className="flex justify-end mt-6">
          <Button className="px-8" onClick={onNext} type="button">
            Next
          </Button>
        </div>
      </div>
    )
  }

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

            <OptionWithRadioField
              label="Have you ever had colorectal polyps removed?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.personalHistoryPolyps' }}
              disabled={disabled}
            />

            <OptionWithRadioField
              label="Have you been diagnosed with inflammatory bowel disease (Crohn's disease or ulcerative colitis)?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.inflammatoryBowelDisease' }}
              disabled={disabled}
            />
          </div>
        </div>

        {/* Family History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Family History
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Have any of your first-degree relatives (parents, siblings, children) been diagnosed with colorectal cancer?"
              options={['Yes', 'No']}
              form={{ id: 'colorectalCancer.familyHistoryColorectalCancer' }}
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
          <div className="space-y-4">
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
        </div>
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
