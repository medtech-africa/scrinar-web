import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import countries from '@/constants/countries.json'

type Props = {
  onNext: () => void
}
export const PersonalInfoForm = ({ onNext }: Props) => {
  const { control, register, watch, setValue } = useFormContext()
  return (
    <div>
      <Text as="h2" className="font-medium mb-2">
        Patient Bio-data
      </Text>
      <Text variant="text/sm" className="text-gray-500 mb-2 md:mb-4">
        Patient personal data
      </Text>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
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

        <Select
          {...register('personalInfo.ethnicity')}
          label="Ethnicity"
          placeholder="Select Ethnicity"
          options={convertStringsToOptionArray([
            'Black/African',
            'Asian',
            'Caucasian/White',
            'Hispanic/Latino',
            'Middle Eastern',
            'Native American/Indigenous',
            'Pacific Islander',
            'Mixed/Multiple Ethnicities',
            'Other',
          ])}
          value={{
            value: watch('personalInfo.ethnicity'),
            label: watch('personalInfo.ethnicity'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('personalInfo.ethnicity', value)
          }}
        />

        <Controller
          name="personalInfo.dateOfBirth"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="date"
              placeholder="Date of Birth"
              label="Date of Birth"
              labelStyle="lg:text-sm text-xs"
            />
          )}
        />

        <Select
          {...register('personalInfo.country')}
          label="Country of Origin"
          placeholder="Select Country"
          options={countries}
          value={{
            value: watch('personalInfo.country'),
            label: watch('personalInfo.country'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('personalInfo.country', value)
          }}
        />

        <Select
          {...register('personalInfo.gender')}
          label="Select Gender"
          placeholder="Select Gender"
          options={convertStringsToOptionArray(['Male', 'Female'])}
          value={{
            value: watch('personalInfo.gender'),
            label: watch('personalInfo.gender'),
          }}
          onChange={(selectedOption: any) => {
            const value = selectedOption.value
            setValue('personalInfo.gender', value)
          }}
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
