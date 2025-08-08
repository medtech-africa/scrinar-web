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
  disabled?: boolean
}

// Lab test standards and reference ranges
const LAB_STANDARDS = {
  cholesterol: {
    total: { min: 0, max: 500, optimal: '≤ 200 mg/dL', high: '> 200 mg/dL' },
    hdl: { min: 0, max: 200, optimal: '≥ 60 mg/dL', low: '< 60 mg/dL' },
    ldl: { min: 0, max: 300, optimal: '< 100 mg/dL', high: '≥ 100 mg/dL' },
    triglycerides: {
      min: 0,
      max: 1000,
      optimal: '< 150 mg/dL',
      high: '≥ 150 mg/dL',
    },
  },
  bloodSugar: {
    fasting: {
      min: 50,
      max: 500,
      normal: '70-99 mg/dL',
      prediabetes: '100-125 mg/dL',
      diabetes: '≥ 126 mg/dL',
    },
    random: {
      min: 50,
      max: 500,
      normal: '< 125 mg/dL',
      diabetes: '≥ 200 mg/dL',
    },
  },
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

const validateBloodSugar = (value: string, type: 'fasting' | 'random') => {
  if (!value) return { isValid: true, message: '' }

  const num = Number(value)
  const range = LAB_STANDARDS.bloodSugar[type]

  if (num < range.min || num > range.max) {
    return {
      isValid: false,
      message: `${type === 'fasting' ? 'Fasting' : 'Random'} blood sugar should be between ${range.min}-${range.max} mg/dL`,
    }
  }

  return { isValid: true, message: '' }
}

export const BloodTestsForm = ({ onNext, disabled }: Props) => {
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

  // Get all form data for conditional required field logic
  const formData = watch()

  // Validate all fields
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

    // Validate blood sugar levels
    if (bloodSugar2) {
      const fastingValidation = validateBloodSugar(bloodSugar2, 'fasting')
      if (!fastingValidation.isValid) {
        errors.fastingBloodSugar = fastingValidation.message
      }
    }

    if (bloodSugar1) {
      const randomValidation = validateBloodSugar(bloodSugar1, 'random')
      if (!randomValidation.isValid) {
        errors.randomBloodSugar = randomValidation.message
      }
    }

    setValidationErrors(errors)
  }, [totalCholesterol, hdlc, ldlc, bloodSugar1, bloodSugar2])

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
              <div className="relative">
                <Controller
                  name="bloodTest.bloodSugarFasting"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Fasting Blood Sugar Level"
                      label={isRequiredField(
                        'Fasting Blood Sugar',
                        'bloodTest.bloodSugarFasting',
                        formData
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={
                        validationErrors.fastingBloodSugar
                          ? 'destructive'
                          : variantValidityCheck(field.value)
                      }
                      message={
                        validationErrors.fastingBloodSugar ||
                        messageCheck(field.value)
                      }
                      type="number"
                      min={LAB_STANDARDS.bloodSugar.fasting.min}
                      max={LAB_STANDARDS.bloodSugar.fasting.max}
                      disabled={disabled}
                    />
                  )}
                />
                <div className="absolute right-2 top-3 transform -translate-y-1/2">
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <HelpCircleIcon
                        size="1rem"
                        className="text-gray-400 hover:text-gray-600 cursor-help"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p className="font-medium mb-2">
                          Fasting Blood Sugar Reference Ranges:
                        </p>
                        <p className="text-sm">Normal: 70-99 mg/dL</p>
                        <p className="text-sm">Prediabetes: 100-125 mg/dL</p>
                        <p className="text-sm">Diabetes: ≥ 126 mg/dL</p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>
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
                      label={isRequiredField(
                        'Random Blood Sugar',
                        'bloodTest.bloodSugarRandom',
                        formData
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={
                        validationErrors.randomBloodSugar
                          ? 'destructive'
                          : variantValidityCheck(field.value)
                      }
                      message={
                        validationErrors.randomBloodSugar ||
                        messageCheck(field.value)
                      }
                      type="number"
                      min={LAB_STANDARDS.bloodSugar.random.min}
                      max={LAB_STANDARDS.bloodSugar.random.max}
                      disabled={disabled || hasFastingBloodSugar}
                    />
                  )}
                />
                <div className="absolute right-2 top-3 transform -translate-y-1/2">
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <HelpCircleIcon
                        size="1rem"
                        className="text-gray-400 hover:text-gray-600 cursor-help"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="max-w-xs">
                        <p className="font-medium mb-2">
                          Random Blood Sugar Reference Ranges:
                        </p>
                        <p className="text-sm">Normal: &lt; 125 mg/dL</p>
                        <p className="text-sm">Diabetes: ≥ 200 mg/dL</p>

                        <p className="max-w-xs">
                          Random blood sugar is optional when fasting blood
                          sugar is provided, as fasting values are more reliable
                          for diabetes assessment.
                        </p>
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </div>
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
              Cholesterol Profile (mg/dL)
            </Text>
            <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
              Optional but recommended for cardiovascular risk assessment
            </Text>

            <div className="space-y-4">
              {/* Total Cholesterol */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <div className="relative">
                  <Controller
                    name="bloodTest.cholesterolTotal"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Total Cholesterol"
                        label={isRequiredField(
                          'Total Cholesterol',
                          'bloodTest.cholesterolTotal',
                          formData
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
                        min={LAB_STANDARDS.cholesterol.total.min}
                        max={LAB_STANDARDS.cholesterol.total.max}
                        disabled={disabled}
                      />
                    )}
                  />
                  <div className="absolute right-2 top-3 transform -translate-y-1/2">
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <HelpCircleIcon
                          size="1rem"
                          className="text-gray-400 hover:text-gray-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium mb-2">
                            Total Cholesterol Reference Ranges:
                          </p>
                          <p className="text-sm">Optimal: ≤ 200 mg/dL</p>
                          <p className="text-sm">High: &gt; 200 mg/dL</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
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

              {/* HDL Cholesterol */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <div className="relative">
                  <Controller
                    name="bloodTest.cholesterolHdl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter HDL Cholesterol"
                        label={isRequiredField(
                          'HDL Cholesterol',
                          'bloodTest.cholesterolHdl',
                          formData
                        )}
                        labelStyle="lg:text-sm text-xs"
                        variant={variantValidityCheck(field.value)}
                        message={messageCheck(field.value)}
                        type="number"
                        min={LAB_STANDARDS.cholesterol.hdl.min}
                        max={LAB_STANDARDS.cholesterol.hdl.max}
                        disabled={disabled}
                      />
                    )}
                  />
                  <div className="absolute right-2 top-3 transform -translate-y-1/2">
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <HelpCircleIcon
                          size="1rem"
                          className="text-gray-400 hover:text-gray-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium mb-2">
                            HDL Cholesterol Reference Ranges:
                          </p>
                          <p className="text-sm">Optimal: ≥ 60 mg/dL</p>
                          <p className="text-sm">Low: &lt; 60 mg/dL</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                {hdlc && (
                  <BadgeField
                    variant={categorizeHDLC(Number(hdlc)).variant}
                    value={categorizeHDLC(Number(hdlc)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>

              {/* LDL Cholesterol */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <div className="relative">
                  <Controller
                    name="bloodTest.cholesterolLdl"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter LDL Cholesterol"
                        label={isRequiredField(
                          'LDL Cholesterol',
                          'bloodTest.cholesterolLdl',
                          formData
                        )}
                        labelStyle="lg:text-sm text-xs"
                        variant={variantValidityCheck(field.value)}
                        message={messageCheck(field.value)}
                        type="number"
                        min={LAB_STANDARDS.cholesterol.ldl.min}
                        max={LAB_STANDARDS.cholesterol.ldl.max}
                        disabled={disabled}
                      />
                    )}
                  />
                  <div className="absolute right-2 top-3 transform -translate-y-1/2">
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <HelpCircleIcon
                          size="1rem"
                          className="text-gray-400 hover:text-gray-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium mb-2">
                            LDL Cholesterol Reference Ranges:
                          </p>
                          <p className="text-sm">Optimal: &lt; 100 mg/dL</p>
                          <p className="text-sm">High: ≥ 100 mg/dL</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                {ldlc && (
                  <BadgeField
                    variant={categorizeLDLC(Number(ldlc)).variant}
                    value={categorizeLDLC(Number(ldlc)).message}
                    className="ml-2 mt-6"
                  />
                )}
              </div>

              {/* Triglycerides */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <div className="relative">
                  <Controller
                    name="bloodTest.cholesterolTriglycerides"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter Triglycerides"
                        label={isRequiredField(
                          'Triglycerides',
                          'bloodTest.cholesterolTriglycerides',
                          formData
                        )}
                        labelStyle="lg:text-sm text-xs"
                        variant={variantValidityCheck(field.value)}
                        message={messageCheck(field.value)}
                        type="number"
                        min={LAB_STANDARDS.cholesterol.triglycerides.min}
                        max={LAB_STANDARDS.cholesterol.triglycerides.max}
                        disabled={disabled}
                      />
                    )}
                  />
                  <div className="absolute right-2 top-3 transform -translate-y-1/2">
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <HelpCircleIcon
                          size="1rem"
                          className="text-gray-400 hover:text-gray-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="max-w-xs">
                          <p className="font-medium mb-2">
                            Triglycerides Reference Ranges:
                          </p>
                          <p className="text-sm">Optimal: &lt; 150 mg/dL</p>
                          <p className="text-sm">High: ≥ 150 mg/dL</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
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
              Additional Tests
            </Text>
            <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
              Optional tests for comprehensive assessment
            </Text>

            <div className="space-y-4">
              {/* HbA1c */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.hba1cLevel"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter HbA1c Level"
                      label={isRequiredField(
                        'HbA1c (%)',
                        'bloodTest.hba1cLevel',
                        formData
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                      type="number"
                      min="3"
                      max="15"
                      step="0.1"
                      disabled={disabled}
                    />
                  )}
                />
              </div>

              {/* Serum Creatinine */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.serumCreatinine"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Serum Creatinine"
                      label={isRequiredField(
                        'Serum Creatinine (mg/dL)',
                        'bloodTest.serumCreatinine',
                        formData
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                      type="number"
                      min="0.1"
                      max="20"
                      step="0.01"
                      disabled={disabled}
                    />
                  )}
                />
              </div>

              {/* PSA Level */}
              <div className="grid grid-cols-[2fr_1fr] items-center">
                <Controller
                  name="bloodTest.psaLevel"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter PSA Level"
                      label={isRequiredField(
                        'PSA Level (ng/mL)',
                        'bloodTest.psaLevel',
                        formData
                      )}
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      disabled={disabled}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        {!disabled && (
          <div className="flex justify-end mt-6">
            <Button
              className="px-8"
              onClick={onNext}
              disabled={hasValidationErrors}
            >
              Save & continue
            </Button>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
