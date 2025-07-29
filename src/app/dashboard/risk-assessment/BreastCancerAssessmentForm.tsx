import React from 'react'
import { OptionWithRadioField } from './OptionWithRadioField'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { Controller, useFormContext } from 'react-hook-form'
import { useNcdFilter } from './NcdFilterContext'

type Props = {
  onNext: () => void
}

export const BreastCancerAssessmentForm = ({ onNext }: Props) => {
  const { control, watch, register: customRegister } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()

  // Only show this form for Breast Cancer
  if (!hasNcdSelected('breastCancer')) {
    return null
  }

  const hasBeenDiagnosedWithBreastCancer = watch(
    'breastCancer.hasBeenDiagnosed'
  )

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Breast Cancer Risk Assessment
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
        Note that this assessment is only intended to assess the risk of women
        who have never been diagnosed with breast cancer.
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

          {hasBeenDiagnosedWithBreastCancer === 'Yes' && (
            <div className="mt-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                <Text variant="text/sm" className="text-yellow-800">
                  <strong>Note:</strong> This risk assessment tool is
                  specifically designed for individuals without a prior
                  diagnosis of breast cancer and is not validated for those with
                  a known history of the disease.
                </Text>
              </div>

              <div className="flex justify-end mt-6">
                <Button className="px-8" onClick={onNext} type="button">
                  Save & continue
                </Button>
              </div>
            </div>
          )}
        </div>

        {watch('breastCancer.hasBeenDiagnosed') === 'No' && (
          <div>
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
                      label="Age at first menstruation"
                      helperText="if no history of menstrual period, enter 0"
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
                      label="Age at first child birth"
                      helperText="if no history of child birth, enter 0"
                      labelStyle="lg:text-sm text-xs"
                    />
                  )}
                />

                <OptionWithRadioField
                  label="Menopause Status"
                  options={[
                    'Premenopause (Still having periods)',
                    'Perimenopause (irregular cycles with early menopause symptoms, last period less than 12 months ago)',
                    'Postmenopause (no periods)',
                  ]}
                  form={{ id: 'breastCancer.menopauseStatus' }}
                />

                {watch('breastCancer.menopauseStatus') ===
                  'Postmenopause (no periods)' && (
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
                )}
              </div>
            </div>

            {/* Hormone Replacement Therapy */}
            <div>
              <Text as="h3" variant="text/sm" className="font-medium my-4">
                Hormone Replacement Therapy
              </Text>
              <Controller
                name="breastCancer.hormoneReplacementTherapy"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    placeholder="Years"
                    label="Have you used hormone replacement therapy (HRT)? — HRT includes estrogen-only or combined estrogen and progesterone but does not include hormonal birth control."
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />
            </div>

            {/* Breast Biopsy - used for benign breast disease */}
            <div>
              <Text as="h3" variant="text/sm" className="font-medium mt-4 mb-1">
                Have you had a breast biopsy?
              </Text>
              <OptionWithRadioField
                label="If you have had a breast biopsy and are not sure about which option to select below, the result should be on your pathology report"
                options={[
                  'I’ve not done a biopsy',
                  'I’ve done a biopsy but I don’t know the result',
                  'No proliferative disease',
                  'Hyperplasia without atypia',
                  'Atypical hyperplasia',
                  'Lobular carcinoma in situ (LCIS)',
                ]}
                form={{ id: 'breastCancer.breastBiopsy' }}
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

            {/* Personal History */}
            <div>
              <Text as="h3" variant="text/sm" className="font-medium mb-2 mt-4">
                Personal History
              </Text>

              <div className="mb-6">
                <Text variant="text/sm" className="">
                  Have you ever had any of the following:
                </Text>

                <div className="overflow-x-auto">
                  <div className="min-w-[500px]">
                    <table className="table-auto w-full border-collapse border-2">
                      <thead>
                        <tr className="text-sm">
                          <th className="border px-4 py-2 text-left min-w-[300px]">
                            Medical Condition
                          </th>
                          <th className="border px-4 py-2 text-center min-w-[80px]">
                            Yes
                          </th>
                          <th className="border px-4 py-2 text-center min-w-[80px]">
                            No
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          {
                            label: 'Ovarian Cancer',
                            key: 'personalHistoryOvarianCancer',
                          },
                          {
                            label: 'Colon/Rectal/Pancreatic Cancer',
                            key: 'personalHistoryColorectalPancreaticCancer',
                          },
                          {
                            label: 'Uterine cancer at age 64 or younger',
                            key: 'personalHistoryUterineCancer',
                          },
                        ].map((condition) => (
                          <tr
                            key={condition.key}
                            className="odd:bg-white even:bg-gray-50"
                          >
                            <td className="border px-4 py-2 text-sm">
                              {condition.label}
                            </td>
                            {['Yes', 'No'].map((value) => (
                              <td
                                key={condition.key + '_' + value}
                                className="border px-4 py-2 text-center relative"
                              >
                                <label className="absolute inset-0 flex items-center justify-center cursor-pointer">
                                  <span className="w-full h-full flex items-center justify-center">
                                    <input
                                      {...customRegister(
                                        `breastCancer.${condition.key}`
                                      )}
                                      value={value}
                                      type="radio"
                                      title={condition.key}
                                    />
                                  </span>
                                </label>
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <OptionWithRadioField
                  label="Do you have any Ashkenazi inheritance?"
                  options={['Yes', 'No', "I don't know"]}
                  form={{ id: 'breastCancer.ashkenaziInheritance' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext} type="button">
          Next
        </Button>
      </div>
    </div>
  )
}
