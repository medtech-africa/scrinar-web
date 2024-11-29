import { BadgeField } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
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

export const VitalsMeasurement = () => {
  const { control, watch, setValue } = useFormContext()

  const { bmi, gender, age, sys, dys, height, weight } = watch('vitals', {})
  console.log('🚀 ~ VitalsMeasurement ~ vitals:', watch('vitals'))

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
    <div className="py-7">
      <Text variant="text/md" weight="medium">
        Vital Measurement
      </Text>
      <div className="grid md:grid-cols-2 gap-6 mt-6">
        <PageCard title="Antropometry">
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
        </PageCard>

        <div className="h-full">
          <PageCard title="Blood Pressure" bodyStyle="p-4">
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
          </PageCard>

          <PageCard title="Oxygen & Temperature" bodyStyle="p-4 mt-4">
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
          </PageCard>
        </div>
      </div>
    </div>
  )
}
