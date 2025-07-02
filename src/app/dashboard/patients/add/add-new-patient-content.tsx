'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'

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

const defaultValues = {
  email: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  gender: { value: '', label: '' },
  ethnicity: { value: '', label: '' },
  country: { value: '', label: '' },
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
    defaultValues: { avatar: true },
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
    'Black/African',
    'Asian',
    'Caucasian/White',
    'Hispanic/Latino',
    'Middle Eastern',
    'Native American/Indigenous',
    'Pacific Islander',
    'Mixed/Multiple Ethnicities',
    'Other',
  ])

  return (
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
                label="First Name"
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
                label="Last Name"
                labelStyle="lg:text-sm text-xs"
                required
              />
            )}
          />

          <Controller
            control={control}
            name="dateOfBirth"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ''}
                type="date"
                placeholder="Date of Birth"
                label="Date of Birth"
                labelStyle="lg:text-sm text-xs"
                required
              />
            )}
          />

          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <Select
                label="Select Gender"
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
                placeholder="Enter Occupation"
                label="Occupation (Optional)"
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
                label="Phone Number"
                labelStyle="lg:text-sm text-xs"
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
                placeholder="Enter Address"
                label="Address"
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />

          <Controller
            control={control}
            name="nationalId"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ''}
                placeholder="Enter National ID or Medical Record Number"
                label="National ID or Medical Record Number (Optional)"
                labelStyle="lg:text-sm text-xs"
              />
            )}
          />

          <Controller
            control={control}
            name="emergencyContact"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                onChange={onChange}
                onBlur={onBlur}
                value={value ?? ''}
                type="tel"
                placeholder="Enter Emergency Contact"
                label="Emergency Contact (Optional)"
                labelStyle="lg:text-sm text-xs"
              />
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
                placeholder="Enter Email Address"
                label="Email Address (Optional)"
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
  )
}
