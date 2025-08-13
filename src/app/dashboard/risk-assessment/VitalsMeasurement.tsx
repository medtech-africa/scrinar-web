import { BadgeField } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircleIcon } from '@/components/ui/icon-picker/icons/help-circle'
import React, { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  calculateBloodPressureRisk,
  categorizeBMIWHO2007,
} from '@/utils/vitalCalculations'
import { Label } from '@/components/ui/label'
import { messageCheck, variantValidityCheck } from './utils'
import isValidNumber from '@/utils/isValidNumber'

import { Button } from '@/components/ui/button'
import MeasurementGuides from '@/components/risk-assessment/MeasurementGuides'
import { useNcdFilter } from './NcdFilterContext'
import { useRequiredFieldLabel } from '@/hooks/useRequiredFieldLabel'
import { NCD } from '@/types/riskAssessment.types'

type Props = {
  onNext: () => void
  disabled?: boolean
}

// Enhanced validation functions
const validateHeight = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  if (value.includes('.') && value.split('.')[1]?.length > 0) {
    return {
      isValid: false,
      message: 'Height should be in whole centimeters (e.g., 170, not 170.5)',
    }
  }
  const num = Number(value)
  if (num < 0) {
    return { isValid: false, message: 'Height cannot be negative' }
  }
  if (num < 50 || num > 250) {
    return { isValid: false, message: 'Height should be between 50-250 cm' }
  }
  return { isValid: true, message: '' }
}

const validateWeight = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  const num = Number(value)
  if (num < 0) {
    return { isValid: false, message: 'Weight cannot be negative' }
  }
  if (num < 3 || num > 300) {
    return { isValid: false, message: 'Weight should be between 3-300 kg' }
  }
  return { isValid: true, message: '' }
}

const validateWaist = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  if (value.includes('.') && value.split('.')[1]?.length > 0) {
    return {
      isValid: false,
      message: 'Waist should be in whole centimeters (e.g., 85, not 85.5)',
    }
  }
  const num = Number(value)
  if (num < 0) {
    return { isValid: false, message: 'Waist cannot be negative' }
  }
  if (num < 30 || num > 200) {
    return { isValid: false, message: 'Waist should be between 30-200 cm' }
  }
  return { isValid: true, message: '' }
}

const validateBloodPressure = (sys: string, dys: string) => {
  if (!sys || !dys) return { isValid: true, message: '' }
  const sysNum = Number(sys)
  const dysNum = Number(dys)

  if (sysNum < 0 || dysNum < 0) {
    return {
      isValid: false,
      message: 'Blood pressure values cannot be negative',
    }
  }

  if (sysNum <= dysNum) {
    return {
      isValid: false,
      message: 'Systolic must be greater than diastolic',
    }
  }
  if (sysNum < 70 || sysNum > 250) {
    return { isValid: false, message: 'Systolic should be between 70-250 mmHg' }
  }
  if (dysNum < 40 || dysNum > 150) {
    return {
      isValid: false,
      message: 'Diastolic should be between 40-150 mmHg',
    }
  }
  return { isValid: true, message: '' }
}

const validateOxygenSaturation = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  const num = Number(value)
  if (num < 0) {
    return {
      isValid: false,
      message: 'Oxygen saturation cannot be negative',
    }
  }
  if (num < 60 || num > 100) {
    return {
      isValid: false,
      message: 'Oxygen saturation should be between 60-100%',
    }
  }
  return { isValid: true, message: '' }
}

const validatePulse = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  const num = Number(value)
  if (num < 0) {
    return {
      isValid: false,
      message: 'Pulse rate cannot be negative',
    }
  }
  if (num < 40 || num > 200) {
    return {
      isValid: false,
      message: 'Pulse rate should be between 40-200 bpm',
    }
  }
  return { isValid: true, message: '' }
}

const validateTemperature = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  const num = Number(value)
  if (num < 0) {
    return {
      isValid: false,
      message: 'Temperature cannot be negative',
    }
  }
  if (num < 30 || num > 45) {
    return {
      isValid: false,
      message: 'Temperature should be between 30-45°C',
    }
  }
  return { isValid: true, message: '' }
}

