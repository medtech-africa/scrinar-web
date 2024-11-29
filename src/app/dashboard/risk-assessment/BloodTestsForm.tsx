import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
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

export const BloodTestsForm = () => {
  const { control, watch } = useFormContext()

  const bloodSugar1 = watch('bloodTest.bloodSugar.random')
  const bloodSugar2 = watch('bloodTest.bloodSugar.fasting')

  const tg = watch('bloodTest.cholesterol.triglycerides')
  const hdlc = watch('bloodTest.cholesterol.hdl')
  const ldlc = watch('bloodTest.cholesterol.ldl')
  const totalCholesterol = watch('bloodTest.cholesterol.total')

  return (
    <PageCard
      title="Blood tests (optional)"
      bodyStyle="px-4 pb-4 gap-4 grid grid-cols-2"
    >
      <PageCard title="Blood Sugar Level (mg/dL)" bodyStyle="space-y-1 px-2">
        <Text>
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
      </PageCard>

      <PageCard
        title="Blood Cholesterol Level (Most Recent Lipid Profile)"
        bodyStyle="px-2"
      >
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
      </PageCard>

      <PageCard title="HbA1c (Glycated Hemoglobin)" bodyStyle="px-2">
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
      </PageCard>
    </PageCard>
  )
}
