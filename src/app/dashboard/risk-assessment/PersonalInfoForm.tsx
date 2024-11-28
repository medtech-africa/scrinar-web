import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'

export const PersonalInfoForm = () => {
  const { control } = useFormContext()
  return (
    <PageCard
      title="Patient Bio Data"
      bodyStyle="px-4 pb-4 gap-4 grid grid-cols-2"
    >
      <Controller
        name="personalInfo.fullName"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter Full Name"
            label="Full Name"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.dateOfBirth"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="date"
            placeholder="Select Date of Birth"
            label="Date of Birth"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.gender"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter Gender"
            label="Gender"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.occupation"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter Occupation"
            label="Occupation"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.phoneNumber"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="tel"
            placeholder="Enter Phone Number"
            label="Phone Number"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.address"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter Address"
            label="Address"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.nationalId"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="text"
            placeholder="Enter National ID or Medical Record Number"
            label="National ID or Medical Record Number (optional)"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />

      <Controller
        name="personalInfo.emergencyContact"
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type="tel"
            placeholder="Enter Emergency Contact"
            label="Emergency Contact"
            labelStyle="lg:text-sm text-xs"
          />
        )}
      />
    </PageCard>
  )
}