export const VitalsMeasurement = ({ onNext, disabled }: Props) => {
  const { control, watch, setValue } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const [isGuidesOpen, setIsGuidesOpen] = useState(false)
  const isRequiredField = useRequiredFieldLabel()

  const {
    bmi,
    sys,
    dys,
    height,
    weight,
    waist,
    oxygenSaturation,
    pulse,
    temperature,
  } = watch('vitals', {})
  const { gender: genderVal, age } = watch('personalInfo', {})

  // Get all form data for conditional required field logic
  const formData = watch()

  const gender = genderVal?.toLowerCase()

  useEffect(() => {
    if (isValidNumber(height) && isValidNumber(weight)) {
      const val = Number(
        (Number(weight) / Math.pow(Number(height) / 100, 2)).toFixed(1)
      )
      setValue('vitals.bmi', val)
    } else {
      setValue('vitals.bmi', 0)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [height, weight])

  // Validate all fields
  useEffect(() => {
    const errors: Record<string, string> = {}

    const heightValidation = validateHeight(height)
    if (!heightValidation.isValid) errors.height = heightValidation.message

    const weightValidation = validateWeight(weight)
    if (!weightValidation.isValid) errors.weight = weightValidation.message

    if (waist) {
      const waistValidation = validateWaist(waist)
      if (!waistValidation.isValid) errors.waist = waistValidation.message
    }

    const bpValidation = validateBloodPressure(sys, dys)
    if (!bpValidation.isValid) errors.bloodPressure = bpValidation.message

    if (oxygenSaturation) {
      const oxValidation = validateOxygenSaturation(oxygenSaturation)
      if (!oxValidation.isValid) errors.oxygenSaturation = oxValidation.message
    }

    if (pulse) {
      const pulseValidation = validatePulse(pulse)
      if (!pulseValidation.isValid) errors.pulse = pulseValidation.message
    }
    if (temperature) {
      const tempValidation = validateTemperature(temperature)
      if (!tempValidation.isValid) errors.temperature = tempValidation.message
    }

    setValidationErrors(errors)
  }, [height, weight, waist, sys, dys, oxygenSaturation, pulse, temperature])

  const hasValidationErrors = Object.keys(validationErrors).length > 0

  return (
    <TooltipProvider>
      <div>
        <Text as="h2" className="font-medium mb-2">
          Vital & Anthropometrics
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-2 md:mb-4">
          Vitals records
        </Text>

        {/* Collapsible Measurement Guides - Moved higher */}
        <div className="mt-6 mb-6 border border-gray-200 rounded-lg">
          <button
            type="button"
            onClick={() => setIsGuidesOpen(!isGuidesOpen)}
            className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <HelpCircleIcon size="1.2rem" className="text-blue-600" />
              <Text variant="text/sm" className="font-medium text-gray-900">
                Need help with measurements?
              </Text>
            </div>
            <div
              className={`transform transition-transform ${isGuidesOpen ? 'rotate-180' : ''}`}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 9L12 15L18 9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </button>

          {isGuidesOpen && (
            <div className="px-4 pb-4 border-t border-gray-200">
              <div className="pt-4">
                <Text
                  variant="text/sm"
                  className="font-medium mb-3 text-gray-900"
                >
                  Measurement Guides
                </Text>
                <MeasurementGuides />
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          {/* Main form content - full width */}
          <div>
            <div>
              <div>
                <Text as="h3" variant="text/md" className="font-medium mb-2">
                  Antropometry
                </Text>
                <div className="flex gap-3 w-full ">
                  <Controller
                    name="vitals.height"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="170"
                        label={isRequiredField(
                          'Height (cm)',
                          'vitals.height',
                          formData
                        )}
                        labelStyle="flex justify-center items-center"
                        variant={
                          validationErrors.height
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.height || messageCheck(field.value)
                        }
                        min="0"
                        max="250"
                        type="number"
                        disabled={disabled}
                      />
                    )}
                  />
                  <Controller
                    name="vitals.weight"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="70"
                        label={isRequiredField(
                          'Weight (kg)',
                          'vitals.weight',
                          formData
                        )}
                        labelStyle="flex justify-center items-center"
                        variant={
                          validationErrors.weight
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.weight || messageCheck(field.value)
                        }
                        min="0"
                        max="300"
                        type="number"
                        disabled={disabled}
                      />
                    )}
                  />
                  {(hasNcdSelected(NCD.CVD) ||
                    hasNcdSelected(NCD.DIABETES)) && (
                    <Controller
                      name="vitals.waist"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="85"
                          label={isRequiredField(
                            'Waist (cm)',
                            'vitals.waist',
                            formData
                          )}
                          labelStyle="flex justify-center items-center"
                          variant={
                            validationErrors.waist
                              ? 'destructive'
                              : variantValidityCheck(field.value)
                          }
                          message={
                            validationErrors.waist || messageCheck(field.value)
                          }
                          min="0"
                          max="200"
                          type="number"
                          disabled={disabled}
                        />
                      )}
                    />
                  )}
                </div>

                <div className="my-4">
                  <div className="bg-grey-50 w-full p-4 flex justify-center">
                    <Text>BMI Result</Text>
                  </div>
                  <div className="flex flex-col justify-center items-center gap-y-4 p-4">
                    <Text
                      variant="display/sm"
                      weight="bold"
                      className="text-grey-700"
                    >
                      {!!bmi ? bmi : '-'}
                    </Text>
                    {!!bmi && (
                      <BadgeField
                        variant={
                          gender
                            ? categorizeBMIWHO2007(Number(age), gender, bmi)
                                ?.variant
                            : undefined
                        }
                        value={
                          gender
                            ? categorizeBMIWHO2007(Number(age), gender, bmi)
                                ?.message
                            : undefined
                        }
                      />
                    )}
                  </div>
                  <Label className="px-4 flex justify-center">
                    * BMI automatically generated
                  </Label>
                </div>

                {/* Central Obesity Status Table */}
                {waist && (
                  <div className="my-4">
                    <Text
                      as="h4"
                      variant="text/sm"
                      className="font-medium mb-3"
                    >
                      Central Obesity Status
                    </Text>
                    <div className="overflow-x-auto">
                      <table className="w-full border border-gray-200 rounded-lg">
                        <thead>
                          <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                              Central obesity status
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                              Men
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                              Women
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              Normal
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              Less than 94 cm
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              Less than 80 cm
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              Central Obesity-Increased Risk of metabolic
                              complications like DM
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              94 to 102 cm
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              80 to 88 cm
                            </td>
                          </tr>
                          <tr>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              Central Obesity- Substantially Increased Risk of
                              metabolic complications like DM
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              More than 102 cm
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                              More than 88 cm
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <Text as="h3" variant="text/sm" className="font-medium mb-2">
                  Blood Pressure
                </Text>
                <div className="grid grid-cols-[2fr_1fr] items-center">
                  <div className="flex">
                    <Controller
                      name="vitals.sys"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="120"
                          label={isRequiredField(
                            'Systolic (mmHg)',
                            'vitals.sys',
                            formData
                          )}
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            validationErrors.bloodPressure
                              ? 'destructive'
                              : variantValidityCheck(field.value)
                          }
                          message={
                            validationErrors.bloodPressure ||
                            messageCheck(field.value)
                          }
                          min="0"
                          max="250"
                          type="number"
                          disabled={disabled}
                        />
                      )}
                    />
                    <Text className="mt-6 mx-2" variant="display/sm">
                      /
                    </Text>
                    <Controller
                      name="vitals.dys"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="80"
                          label={isRequiredField(
                            'Diastolic (mmHg)',
                            'vitals.dys',
                            formData
                          )}
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            validationErrors.bloodPressure
                              ? 'destructive'
                              : variantValidityCheck(field.value)
                          }
                          message={
                            validationErrors.bloodPressure ||
                            messageCheck(field.value)
                          }
                          min="0"
                          max="150"
                          type="number"
                          disabled={disabled}
                        />
                      )}
                    />
                  </div>
                  {sys && dys && (
                    <BadgeField
                      variant={
                        calculateBloodPressureRisk(Number(sys), Number(dys))
                          .variant
                      }
                      value={
                        calculateBloodPressureRisk(Number(sys), Number(dys))
                          .message
                      }
                      className="ml-2 mt-6"
                    />
                  )}
                </div>

                {/* Blood Pressure Classification Table */}
                <div className="mt-4">
                  <Text as="h4" variant="text/sm" className="font-medium mb-3">
                    Blood Pressure Classification
                  </Text>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                            Classification
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                            Systolic Blood Pressure
                          </th>
                          <th className="px-4 py-2 text-left text-sm font-medium text-gray-900 border-b border-gray-200">
                            Diastolic Blood Pressure
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            Low
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            &lt; 90 mmHg
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            &lt; 60 mmHg
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            Optimal
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            90 - 120 mmHg
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            60 - 80 mmHg
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            Normal
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            121 - 129 mmHg
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            81 - 84 mmHg
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            High Normal (Prehypertension)
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            130 - 139 mmHg
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            85 - 89 mmHg
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            Hypertension
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            ≥ 140 mmHg
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            ≥ 90 mmHg
                          </td>
                        </tr>
                        <tr>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            Hypertensive Crisis (Urgent care needed)
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            ≥ 180 mmHg
                          </td>
                          <td className="px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                            ≥ 120 mmHg
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div>
                  <div className="flex mt-4">
                    <Controller
                      name="vitals.pulse"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="72"
                          label={isRequiredField(
                            'Pulse/Heart Rate (bpm)',
                            'vitals.pulse',
                            formData
                          )}
                          labelStyle="lg:text-sm text-xs"
                          variant={
                            validationErrors.pulse
                              ? 'destructive'
                              : variantValidityCheck(field.value)
                          }
                          message={
                            validationErrors.pulse || messageCheck(field.value)
                          }
                          min="0"
                          max="200"
                          type="number"
                          disabled={disabled}
                        />
                      )}
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <Text as="h3" variant="text/sm" className="font-medium mb-2">
                    Oxygen & Temperature (Optional)
                  </Text>
                  <div className="flex items-center gap-2 mb-3">
                    <Text variant="text/sm" className="text-gray-600">
                      Optional, but recommended for full risk assessment
                    </Text>
                    <Tooltip>
                      <TooltipTrigger type="button">
                        <HelpCircleIcon
                          size="1rem"
                          className="text-gray-400 hover:text-gray-600 cursor-help"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          These measurements provide additional health insights
                          and improve the accuracy of risk assessment.
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <Controller
                    name="vitals.oxygenSaturation"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="98"
                        label={isRequiredField(
                          'Oxygen Saturation (SpO2 %)',
                          'vitals.oxygenSaturation',
                          formData
                        )}
                        labelStyle="lg:text-sm text-xs"
                        variant={
                          validationErrors.oxygenSaturation
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.oxygenSaturation ||
                          messageCheck(field.value)
                        }
                        min="0"
                        max="100"
                        type="number"
                        disabled={disabled}
                      />
                    )}
                  />

                  <div className="mt-4">
                    <div className="relative">
                      <Controller
                        name="vitals.temperature"
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="36.5"
                            label={
                              <div className="flex items-center gap-2">
                                {isRequiredField(
                                  'Temperature (°C)',
                                  'vitals.temperature',
                                  formData
                                )}
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
                                        Temperature Reference Ranges:
                                      </p>
                                      <p className="text-sm">
                                        Normal: 36.5 - 37.2°C
                                      </p>
                                      <p className="text-sm">
                                        Fever: &gt; 37.2°C
                                      </p>
                                      <p className="text-sm">
                                        Hypothermia: &lt; 36.5°C
                                      </p>
                                    </div>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            }
                            labelStyle="lg:text-sm text-xs"
                            variant={
                              validationErrors.temperature
                                ? 'destructive'
                                : variantValidityCheck(field.value)
                            }
                            message={
                              validationErrors.temperature ||
                              messageCheck(field.value)
                            }
                            min="30"
                            max="45"
                            step="0.1"
                            type="number"
                            disabled={disabled}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Peak Expiratory Flow Meter */}
                  <div className="mt-4">
                    <Text
                      as="h3"
                      variant="text/sm"
                      className="font-medium mb-2"
                    >
                      Peak Expiratory Flow (PEF) - Best of 3 Readings
                    </Text>
                    <Text variant="text/sm" className="text-gray-500 mb-3">
                      The best out of 3 readings is recorded
                    </Text>

                    <div className="space-y-3">
                      {[1, 2, 3].map((reading) => (
                        <div key={reading} className="flex items-center gap-3">
                          <Text variant="text/sm" className="w-8">
                            {reading}.
                          </Text>
                          <Controller
                            name={`vitals.pefReading${reading}`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Enter PEF reading"
                                label={`Reading ${reading} (L/min)`}
                                labelStyle="lg:text-sm text-xs"
                                variant={variantValidityCheck(field.value)}
                                message={messageCheck(field.value)}
                                type="number"
                                min="0"
                                max="1000"
                                disabled={disabled}
                                className="flex-1"
                              />
                            )}
                          />
                        </div>
                      ))}

                      {/* Best PEF Result */}
                      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <Text variant="text/sm" className="font-medium">
                            Best PEF Result:
                          </Text>
                          <div className="flex items-center gap-2">
                            <Text
                              variant="display/sm"
                              weight="bold"
                              className="text-gray-700"
                            >
                              {(() => {
                                const readings = [
                                  watch('vitals.pefReading1'),
                                  watch('vitals.pefReading2'),
                                  watch('vitals.pefReading3'),
                                ]
                                  .filter(Boolean)
                                  .map(Number)

                                if (readings.length === 0) return '-'

                                const bestReading = Math.max(...readings)
                                const gender = watch(
                                  'personalInfo.gender'
                                )?.toLowerCase()

                                return (
                                  <div className="flex items-center gap-2">
                                    <span>{bestReading} L/min</span>
                                    {bestReading > 0 && (
                                      <BadgeField
                                        variant={
                                          gender === 'female'
                                            ? bestReading >= 250
                                              ? 'success'
                                              : 'error'
                                            : gender === 'male'
                                              ? bestReading >= 350
                                                ? 'success'
                                                : 'error'
                                              : undefined
                                        }
                                        value={
                                          gender === 'female'
                                            ? bestReading >= 250
                                              ? 'Normal'
                                              : 'Below Normal'
                                            : gender === 'male'
                                              ? bestReading >= 350
                                                ? 'Normal'
                                                : 'Below Normal'
                                              : undefined
                                        }
                                      />
                                    )}
                                  </div>
                                )
                              })()}
                            </Text>
                          </div>
                        </div>
                        <Text variant="text/xs" className="text-gray-600 mt-2">
                          Normal levels: Females ≥ 250 L/min, Males ≥ 350 L/min
                        </Text>
                      </div>
                    </div>
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
