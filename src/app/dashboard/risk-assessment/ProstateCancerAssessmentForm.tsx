import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Controller, useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'

type Props = {
  onNext: () => void
}

export const ProstateCancerAssessmentForm = ({ onNext }: Props) => {
  const { control } = useFormContext()
  const { selectedNcd } = useNcdFilter()
  const isRequiredField = useRequiredFieldLabel()

  // Only show this form for Prostate Cancer or all NCDs
  if (selectedNcd !== 'all' && selectedNcd !== NCD.PROSTATE_CANCER) {
    return null
  }

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Prostate Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Estimates risk of prostate cancer and likelihood of aggressive disease
      </Text>

      <div className="space-y-6">
        {/* Family History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Family History
          </Text>
          <OptionWithRadioField
            label={isRequiredField(
              "Did any of your close family members (brother, father or uncle on your father's or mother's side) suffer from prostate cancer now or in the past?",
              'familyHistory.prostateCancer'
            )}
            options={['No', 'Yes']}
            form={{ id: 'familyHistory.prostateCancer' }}
          />
        </div>

        {/* Age Group */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Age Group
          </Text>
          <OptionWithRadioField
            label={isRequiredField(
              'To which age group do you belong?',
              'prostateCancer.ageGroup'
            )}
            options={[
              '55-59 years',
              '60-64 years',
              '65-70 years',
              '70-74 years',
            ]}
            form={{ id: 'prostateCancer.ageGroup' }}
          />
        </div>

        {/* PSA Level */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Prostate-Specific Antigen (PSA) Level
          </Text>
          <Controller
            name="prostateCancer.psaLevel"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                step="0.01"
                placeholder="ng/mL"
                label={isRequiredField(
                  'PSA level (ng/mL)',
                  'prostateCancer.psaLevel'
                )}
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />
        </div>

        {/* Digital Rectal Exam */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Digital Rectal Exam (DRE) Results
          </Text>
          <OptionWithRadioField
            label={isRequiredField(
              'Digital Rectal Exam (DRE) results',
              'prostateCancer.digitalRectalExam'
            )}
            options={['Normal', 'Abnormal', 'Not performed', 'Unknown']}
            form={{ id: 'prostateCancer.digitalRectalExam' }}
          />
        </div>

        {/* Prostate Volume */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Prostate Volume
          </Text>
          <Controller
            name="prostateCancer.prostateVolume"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                step="0.1"
                placeholder="cc"
                label={isRequiredField(
                  'Prostate volume (cc) - if available',
                  'prostateCancer.prostateVolume'
                )}
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />
        </div>

        {/* Previous Biopsy */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Previous Biopsy
          </Text>
          <OptionWithRadioField
            label={isRequiredField(
              'Have you had a previous prostate biopsy?',
              'prostateCancer.previousBiopsy'
            )}
            options={[
              'No',
              'Yes, negative',
              'Yes, positive',
              'Yes, unknown result',
            ]}
            form={{ id: 'prostateCancer.previousBiopsy' }}
          />
        </div>

        {/* Free-to-Total PSA Ratio */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Free-to-Total PSA Ratio
          </Text>
          <Controller
            name="prostateCancer.freeToTotalPsaRatio"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                step="0.01"
                placeholder="Ratio (0.00-1.00)"
                label={isRequiredField(
                  'Free-to-total PSA ratio',
                  'prostateCancer.freeToTotalPsaRatio'
                )}
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />
        </div>

        {/* Urinary Symptoms - IPSS */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Urinary Symptoms (International Prostate Symptom Score - IPSS)
          </Text>
          <Text variant="text/sm" className="text-gray-600 mb-4">
            In order to completely evaluate your pattern of voiding your urine,
            please answer these 7 questions in sequence.
          </Text>

          <div className="space-y-4">
            <OptionWithRadioField
              label={isRequiredField(
                '1. How often have you had a sensation of not emptying your bladder completely after you finished urinating?',
                'prostateCancer.urinarySymptomsIncompleteEmptying'
              )}
              options={[
                'never',
                'about 1 time in 5',
                'about 1 time in 3',
                'about 1 time in 2',
                'about 2 times in 3',
                'almost always',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsIncompleteEmptying' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                '2. How often have you had to urinate again less than two hours after you finished urinating?',
                'prostateCancer.urinarySymptomsFrequency'
              )}
              options={[
                'never',
                'about 1 time in 5',
                'about 1 time in 3',
                'about 1 time in 2',
                'about 2 times in 3',
                'almost always',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsFrequency' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                '3. How often have you found you stopped and started again several times when you urinated?',
                'prostateCancer.urinarySymptomsIntermittency'
              )}
              options={[
                'never',
                'about 1 time in 5',
                'about 1 time in 3',
                'about 1 time in 2',
                'about 2 times in 3',
                'almost always',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsIntermittency' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                '4. How often have you found it difficult to hold back urinating after you have felt the need?',
                'prostateCancer.urinarySymptomsUrgency'
              )}
              options={[
                'never',
                'about 1 time in 5',
                'about 1 time in 3',
                'about 1 time in 2',
                'about 2 times in 3',
                'almost always',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsUrgency' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                '5. How often have you noticed a reduction in the strength and force of your urinary stream?',
                'prostateCancer.urinarySymptomsWeakStream'
              )}
              options={[
                'never',
                'about 1 time in 5',
                'about 1 time in 3',
                'about 1 time in 2',
                'about 2 times in 3',
                'almost always',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsWeakStream' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                '6. How often have you had to push or strain to begin urinating?',
                'prostateCancer.urinarySymptomsStraining'
              )}
              options={[
                'never',
                'about 1 time in 5',
                'about 1 time in 3',
                'about 1 time in 2',
                'about 2 times in 3',
                'almost always',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsStraining' }}
            />

            <OptionWithRadioField
              label={isRequiredField(
                '7. From the time you go to bed at night until the time you rise in the morning, how many times do you need to get up to urinate?',
                'prostateCancer.urinarySymptomsNocturia'
              )}
              options={[
                'never',
                'once',
                'two times',
                'three times',
                'four times',
                'five times or more',
              ]}
              form={{ id: 'prostateCancer.urinarySymptomsNocturia' }}
            />
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
