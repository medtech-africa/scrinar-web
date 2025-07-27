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

type Props = {
  onNext: () => void
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
  if (num < 50 || num > 250) {
    return { isValid: false, message: 'Height should be between 50-250 cm' }
  }
  return { isValid: true, message: '' }
}

const validateWeight = (value: string) => {
  if (!value) return { isValid: true, message: '' }
  const num = Number(value)
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
  if (num < 30 || num > 200) {
    return { isValid: false, message: 'Waist should be between 30-200 cm' }
  }
  return { isValid: true, message: '' }
}

const validateBloodPressure = (sys: string, dys: string) => {
  if (!sys || !dys) return { isValid: true, message: '' }
  const sysNum = Number(sys)
  const dysNum = Number(dys)

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
  if (num < 40 || num > 200) {
    return {
      isValid: false,
      message: 'Pulse rate should be between 40-200 bpm',
    }
  }
  if (num < 60 || num > 100) {
    return {
      isValid: false,
      message: 'Warning: Pulse rate outside normal range (60-100 bpm)',
    }
  }
  return { isValid: true, message: '' }
}

export const VitalsMeasurement = ({ onNext }: Props) => {
  const { control, watch, setValue } = useFormContext()
  const { hasNcdSelected } = useNcdFilter()
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const [isGuidesOpen, setIsGuidesOpen] = useState(false)
  const isRequiredField = useRequiredFieldLabel()

  const { bmi, sys, dys, height, weight, waist, oxygenSaturation, pulse } =
    watch('vitals', {})
  const { gender: genderVal, age } = watch('personalInfo', {})

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

    setValidationErrors(errors)
  }, [height, weight, waist, sys, dys, oxygenSaturation, pulse])

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
                        label={isRequiredField('Height (cm)', 'vitals.height')}
                        labelStyle="flex justify-center items-center"
                        variant={
                          validationErrors.height
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.height || messageCheck(field.value)
                        }
                        min="50"
                        max="250"
                        type="number"
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
                        label={isRequiredField('Weight (kg)', 'vitals.weight')}
                        labelStyle="flex justify-center items-center"
                        variant={
                          validationErrors.weight
                            ? 'destructive'
                            : variantValidityCheck(field.value)
                        }
                        message={
                          validationErrors.weight || messageCheck(field.value)
                        }
                        min="3"
                        max="300"
                        type="number"
                      />
                    )}
                  />
                  {(hasNcdSelected('cvd') || hasNcdSelected('diabetes')) && (
                    <Controller
                      name="vitals.waist"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="85"
                          label={isRequiredField('Waist (cm)', 'vitals.waist')}
                          labelStyle="flex justify-center items-center"
                          variant={
                            validationErrors.waist
                              ? 'destructive'
                              : variantValidityCheck(field.value)
                          }
                          message={
                            validationErrors.waist || messageCheck(field.value)
                          }
                          min="30"
                          max="200"
                          type="number"
                        />
                      )}
                    />
                  )}
                </div>

                {(hasNcdSelected('cvd') || hasNcdSelected('diabetes')) && (
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
                            'vitals.sys'
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
                          min="70"
                          max="250"
                          type="number"
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
                            'vitals.dys'
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
                          min="40"
                          max="150"
                          type="number"
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
                            'vitals.pulse'
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
                          min="40"
                          max="200"
                          type="number"
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
                          'vitals.oxygenSaturation'
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
                        min="60"
                        max="100"
                        type="number"
                      />
                    )}
                  />

                  <div className="mt-4">
                    <Controller
                      name="vitals.temperature"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="36.5"
                          label={isRequiredField(
                            'Temperature (°C)',
                            'vitals.temperature'
                          )}
                          labelStyle="lg:text-sm text-xs"
                          variant={variantValidityCheck(field.value)}
                          message={messageCheck(field.value)}
                          min="30"
                          max="45"
                          step="0.1"
                          type="number"
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Collapsible Measurement Guides */}
        <div className="mt-6 border border-gray-200 rounded-lg">
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
