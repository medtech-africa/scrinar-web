import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircleIcon } from '@/components/ui/icon-picker/icons/help-circle'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import countries from '@/constants/countries.json'
import { useNcdFilter } from './NcdFilterContext'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'

type Props = {
  onNext: () => void
  disabled?: boolean
  userId?: string | null
  patientId?: string | null
  onUserIdObtained?: (userId: string) => void
}

export const PersonalInfoForm = ({
  onNext,
  disabled = false,
  userId,
  patientId,
  onUserIdObtained,
}: Props) => {
  const { control, register, watch, setValue, handleSubmit } = useFormContext()
  const { isFieldRequired } = useNcdFilter()

  const { mutate: createPatient, isPending: isCreatingPatient } = useMutation({
    mutationFn: async (data: any) => {
      const response = await baseAxios.post(API.patients, data)
      return response.data.data
    },
    onSuccess: (data) => {
      toast.success('Patient created successfully')
      if (onUserIdObtained) {
        onUserIdObtained(data.id)
      }
      onNext()
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to create patient')
    },
  })

  const handlePersonalInfoSubmit = (data: any) => {
    if (userId) {
      // If we already have userId, just proceed to next
      onNext()
    } else if (patientId) {
      // If we have patientId but no userId, create patient
      const patientData = {
        firstName: data.personalInfo.firstName,
        middleName: data.personalInfo.middleName,
        lastName: data.personalInfo.lastName,
        dateOfBirth: data.personalInfo.dateOfBirth,
        gender: data.personalInfo.gender,
        ethnicity: data.personalInfo.ethnicity,
        country: data.personalInfo.country,
        occupation: data.personalInfo.occupation,
        phoneNumber: data.personalInfo.phoneNumber,
        address: data.personalInfo.address,
        nationalId: data.personalInfo.nationalId,
        emergencyContact: data.personalInfo.emergencyContact,
      }
      createPatient(patientData)
    } else {
      // For new patient, just proceed to next
      onNext()
    }
  }

  const isFormDisabled = disabled || !!userId
  const showSubmitButton = !userId && patientId

  return (
    <TooltipProvider>
      <div>
        <Text as="h2" className="font-medium mb-2">
          Patient Bio-data
        </Text>
        <Text variant="text/sm" className="text-gray-500 mb-2 md:mb-4">
          Patient personal data
        </Text>

        {userId && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <Text variant="text/sm" className="text-green-800">
              ✅ Patient data saved successfully. You can now proceed to other
              sections.
            </Text>
          </div>
        )}

        {/* Required field indicator */}
        <div className="mb-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <Text variant="text/sm" className="text-blue-800">
            <span className="text-red-500 font-medium">*</span> indicates
            required field
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          <Controller
            name="personalInfo.firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter First Name"
                label="First Name *"
                labelStyle="lg:text-sm text-xs"
                required={isFieldRequired('personalInfo.firstName')}
                disabled={isFormDisabled}
              />
            )}
          />

          <Controller
            name="personalInfo.middleName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter Middle Name (Optional)"
                label="Middle Name"
                labelStyle="lg:text-sm text-xs"
                disabled={isFormDisabled}
              />
            )}
          />

          <Controller
            name="personalInfo.lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter Last Name"
                label="Last Name *"
                labelStyle="lg:text-sm text-xs"
                required={isFieldRequired('personalInfo.lastName')}
                disabled={isFormDisabled}
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
                placeholder="Date of Birth"
                label="Date of Birth *"
                labelStyle="lg:text-sm text-xs"
                required={isFieldRequired('personalInfo.dateOfBirth')}
                disabled={isFormDisabled}
              />
            )}
          />

          <Select
            {...register('personalInfo.gender', {
              required: isFieldRequired('personalInfo.gender'),
            })}
            label="Select Gender *"
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
            disabled={isFormDisabled}
            isDisabled={isFormDisabled}
          />

          <Select
            {...register('personalInfo.ethnicity')}
            label="Ethnicity *"
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
            disabled={isFormDisabled}
            isDisabled={isFormDisabled}
          />

          <Select
            {...register('personalInfo.country')}
            label="Country of Origin *"
            placeholder="Select Country"
            options={countries}
            value={{
              value: watch('personalInfo.country') || 'Nigeria',
              label: watch('personalInfo.country') || 'Nigeria',
            }}
            onChange={(selectedOption: any) => {
              const value = selectedOption.label
              setValue('personalInfo.country', value)
            }}
            disabled={isFormDisabled}
            isDisabled={isFormDisabled}
          />

          <Controller
            name="personalInfo.occupation"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="text"
                placeholder="Enter Occupation (Optional)"
                label="Occupation"
                labelStyle="lg:text-sm text-xs"
                disabled={isFormDisabled}
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
                disabled={isFormDisabled}
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
                placeholder="Enter Address (Optional)"
                label="Address"
                labelStyle="lg:text-sm text-xs"
                disabled={isFormDisabled}
              />
            )}
          />

          <Controller
            name="personalInfo.nationalId"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-grey-900 lg:text-sm text-xs">
                    National ID or Medical Record Number
                  </label>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <HelpCircleIcon
                        size="1rem"
                        className="text-gray-400 hover:text-gray-600 cursor-help"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Used for patient identification and medical record
                        linking. Can be a government-issued ID number or
                        internal medical record number.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  {...field}
                  type="text"
                  placeholder="Enter National ID or Medical Record Number (Optional)"
                  labelStyle="lg:text-sm text-xs"
                  disabled={isFormDisabled}
                />
              </div>
            )}
          />

          <Controller
            name="personalInfo.emergencyContact"
            control={control}
            render={({ field }) => (
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <label className="text-grey-900 lg:text-sm text-xs">
                    Emergency Contact
                  </label>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <HelpCircleIcon
                        size="1rem"
                        className="text-gray-400 hover:text-gray-600 cursor-help"
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">
                        Contact number for emergency situations. Should be
                        someone who can be reached quickly if needed.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Input
                  {...field}
                  type="tel"
                  placeholder="Enter Emergency Contact (Optional)"
                  labelStyle="lg:text-sm text-xs"
                  disabled={isFormDisabled}
                />
              </div>
            )}
          />
        </div>

        <div className="flex justify-end mt-6">
          {showSubmitButton ? (
            <Button
              className="px-8"
              onClick={handleSubmit(handlePersonalInfoSubmit)}
              disabled={isFormDisabled || isCreatingPatient}
            >
              {isCreatingPatient
                ? 'Saving Patient...'
                : 'Save Patient & Continue'}
            </Button>
          ) : (
            <Button className="px-8" onClick={onNext} disabled={isFormDisabled}>
              Next
            </Button>
          )}
        </div>
      </div>
    </TooltipProvider>
  )
}
