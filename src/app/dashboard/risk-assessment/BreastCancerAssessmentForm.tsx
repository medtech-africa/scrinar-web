import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Controller, useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
}

export const BreastCancerAssessmentForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()
  const { selectedNcd } = useNcdFilter()

  // Only show this form for Breast Cancer or all NCDs
  if (selectedNcd !== 'all' && selectedNcd !== NCD.BREAST_CANCER) {
    return null
  }

  const hasBeenDiagnosedWithBreastCancer = watch(
    'breastCancer.hasBeenDiagnosed'
  )

  // If patient has been diagnosed with breast cancer, show warning and skip form
  if (hasBeenDiagnosedWithBreastCancer === 'Yes') {
    return (
      <div>
        <Text as="h2" className="font-medium mb-2">
          Breast Cancer Risk Assessment
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
          Tyrer-Cuzick Model (IBIS Tool) - Not validated for patients with prior
          breast cancer diagnosis
        </Text>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <Text variant="text/sm" className="text-yellow-800">
            <strong>Note:</strong> This risk assessment tool is specifically
            designed for individuals without a prior diagnosis of breast cancer
            and is not validated for those with a known history of the disease.
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
        Breast Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Tyrer-Cuzick Model (IBIS Tool) - Estimates 10-year and lifetime breast
        cancer risk
      </Text>

      <div className="space-y-6">
        {/* Screening Question */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Screening Question
          </Text>
          <OptionWithRadioField
            label="Have you ever been diagnosed with Breast Cancer?"
            options={['Yes', 'No']}
            form={{ id: 'breastCancer.hasBeenDiagnosed' }}
          />
        </div>

        {/* Reproductive History */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Reproductive History
          </Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="breastCancer.ageAtMenarche"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Age in years"
                  label="Age at menarche (first menstruation)"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />

            <Controller
              name="breastCancer.ageAtFirstBirth"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Age in years"
                  label="Age at first live birth (if applicable)"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />

            <Controller
              name="breastCancer.ageAtMenopause"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  placeholder="Age in years"
                  label="Age at menopause (if applicable)"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />
          </div>
        </div>

        {/* Hormone Replacement Therapy */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Hormone Replacement Therapy
          </Text>
          <div className="space-y-4">
            <OptionWithRadioField
              label="Have you used hormone replacement therapy (HRT)?"
              options={['Yes', 'No']}
              form={{ id: 'breastCancer.hormoneReplacementTherapy' }}
            />

            {watch('breastCancer.hormoneReplacementTherapy') === 'Yes' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <OptionWithRadioField
                  label="Type of HRT used"
                  options={[
                    'Estrogen only',
                    'Combined (estrogen + progestin)',
                    'Other',
                  ]}
                  form={{ id: 'breastCancer.hrtType' }}
                />

                <Controller
                  name="breastCancer.hrtDuration"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      placeholder="Years"
                      label="Duration of HRT use (years)"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />
              </div>
            )}
          </div>
        </div>

        {/* Benign Breast Disease */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Benign Breast Disease
          </Text>
          <OptionWithRadioField
            label="Have you been diagnosed with benign breast disease?"
            options={[
              'No',
              'Yes, hyperplasia without atypia',
              'Yes, atypical hyperplasia',
              'Yes, lobular carcinoma in situ (LCIS)',
            ]}
            form={{ id: 'breastCancer.benignBreastDisease' }}
          />
        </div>

        {/* BRCA Mutation Status */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Genetic Testing
          </Text>
          <OptionWithRadioField
            label="BRCA1/BRCA2 mutation status (if known)"
            options={[
              'Not tested',
              'Tested, no mutation found',
              'BRCA1 mutation',
              'BRCA2 mutation',
            ]}
            form={{ id: 'breastCancer.brcaMutationStatus' }}
          />
        </div>

        {/* Breast Density */}
        <div>
          <Text as="h3" variant="text/sm" className="font-medium mb-4">
            Breast Density
          </Text>
          <OptionWithRadioField
            label="Breast density (from mammogram reports)"
            options={[
              'Almost entirely fatty',
              'Scattered areas of fibroglandular density',
              'Heterogeneously dense',
              'Extremely dense',
              'Unknown',
            ]}
            form={{ id: 'breastCancer.breastDensity' }}
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
