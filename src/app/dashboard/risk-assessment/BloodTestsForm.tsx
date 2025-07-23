import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { messageCheck, variantValidityCheck } from './utils'
import { BadgeField } from '@/components/ui/badge'
import {
  categorizeBloodSugarLevel,
  categorizeHDLC,
  categorizeLDLC,
  categorizeTG,
  categorizeTotalCholesterol,
} from '@/utils/vitalCalculations'
import { Text } from '@/components/ui/text'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircleIcon } from '@/components/ui/icon-picker/icons/help-circle'

import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'

type Props = {
  onNext: () => void
}

// Validation functions
const validateCholesterol = (total: string, hdl: string, ldl: string) => {
  if (!total) return { isValid: true, message: '' }

  const totalNum = Number(total)
  const hdlNum = Number(hdl)
  const ldlNum = Number(ldl)

  if (hdl && totalNum <= hdlNum) {
    return {
      isValid: false,
      message: 'Total Cholesterol must be greater than HDL',
    }
  }

  if (ldl && totalNum <= ldlNum) {
    return {
      isValid: false,
      message: 'Total Cholesterol must be greater than LDL',
    }
  }

  return { isValid: true, message: '' }
}

export const BloodTestsForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const isRequiredField = useRequiredFieldLabel()

  const bloodSugar1 = watch('bloodTest.bloodSugarRandom')
  const bloodSugar2 = watch('bloodTest.bloodSugarFasting')

  const tg = watch('bloodTest.cholesterolTriglycerides')
  const hdlc = watch('bloodTest.cholesterolHdl')
  const ldlc = watch('bloodTest.cholesterolLdl')
  const totalCholesterol = watch('bloodTest.cholesterolTotal')

  // Validate cholesterol values
  useEffect(() => {
    const errors: Record<string, string> = {}

    const cholesterolValidation = validateCholesterol(
      totalCholesterol,
      hdlc,
      ldlc
    )
    if (!cholesterolValidation.isValid) {
      errors.cholesterol = cholesterolValidation.message
    }

    setValidationErrors(errors)
  }, [totalCholesterol, hdlc, ldlc])

  const hasValidationErrors = Object.keys(validationErrors).length > 0
  const hasFastingBloodSugar = !!bloodSugar2

  return (
    <TooltipProvider>
      <div>
        <Text as="h2" className="font-medium mb-2">
          Patients Lab Test
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-2 md:mb-4">
          Blood tests (Blood tests are Optional, but they help to give a more
          complete picture of your overall health)
        </Text>

        <div className="space-y-4 mt-6">
          <div>
            <Text as="h3" variant="text/sm" className="font-medium mb-2">
              Blood Sugar Level (mg/dL)
            </Text>
            <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
              Optional but recommended, especially for people with Diabetes
            </Text>

            {/* Fasting Blood Sugar - Primary */}
            <div className="grid grid-cols-[2fr_1fr] items-center mb-4">
              <Controller
                name="bloodTest.bloodSugarFasting"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Fasting Blood Sugar Level"
                    label={isRequiredField(
                      'Fasting Blood Sugar',
                      'bloodTest.bloodSugarFasting'
                    )}
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
                    type="number"
                    min="50"
                    max="500"
                  />
                )}
              />
              {bloodSugar2 && (
                <BadgeField
                  variant={
                    categorizeBloodSugarLevel(Number(bloodSugar2)).variant
                  }
                  value={categorizeBloodSugarLevel(Number(bloodSugar2)).message}
                  className="ml-2 mt-6"
                />
              )}
            </div>

            {/* Random Blood Sugar - Optional when fasting is provided */}
            <div className="grid grid-cols-[2fr_1fr] items-center">
              <div className="relative">
                <Controller
                  name="bloodTest.bloodSugarRandom"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Random Blood Sugar Level"
                      label={
                        <div className="flex items-center gap-2">
                          <span>Random Blood Sugar</span>
                          {hasFastingBloodSugar && (
                            <span className="text-xs text-gray-500">
                              (Optional)
                            </span>
                          )}
                          {hasFastingBloodSugar && (
                            <Tooltip>
                              <TooltipTrigger type="button">
                                <HelpCircleIcon
                                  size="1rem"
                                  className="text-gray-400 hover:text-gray-600 cursor-help"
                                />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs">
                                  Random blood sugar is optional when fasting
                                  blood sugar is provided, as fasting values are
                                  more reliable for diabetes assessment.
                                </p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      }
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                      type="number"
                      min="50"
                      max="500"
                      disabled={hasFastingBloodSugar && !field.value}
                    />
                  )}
                />
              </div>
              {bloodSugar1 && (
                <BadgeField
                  variant={
                    categorizeBloodSugarLevel(Number(bloodSugar1)).variant
                  }
                  value={categorizeBloodSugarLevel(Number(bloodSugar1)).message}
                  className="ml-2 mt-6"
                />
              )}
            </div>
          </div>

          <div>
            <Text as="h3" variant="text/sm" className="font-medium mb-2">
              Blood Cholesterol Level{' '}
              <span className="font-normal">(Most Recent Lipid Profile)</span>
            </Text>
            <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
              To measure blood cholesterol levels, a blood sample is taken using
              a cholesterol test (lipid panel). This can be done with a
              fingerstick test using a portable device or through a lab test
              with a venous blood draw. The test measures total cholesterol, LDL
              (bad cholesterol), HDL (good cholesterol), and triglycerides. For
              accurate results, a fasting blood test (after 9–12 hours without
              food) is recommended, as recent meals can temporarily raise
              triglyceride levels. Monitoring cholesterol is crucial for
              assessing heart disease risk and guiding lifestyle or medical
              interventions.
            </Text>

            {/* Cholesterol validation error */}
            {validationErrors.cholesterol && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <Text variant="text/sm" className="text-red-800">
                  ⚠️ {validationErrors.cholesterol}
                </Text>
              </div>
            )}

            <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.cholesterolTotal"
                  control={control}
                  render={({ field }) => (
                    <div>
                      <Input
                        {...field}
                        placeholder="Enter Total Cholesterol"
                        label={isRequiredField(
                          'Total Cholesterol (mg/dL)',
                          'bloodTest.cholesterolTotal'
                        )}
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          validationErrors.cholesterol
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.cholesterol ||
                          messageCheck(field.value)
                        }
                        type="number"
                        min="100"
                        max="600"
                      />
                    </div>
                  )}
                />
                {totalCholesterol && (
                  <BadgeField
                    variant={
                      categorizeTotalCholesterol(Number(totalCholesterol))
                        .variant
                    }
                    value={
                      categorizeTotalCholesterol(Number(totalCholesterol))
                        .message
                    }
                    className="ml-2 mt-6"
                  />
                )}
              </div>

              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.cholesterolLdl"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter LDL (Bad Cholesterol)"
                      label={isRequiredField(
                        'LDL (Bad Cholesterol) (mg/dL)',
                        'bloodTest.cholesterolLdl'
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={
                        validationErrors.cholesterol
                          ? 'destructive'
                          : variantValidityCheck(field.value)
                      }
                      message={
                        validationErrors.cholesterol ||
                        messageCheck(field.value)
                      }
                      type="number"
                      min="30"
                      max="400"
                    />
                  )}
                />
                {ldlc && (
                  <BadgeField
                    variant={categorizeLDLC(Number(ldlc)).variant}
                    value={categorizeLDLC(Number(ldlc)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>

              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.cholesterolHdl"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter HDL (Good Cholesterol)"
                      label={isRequiredField(
                        'HDL (Good Cholesterol) (mg/dL)',
                        'bloodTest.cholesterolHdl'
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={
                        validationErrors.cholesterol
                          ? 'destructive'
                          : variantValidityCheck(field.value)
                      }
                      message={
                        validationErrors.cholesterol ||
                        messageCheck(field.value)
                      }
                      type="number"
                      min="20"
                      max="150"
                    />
                  )}
                />
                {hdlc && (
                  <BadgeField
                    variant={categorizeHDLC(Number(hdlc)).variant}
                    value={categorizeHDLC(Number(hdlc)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>

              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.cholesterolTriglycerides"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Triglycerides"
                      label={isRequiredField(
                        'Triglycerides (mg/dL)',
                        'bloodTest.cholesterolTriglycerides'
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                      type="number"
                      min="30"
                      max="1000"
                    />
                  )}
                />
                {tg && (
                  <BadgeField
                    variant={categorizeTG(Number(tg)).variant}
                    value={categorizeTG(Number(tg)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>
            </div>
          </div>

          <div>
            <Text as="h3" variant="text/sm" className="font-medium mb-2">
              HbA1c (Glycated Hemoglobin)
            </Text>
            <Controller
              name="bloodTest.hba1cLevel"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter HbA1c Level"
                  label={isRequiredField(
                    'HbA1c Level (%)',
                    'bloodTest.hba1cLevel'
                  )}
                  labelStyle="lg:text-sm text-xs"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
                  type="number"
                  min="3"
                  max="15"
                  step="0.1"
                />
              )}
            />
          </div>

          {/* Serum Creatinine */}
          <div>
            <Text as="h3" variant="text/sm" className="font-medium mb-4">
              Laboratory Values
            </Text>
            <Controller
              name="bloodTest.serumCreatinine"
              control={control}
              rules={{
                min: {
                  value: 0.1,
                  message: 'Creatinine must be greater than 0.1',
                },
                max: { value: 20, message: 'Creatinine must be less than 20' },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  type="number"
                  step="0.01"
                  placeholder="mg/dL"
                  label={isRequiredField(
                    'Serum Creatinine (mg/dL)',
                    'bloodTest.serumCreatinine'
                  )}
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />

            {/* PSA Level */}
            <div className="mt-4">
              <Controller
                name="bloodTest.psaLevel"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="number"
                    step="0.01"
                    placeholder="ng/mL"
                    label={isRequiredField(
                      'PSA level (ng/mL)',
                      'bloodTest.psaLevel'
                    )}
                    labelStyle="lg:text-sm text-xs"
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            className="px-8"
            onClick={onNext}
            disabled={hasValidationErrors}
          >
            Save & continue
          </Button>
        </div>
      </div>
    </TooltipProvider>
  )
}
