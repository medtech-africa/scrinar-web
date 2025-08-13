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

// Conversion factors
const CONVERSION_FACTORS = {
  glucose: {
    mgdLToMmolL: 18, // Divide by 18 to convert mg/dL to mmol/L
    mmolLToMgdL: 18, // Multiply by 18 to convert mmol/L to mg/dL
  },
  lipids: {
    mgdLToMmolL: 38.67, // Divide by 38.67 to convert mg/dL to mmol/L
    mmolLToMgdL: 38.67, // Multiply by 38.67 to convert mmol/L to mg/dL
  },
}

// Lab test standards and reference ranges
const LAB_STANDARDS = {
  cholesterol: {
    total: {
      min: 0,
      max: 500,
      optimal: '≤ 200 mg/dL',
      high: '> 200 mg/dL',
      optimalMmolL: '≤ 5.2 mmol/L',
      highMmolL: '> 5.2 mmol/L',
    },
    hdl: {
      min: 0,
      max: 200,
      optimal: '≥ 60 mg/dL',
      low: '< 60 mg/dL',
      optimalMmolL: '≥ 1.6 mmol/L',
      lowMmolL: '< 1.6 mmol/L',
    },
    ldl: {
      min: 0,
      max: 300,
      optimal: '< 100 mg/dL',
      high: '≥ 100 mg/dL',
      optimalMmolL: '< 2.6 mmol/L',
      highMmolL: '≥ 2.6 mmol/L',
    },
    triglycerides: {
      min: 0,
      max: 1000,
      optimal: '< 150 mg/dL',
      high: '≥ 150 mg/dL',
      optimalMmolL: '< 3.9 mmol/L',
      highMmolL: '≥ 3.9 mmol/L',
    },
  },
  bloodSugar: {
    fasting: {
      min: 50,
      max: 500,
      normal: '70-99 mg/dL',
      prediabetes: '100-125 mg/dL',
      diabetes: '≥ 126 mg/dL',
      normalMmolL: '3.9-5.5 mmol/L',
      prediabetesMmolL: '5.6-6.9 mmol/L',
      diabetesMmolL: '≥ 7.0 mmol/L',
    },
    random: {
      min: 50,
      max: 500,
      normal: '< 125 mg/dL',
      prediabetes: '126-199 mg/dL',
      diabetes: '≥ 200 mg/dL',
      normalMmolL: '< 6.9 mmol/L',
      prediabetesMmolL: '7.0-11.0 mmol/L',
      diabetesMmolL: '≥ 11.1 mmol/L',
    },
  },
  hba1c: {
    min: 3,
    max: 15,
    normalWithDiabetes: '≤ 6.5%',
    normalWithoutDiabetes: '≤ 5.7%',
  },
  psa: {
    min: 0,
    max: 100,
    normal: '< 4 ng/mL',
    elevated: '≥ 4 ng/mL',
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

const validateBloodSugar = (
  value: string,
  type: 'fasting' | 'random',
  unit: string
) => {
  if (!value) return { isValid: true, message: '' }

  const num = Number(value)
  const range = LAB_STANDARDS.bloodSugar[type]

  // Convert validation range based on unit
  if (unit === 'mmol/L') {
    // Use mmol/L ranges for validation
    const mmolRanges = {
      fasting: {
        min: 2.8, // 50 mg/dL / 18
        max: 27.8, // 500 mg/dL / 18
      },
      random: {
        min: 2.8, // 50 mg/dL / 18
        max: 27.8, // 500 mg/dL / 18
      },
    }

    if (num < mmolRanges[type].min || num > mmolRanges[type].max) {
      return {
        isValid: false,
        message: `${type === 'fasting' ? 'Fasting' : 'Random'} blood sugar should be between ${mmolRanges[type].min}-${mmolRanges[type].max} ${unit}`,
      }
    }
  } else {
    if (num < range.min || num > range.max) {
      return {
        isValid: false,
        message: `${type === 'fasting' ? 'Fasting' : 'Random'} blood sugar should be between ${range.min}-${range.max} ${unit}`,
      }
    }
  }

  return { isValid: true, message: '' }
}

const validateHbA1c = (value: string) => {
  if (!value) return { isValid: true, message: '' }

  const num = Number(value)
  if (num < 3 || num > 15) {
    return {
      isValid: false,
      message: 'HbA1c should be between 3-15%',
    }
  }

  return { isValid: true, message: '' }
}

const validatePSALevel = (value: string) => {
  if (!value) return { isValid: true, message: '' }

  const num = Number(value)
  if (num < 0 || num > 100) {
    return {
      isValid: false,
      message: 'PSA Level should be between 0-100 ng/mL',
    }
  }

  return { isValid: true, message: '' }
}

// Conversion functions
const convertGlucose = (value: number, fromUnit: string, toUnit: string) => {
  if (fromUnit === toUnit) return value
  if (fromUnit === 'mg/dL' && toUnit === 'mmol/L') {
    return Number((value / CONVERSION_FACTORS.glucose.mgdLToMmolL).toFixed(1))
  }
  if (fromUnit === 'mmol/L' && toUnit === 'mg/dL') {
    return Number((value * CONVERSION_FACTORS.glucose.mmolLToMgdL).toFixed(0))
  }
  return value
}

const convertLipids = (value: number, fromUnit: string, toUnit: string) => {
  if (fromUnit === toUnit) return value
  if (fromUnit === 'mg/dL' && toUnit === 'mmol/L') {
    return Number((value / CONVERSION_FACTORS.lipids.mgdLToMmolL).toFixed(2))
  }
  if (fromUnit === 'mmol/L' && toUnit === 'mg/dL') {
    return Number((value * CONVERSION_FACTORS.lipids.mmolLToMgdL).toFixed(0))
  }
  return value
}

export const BloodTestsForm = ({ onNext, disabled }: Props) => {
  const { control, watch, setValue } = useFormContext()
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const [units, setUnits] = useState({
    glucose: 'mg/dL',
    lipids: 'mg/dL',
  })
  const isRequiredField = useRequiredFieldLabel()

  const bloodSugar1 = watch('bloodTest.bloodSugarRandom')
  const bloodSugar2 = watch('bloodTest.bloodSugarFasting')

  const tg = watch('bloodTest.cholesterolTriglycerides')
  const hdlc = watch('bloodTest.cholesterolHdl')
  const ldlc = watch('bloodTest.cholesterolLdl')
  const totalCholesterol = watch('bloodTest.cholesterolTotal')

  // Convert input value back to mg/dL for storage
  const handleUnitChange = (
    conversionType: 'glucose' | 'lipids',
    newUnit: string
  ) => {
    const oldUnit = conversionType === 'glucose' ? units.glucose : units.lipids

    if (oldUnit === newUnit) return

    // Convert existing values when unit changes
    if (conversionType === 'glucose') {
      if (bloodSugar1) {
        const currentValue = Number(bloodSugar1)
        const convertedValue =
          newUnit === 'mmol/L'
            ? convertGlucose(currentValue, 'mg/dL', 'mmol/L')
            : convertGlucose(currentValue, 'mmol/L', 'mg/dL')
        setValue('bloodTest.bloodSugarRandom', convertedValue.toString())
      }
      if (bloodSugar2) {
        const currentValue = Number(bloodSugar2)
        const convertedValue =
          newUnit === 'mmol/L'
            ? convertGlucose(currentValue, 'mg/dL', 'mmol/L')
            : convertGlucose(currentValue, 'mmol/L', 'mg/dL')
        setValue('bloodTest.bloodSugarFasting', convertedValue.toString())
      }
    } else {
      if (totalCholesterol) {
        const currentValue = Number(totalCholesterol)
        const convertedValue =
          newUnit === 'mmol/L'
            ? convertLipids(currentValue, 'mg/dL', 'mmol/L')
            : convertLipids(currentValue, 'mmol/L', 'mg/dL')
        setValue('bloodTest.cholesterolTotal', convertedValue.toString())
      }
      if (hdlc) {
        const currentValue = Number(hdlc)
        const convertedValue =
          newUnit === 'mmol/L'
            ? convertLipids(currentValue, 'mg/dL', 'mmol/L')
            : convertLipids(currentValue, 'mmol/L', 'mg/dL')
        setValue('bloodTest.cholesterolHdl', convertedValue.toString())
      }
      if (ldlc) {
        const currentValue = Number(ldlc)
        const convertedValue =
          newUnit === 'mmol/L'
            ? convertLipids(currentValue, 'mg/dL', 'mmol/L')
            : convertLipids(currentValue, 'mmol/L', 'mg/dL')
        setValue('bloodTest.cholesterolLdl', convertedValue.toString())
      }
      if (tg) {
        const currentValue = Number(tg)
        const convertedValue =
          newUnit === 'mmol/L'
            ? convertLipids(currentValue, 'mg/dL', 'mmol/L')
            : convertLipids(currentValue, 'mmol/L', 'mg/dL')
        setValue(
          'bloodTest.cholesterolTriglycerides',
          convertedValue.toString()
        )
      }
    }
  }

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
      const fastingValidation = validateBloodSugar(
        bloodSugar2,
        'fasting',
        units.glucose
      )
      if (!fastingValidation.isValid) {
        errors.fastingBloodSugar = fastingValidation.message
      }
    }

    if (bloodSugar1) {
      const randomValidation = validateBloodSugar(
        bloodSugar1,
        'random',
        units.glucose
      )
      if (!randomValidation.isValid) {
        errors.randomBloodSugar = randomValidation.message
      }
    }

    // Validate additional tests
    const hba1c = watch('bloodTest.hba1cLevel')
    if (hba1c) {
      const hba1cValidation = validateHbA1c(hba1c)
      if (!hba1cValidation.isValid) {
        errors.hba1c = hba1cValidation.message
      }
    }

    const psaLevel = watch('bloodTest.psaLevel')
    if (psaLevel) {
      const psaValidation = validatePSALevel(psaLevel)
      if (!psaValidation.isValid) {
        errors.psaLevel = psaValidation.message
      }
    }

    setValidationErrors(errors)
  }, [totalCholesterol, hdlc, ldlc, bloodSugar1, bloodSugar2, watch])

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

        {/* Unit Selection */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <Text as="h3" variant="text/sm" className="font-medium mb-3">
            Measurement Units
          </Text>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Text variant="text/sm" className="font-medium mb-2">
                Blood Glucose Units
              </Text>
              <div className="flex gap-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="glucoseUnits"
                    value="mg/dL"
                    checked={units.glucose === 'mg/dL'}
                    onChange={(e) => {
                      setUnits((prev) => ({ ...prev, glucose: e.target.value }))
                      handleUnitChange('glucose', e.target.value)
                    }}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <Text variant="text/sm">mg/dL</Text>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="glucoseUnits"
                    value="mmol/L"
                    checked={units.glucose === 'mmol/L'}
                    onChange={(e) => {
                      setUnits((prev) => ({ ...prev, glucose: e.target.value }))
                      handleUnitChange('glucose', e.target.value)
                    }}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <Text variant="text/sm">mmol/L</Text>
                </label>
              </div>
            </div>
            <div>
              <Text variant="text/sm" className="font-medium mb-2">
                Blood Lipids Units
              </Text>
              <div className="flex gap-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="lipidsUnits"
                    value="mg/dL"
                    checked={units.lipids === 'mg/dL'}
                    onChange={(e) => {
                      setUnits((prev) => ({ ...prev, lipids: e.target.value }))
                      handleUnitChange('lipids', e.target.value)
                    }}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <Text variant="text/sm">mg/dL</Text>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="lipidsUnits"
                    value="mmol/L"
                    checked={units.lipids === 'mmol/L'}
                    onChange={(e) => {
                      setUnits((prev) => ({ ...prev, lipids: e.target.value }))
                      handleUnitChange('lipids', e.target.value)
                    }}
                    disabled={disabled}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <Text variant="text/sm">mmol/L</Text>
                </label>
              </div>
            </div>
          </div>
          <Text variant="text/xs" className="text-blue-600 mt-2">
            * Values will be automatically converted between units. Reference
            ranges are shown in both units.
          </Text>
        </div>

        <div className="space-y-4 mt-6">
          <div>
            <Text as="h3" variant="text/sm" className="font-medium mb-2">
              Blood Sugar Level ({units.glucose})
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
                      placeholder={`Enter Fasting Blood Sugar Level (${units.glucose})`}
                      label={isRequiredField(
                        `Fasting Blood Sugar (${units.glucose})`,
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
                        <p className="text-sm">
                          Normal: 70-99 mg/dL (3.9-5.5 mmol/L)
                        </p>
                        <p className="text-sm">
                          Prediabetes: 100-125 mg/dL (5.6-6.9 mmol/L)
                        </p>
                        <p className="text-sm">
                          Diabetes: ≥ 126 mg/dL (≥ 7.0 mmol/L)
                        </p>
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
                      placeholder={`Enter Random Blood Sugar Level (${units.glucose})`}
                      label={isRequiredField(
                        `Random Blood Sugar (${units.glucose})`,
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
                        <p className="text-sm">
                          Normal: &lt; 125 mg/dL (&lt; 6.9 mmol/L)
                        </p>
                        <p className="text-sm">
                          Prediabetes: 126-199 mg/dL (7.0-11.0 mmol/L)
                        </p>
                        <p className="text-sm">
                          Diabetes: ≥ 200 mg/dL (≥ 11.1 mmol/L)
                        </p>

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
              Cholesterol Profile ({units.lipids})
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
                        placeholder={`Enter Total Cholesterol (${units.lipids})`}
                        label={isRequiredField(
                          `Total Cholesterol (${units.lipids})`,
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
                          <p className="text-sm">
                            Optimal: ≤ 200 mg/dL (≤ 5.2 mmol/L)
                          </p>
                          <p className="text-sm">
                            High: &gt; 200 mg/dL (&gt; 5.2 mmol/L)
                          </p>
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
                <div className="relative">
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
                        variant={
                          validationErrors.hba1c
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.hba1c || messageCheck(field.value)
                        }
                        type="number"
                        min="3"
                        max="15"
                        step="0.1"
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
                            HbA1c Reference Ranges:
                          </p>
                          <p className="text-sm">
                            Normal (with diabetes): ≤ 6.5%
                          </p>
                          <p className="text-sm">
                            Normal (without diabetes): ≤ 5.7%
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
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
                <div className="relative">
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
                        variant={
                          validationErrors.psaLevel
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.psaLevel || messageCheck(field.value)
                        }
                        type="number"
                        min="0"
                        max="100"
                        step="0.01"
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
                            PSA Level Reference Ranges:
                          </p>
                          <p className="text-sm">Normal: &lt; 4 ng/mL</p>
                          <p className="text-sm">Elevated: ≥ 4 ng/mL</p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
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
