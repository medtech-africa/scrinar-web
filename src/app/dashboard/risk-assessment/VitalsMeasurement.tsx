import { BadgeField } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import React, { useEffect } from 'react'
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

type Props = {
  onNext: () => void
}

export const VitalsMeasurement = ({ onNext }: Props) => {
  const { control, watch, setValue } = useFormContext()

  const { bmi, sys, dys, height, weight } = watch('vitals', {})
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

  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Vital & Anthropometrics
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-2 md:mb-4">
        Vitals records
      </Text>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <div>
          <Text as="h3" variant="text/md" className="font-medium mb-2">
            Antropometry
          </Text>
          <Text variant="text/sm" className="text-gray-500 mb-6 md:mb-8">
            To measure height, stand upright using a flat ruler or measuring
            tape and mark the highest point of your head. For weight, use a
            calibrated scale while standing barefoot. For waist size, wrap a
            tape around the narrowest part, keeping it snug and level.
          </Text>
          <div className="flex gap-3 w-full p-4">
            <Controller
              name="vitals.height"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="0"
                  label="Height(cm)"
                  labelStyle="flex justify-center items-center"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
                />
              )}
            />
            <Controller
              name="vitals.weight"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="0"
                  label="Weight(kg)"
                  labelStyle="flex justify-center items-center"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
                />
              )}
            />
            <Controller
              name="vitals.waist"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="0"
                  label="Waist(cm)"
                  labelStyle="flex justify-center items-center"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
                />
              )}
            />
          </div>

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
                      ? categorizeBMIWHO2007(Number(age), gender, bmi)?.variant
                      : undefined
                  }
                  value={
                    gender
                      ? categorizeBMIWHO2007(Number(age), gender, bmi)?.message
                      : undefined
                  }
                />
              )}
            </div>
            <Label className="px-4 flex justify-center">
              * BMI automatically generated
            </Label>
          </div>
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
                    placeholder="000"
                    label="Sys"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
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
                    placeholder="00"
                    label="Dys"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
                  />
                )}
              />
            </div>
            {sys && dys && (
              <BadgeField
                variant={
                  calculateBloodPressureRisk(Number(sys), Number(dys)).variant
                }
                value={
                  calculateBloodPressureRisk(Number(sys), Number(dys)).message
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
                    placeholder="00"
                    label="Pulse/Heart Rate"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
                  />
                )}
              />
            </div>
          </div>

          <div className="mt-4">
            <Text as="h3" variant="text/sm" className="font-medium mb-2">
              Oxygen & Temperature (Optional)
            </Text>
            <Controller
              name="vitals.oxygenSaturation"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="170"
                  label="Oxygen Saturation(SpO2)"
                  labelStyle="lg:text-sm text-xs"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
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
                    placeholder="00"
                    label="Temperature (°C)"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button
          variant="primary"
          className="bg-red-600 hover:bg-red-700 text-white px-8"
          onClick={onNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
}
