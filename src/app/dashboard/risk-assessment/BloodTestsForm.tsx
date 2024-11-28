import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { messageCheck, variantValidityCheck } from './utils'

export const BloodTestsForm = () => {
  const { control } = useFormContext()

  return (
    <PageCard
      title="Blood tests (optional)"
      bodyStyle="px-4 pb-4 gap-4 grid grid-cols-2"
    >
      <PageCard title="Blood Sugar Level (mg/dL)">
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="bloodSugar.random"
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
          <Controller
            name="bloodSugar.fasting"
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
        </div>
      </PageCard>

      <PageCard title="Blood Cholesterol Level (Most Recent Lipid Profile)">
        <div className="grid gap-4 grid-cols-2">
          <Controller
            name="cholesterol.total"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter Total Cholesterol"
                label="Total Cholesterol (mg/dL)"
                labelStyle="lg:text-sm text-xs"
                variant={variantValidityCheck(field.value)}
                message={messageCheck(field.value)}
              />
            )}
          />
          <Controller
            name="cholesterol.ldl"
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
          <Controller
            name="cholesterol.hdl"
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
          <Controller
            name="cholesterol.triglycerides"
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
        </div>
      </PageCard>

      <PageCard title="HbA1c (Glycated Hemoglobin)">
        <Controller
          name="hba1c.level"
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
