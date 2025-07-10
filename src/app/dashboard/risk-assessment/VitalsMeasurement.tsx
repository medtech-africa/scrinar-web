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
import calculateAge from '@/utils/calculateAge'
import { Button } from '@/components/ui/button'
import MeasurementGuides from '@/components/risk-assessment/MeasurementGuides'
import { useNcdFilter } from './NcdFilterContext'
import { NCD } from '@/types/riskAssessment.types'
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
  const { selectedNcd } = useNcdFilter()
  const [validationErrors, setValidationErrors] = useState<
    Record<string, string>
  >({})
  const isRequiredField = useRequiredFieldLabel()

  const { bmi, sys, dys, height, weight, waist, oxygenSaturation, pulse } =
    watch('vitals', {})
  const { gender: genderVal, dateOfBirth } = watch('personalInfo', {})

  const gender = genderVal?.toLowerCase()
  const age = calculateAge(dateOfBirth)

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

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          {/* Main form content - takes 2/3 of the space */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div>
              <div>
                <Text as="h3" variant="text/md" className="font-medium mb-2">
                  Antropometry
                </Text>
                <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
                  To measure height, stand upright using a flat ruler or
                  measuring tape and mark the highest point of your head. For
                  weight, use a calibrated scale while standing barefoot. For
                  waist size, wrap a tape around the narrowest part, keeping it
                  snug and level.
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
                  {(selectedNcd === 'all' || selectedNcd === NCD.CVD) && (
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

                {(selectedNcd === 'all' || selectedNcd === NCD.CVD) && (
                  <div className="mt-4">
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
                  <div className="flex items-center gap-2 mb-2">
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

          {/* Video guides - takes 1/3 of the space */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="sticky top-4">
              <Text as="h3" variant="text/sm" className="font-medium mb-2">
                Measurement Guides
              </Text>
              <MeasurementGuides />
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
