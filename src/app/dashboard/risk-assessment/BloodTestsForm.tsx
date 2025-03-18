import { Input } from '@/components/ui/input'
import React from 'react'
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

type Props = {
  onNext: () => void
}

export const BloodTestsForm = ({ onNext }: Props) => {
  const { control, watch } = useFormContext()

  const bloodSugar1 = watch('bloodTest.bloodSugar.random')
  const bloodSugar2 = watch('bloodTest.bloodSugar.fasting')

  const tg = watch('bloodTest.cholesterol.triglycerides')
  const hdlc = watch('bloodTest.cholesterol.hdl')
  const ldlc = watch('bloodTest.cholesterol.ldl')
  const totalCholesterol = watch('bloodTest.cholesterol.total')

  return (
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
          <div className="grid grid-cols-[2fr_1fr] items-center">
            <Controller
              name="bloodTest.bloodSugar.random"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Random Blood Sugar Level"
                  label="Random Blood Sugar"
                  labelStyle="lg:text-sm text-xs"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
                />
              )}
            />
            {bloodSugar1 && (
              <BadgeField
                variant={categorizeBloodSugarLevel(Number(bloodSugar1)).variant}
                value={categorizeBloodSugarLevel(Number(bloodSugar1)).message}
                className="ml-2 mt-6"
              />
            )}
          </div>
          <div className="grid grid-cols-[2fr_1fr] items-center">
            <Controller
              name="bloodTest.bloodSugar.fasting"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Enter Fasting Blood Sugar Level"
                  label="Fasting Blood Sugar"
                  labelStyle="lg:text-sm text-xs"
                  variant={variantValidityCheck(field.value)}
                  message={messageCheck(field.value)}
                />
              )}
            />
            {bloodSugar2 && (
              <BadgeField
                variant={categorizeBloodSugarLevel(Number(bloodSugar2)).variant}
                value={categorizeBloodSugarLevel(Number(bloodSugar2)).message}
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
            To measure blood cholesterol levels, a blood sample is taken using a
            cholesterol test (lipid panel). This can be done with a fingerstick
            test using a portable device or through a lab test with a venous
            blood draw. The test measures total cholesterol, LDL (bad
            cholesterol), HDL (good cholesterol), and triglycerides. For
            accurate results, a fasting blood test (after 9–12 hours without
            food) is recommended, as recent meals can temporarily raise
            triglyceride levels. Monitoring cholesterol is crucial for assessing
            heart disease risk and guiding lifestyle or medical interventions.
          </Text>

          <div className="grid gap-4 grid-cols-2">
            <div className="grid grid-cols-[2fr_1fr] items-center">
              <Controller
                name="bloodTest.cholesterol.total"
                control={control}
                render={({ field }) => (
                  <div>
                    <Input
                      {...field}
                      placeholder="Enter Total Cholesterol"
                      label="Total Cholesterol (mg/dL)"
                      labelStyle="lg:text-sm text-xs"
                      variant={variantValidityCheck(field.value)}
                      message={messageCheck(field.value)}
                    />
                  </div>
                )}
              />
              {totalCholesterol && (
                <BadgeField
                  variant={
                    categorizeTotalCholesterol(Number(totalCholesterol)).variant
                  }
                  value={
                    categorizeTotalCholesterol(Number(totalCholesterol)).message
                  }
                  className="ml-2 mt-6"
                />
              )}
            </div>

            <div className="grid grid-cols-[2fr_1fr] items-center">
              <Controller
                name="bloodTest.cholesterol.ldl"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter LDL (Bad Cholesterol)"
                    label="LDL (Bad Cholesterol) (mg/dL)"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
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
                name="bloodTest.cholesterol.hdl"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter HDL (Good Cholesterol)"
                    label="HDL (Good Cholesterol) (mg/dL)"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
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
                name="bloodTest.cholesterol.triglycerides"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Enter Triglycerides"
                    label="Triglycerides (mg/dL)"
                    labelStyle="lg:text-sm text-xs"
                    variant={variantValidityCheck(field.value)}
                    message={messageCheck(field.value)}
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
            name="bloodTest.hba1c.level"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter HbA1c Level"
                label="HbA1c Level (%)"
                labelStyle="lg:text-sm text-xs"
                variant={variantValidityCheck(field.value)}
                message={messageCheck(field.value)}
              />
            )}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button className="px-8" onClick={onNext}>
          Next
        </Button>
      </div>
    </div>
  )
}
