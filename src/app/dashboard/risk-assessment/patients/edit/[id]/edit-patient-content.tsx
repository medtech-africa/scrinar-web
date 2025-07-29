'use client'
import React from 'react'
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
import { usePatient } from '@/hooks/queries/usePatients'
import { IDataToSend, IFormValue } from './page'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import countries from '@/constants/countries.json'
import ContentLoader from '@/components/content-loader'
import { useRouter } from 'next/navigation'
import DatePicker from '@/components/ui/date-picker'

export const EditPatientContent = ({ patientId }: { patientId: string }) => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { data: patient, isPending: isLoading } = usePatient(patientId)

  const {
    isPending: isUpdating,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: IDataToSend) =>
      baseAxios.patch(API.patient(patientId), dataToSend),
  })

  const { control, reset, handleSubmit } = useForm<IFormValue>({
    resolver: validation.createPatient,
    defaultValues: { avatar: true },
  })

  // Set form values when patient data loads
  React.useEffect(() => {
    if (patient) {
      reset({
        email: patient.email || '',
        firstName: patient.firstName || '',
        middleName: patient.middleName || '',
        lastName: patient.lastName || '',
        dateOfBirth: patient.dateOfBirth || '',
        gender: patient.gender
          ? { value: patient.gender, label: patient.gender }
          : { value: '', label: '' },
        ethnicity: patient.ethnicity
          ? { value: patient.ethnicity, label: patient.ethnicity }
          : { value: '', label: '' },
        country: patient.country
          ? { value: patient.country, label: patient.country }
          : { value: '', label: '' },
        occupation: patient.occupation || '',
        phoneNumber: patient.phoneNumber || '',
        address: patient.address || '',
        nationalId: patient.nationalId || '',
        emergencyContact: patient.emergencyContact || '',
        avatar: true,
      })
    }
  }, [patient, reset])

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
          toast.success('Successfully updated patient')
          postReset()
          queryClient.invalidateQueries('patients' as any)
          queryClient.invalidateQueries(['singlePatient', patientId] as any)
          router.push('/dashboard/risk-assessment')
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

  if (isLoading) {
    return <ContentLoader loading={isLoading} />
  }

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

      <div className="flex justify-end mt-6 gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/dashboard/risk-assessment')}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-8"
          loading={isUpdating}
          disabled={isUpdating}
        >
          Update Patient
        </Button>
      </div>
    </form>
  )
}
