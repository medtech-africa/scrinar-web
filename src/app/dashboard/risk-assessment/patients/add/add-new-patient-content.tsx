'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { HelpCircleIcon } from '@/components/ui/icon-picker/icons/help-circle'

import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import filterObject from '@/utils/filterObject'
import { IDataToSend, IFormValue } from './page'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import countries from '@/constants/countries.json'
import DatePicker from '@/components/ui/date-picker'

const defaultValues = {
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: { value: '', label: '' },
  ethnicity: { value: '', label: '' },
  country: { value: 'Nigeria', label: 'Nigeria' },
  occupation: '',
  phoneNumber: '',
  address: '',
  nationalId: '',
  emergencyContact: '',
}

export const AddNewPatientContent = () => {
  const queryClient = useQueryClient()
  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: IDataToSend) =>
      baseAxios.post(API.patients, dataToSend),
  })

  const { control, reset, handleSubmit } = useForm<IFormValue>({
    resolver: validation.createPatient,
    defaultValues: { avatar: true, ...defaultValues },
  })

  const onSubmit = async (data: IFormValue) => {
    const filteredData = filterObject(data)

    const dataToSend = {
      ...filteredData,
      gender: data.gender?.value,
      ethnicity: data.ethnicity?.value,
      country: data.country?.value,
    }

    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully added patient')
          reset(defaultValues)
          postReset()
          queryClient.invalidateQueries('patients' as any)
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } catch (error) {
      // Error handling is done in onError callback
    }
  }

  const ethnicityOptions = convertStringsToOptionArray([
    ['Black/African', 'black'],
    ['Asian', 'asian'],
    ['Caucasian/White', 'white'],
    ['Hispanic/Latino', 'hispanic'],
    ['Other', 'other'],
  ])

  return (
    <TooltipProvider>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full pt-7 mt-2">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  placeholder="e.g John"
                  label="First Name *"
                  labelStyle="lg:text-sm text-xs"
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="middleName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  placeholder="e.g Michael"
                  label="Middle Name (Optional)"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />

            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  placeholder="e.g Doe"
                  label="Last Name *"
                  labelStyle="lg:text-sm text-xs"
                  required
                />
              )}
            />

            <Controller
              name="dateOfBirth"
              control={control}
              render={({ field }) => (
                <DatePicker
                  {...field}
                  label="Date of Birth *"
                  placeholder="Select Date of Birth"
                  value={field.value}
                  onChange={(value) => {
                    field.onChange(value)
                  }}
                />
              )}
            />

            <Controller
              control={control}
              name="gender"
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Select Gender *"
                  placeholder="Select Gender"
                  options={convertStringsToOptionArray(['Male', 'Female'])}
                  value={value}
                  onChange={onChange}
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="ethnicity"
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Ethnicity"
                  placeholder="Select Ethnicity"
                  options={ethnicityOptions}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, value } }) => (
                <Select
                  label="Country of Origin"
                  placeholder="Select Country"
                  options={countries}
                  value={value}
                  onChange={onChange}
                />
              )}
            />

            <Controller
              control={control}
              name="occupation"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  placeholder="Enter Occupation (Optional)"
                  label="Occupation"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />

            <Controller
              control={control}
              name="phoneNumber"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  type="tel"
                  placeholder="Enter Phone Number"
                  label="Phone Number *"
                  labelStyle="lg:text-sm text-xs"
                  required
                />
              )}
            />

            <Controller
              control={control}
              name="address"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  placeholder="Enter Address (Optional)"
                  label="Address"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />

            <Controller
              control={control}
              name="nationalId"
              render={({ field: { onChange, onBlur, value } }) => (
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
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    placeholder="Enter National ID or Medical Record Number (Optional)"
                    labelStyle="lg:text-sm text-xs"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="emergencyContact"
              render={({ field: { onChange, onBlur, value } }) => (
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
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    type="tel"
                    placeholder="Enter Emergency Contact (Optional)"
                    labelStyle="lg:text-sm text-xs"
                  />
                </div>
              )}
            />

            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value ?? ''}
                  type="email"
                  placeholder="Enter Email Address (Optional)"
                  label="Email Address"
                  labelStyle="lg:text-sm text-xs"
                />
              )}
            />
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button
            type="submit"
            className="px-8"
            loading={isLoading}
            disabled={isLoading}
          >
            Add Patient
          </Button>
        </div>
      </form>
    </TooltipProvider>
  )
}
