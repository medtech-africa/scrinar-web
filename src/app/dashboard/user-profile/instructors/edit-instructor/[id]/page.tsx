'use client'
import { PageHeader } from '@/components/page-header'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPicker } from '@/components/ui/icon-picker'
import { IconNames } from '@/components/ui/icon-picker/icon-names'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { useInstructor } from '@/hooks/queries/useInstructors'
import { useMutation } from '@tanstack/react-query'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { useEffect } from 'react'
import validation from '@/constants/validation'
import { Controller, useForm } from 'react-hook-form'
import {
  InstructorDataToSend,
  InstructorFormValue,
} from '@/app/dashboard/user-profile/instructors/add-instructor/page'
import filterObject from '@/utils/filterObject'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import ContentLoader from '@/components/content-loader'
import DatePicker from '@/components/ui/date-picker'
import ConditionAvatar from '@/components/ui/condition-avatar'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Instructors', icon: IconNames.arrowRight },
  { label: 'Edit Instructor' },
]
const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'instructor', label: 'Instructor' },
]
const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
]

export default function EditRecord({ params }: { params: { id: string } }) {
  const { data, isLoading, refetch } = useInstructor(params.id)
  const { isLoading: updateLoading, mutate } = useMutation(
    (dataToSend: InstructorDataToSend) =>
      baseAxios.patch(API.instructor(params.id), dataToSend)
  )
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InstructorFormValue>({
    resolver: validation.createInstructor,
  })
  useEffect(() => {
    if (data) {
      setValue('firstName', data?.firstName)
      setValue('lastName', data?.lastName)
      setValue('middleName', data?.middleName)
      setValue('email', data?.email)
      setValue('dob', data?.dob)
      setValue('gender', { value: data?.gender, label: data?.gender })
      setValue('role', { value: data?.role, label: data?.role })
      setValue('phoneNumber', data?.phoneNumber)
      setValue('avatar', !!data?.avatarUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSubmit = async (formData: InstructorFormValue) => {
    const filteredData = filterObject(formData)
    const dataToSend = {
      ...filteredData,
      gender: formData.gender?.value,
      role: data.role?.value,
      dob: new Date(formData.dob).toISOString(),
    }
    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully updated instructor')
          refetch()
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } finally {
    }
  }
  return (
    <div className="relative">
      <ContentLoader loading={isLoading} />
      <PageHeader
        title="Edit Instructor"
        subtitle="Edit Instructor: Update Teacher Profile"
        navigation={navigationItems}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
          <div className="w-full h-full order-last md:order-first">
            <PageCard title="Edit Basic Information" bodyStyle="p-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <Controller
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <Input
                      {...field}
                      value={value ?? ''}
                      className="capitalize"
                      placeholder="e.g John"
                      label="First Name"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.firstName ? 'destructive' : 'default'}
                      message={errors.firstName && errors.firstName.message}
                    />
                  )}
                  name="firstName"
                />

                <Controller
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <Input
                      {...field}
                      className="capitalize"
                      value={value ?? ''}
                      placeholder="e.g Doe"
                      label="Last Name"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.lastName ? 'destructive' : 'default'}
                      message={errors.lastName && errors.lastName.message}
                    />
                  )}
                  name="lastName"
                />
                <Controller
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <Input
                      {...field}
                      value={value ?? ''}
                      className="capitalize"
                      placeholder="e.g Doe"
                      label="Middle Name"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.middleName ? 'destructive' : 'default'}
                      message={errors.middleName && errors.middleName.message}
                    />
                  )}
                  name="middleName"
                />

                <Controller
                  control={control}
                  render={({ field: { ...field } }: any) => (
                    <Select
                      placeholder="Select Role"
                      label="Role"
                      labelStyle="lg:text-sm text-xs"
                      className="capitalize"
                      {...field}
                      options={roleOptions}
                      variant={errors?.role ? 'destructive' : 'default'}
                      message={errors.role && 'Please select a role'}
                    />
                  )}
                  name="role"
                />
                <Controller
                  control={control}
                  render={({ field: { ...field } }: any) => (
                    <Select
                      placeholder="Select Gender"
                      label="Gender"
                      labelStyle="lg:text-sm text-xs"
                      {...field}
                      className="capitalize"
                      options={genderOptions}
                      variant={errors?.gender ? 'destructive' : 'default'}
                      message={errors.gender && 'Please select a gender'}
                    />
                  )}
                  name="gender"
                />

                <Controller
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <Input
                      {...field}
                      value={value ?? ''}
                      placeholder="e.g teacher@yourschool.com"
                      label="Email"
                      labelStyle="lg:text-sm text-xs"
                      disabled={!!data?.email}
                      variant={errors?.email ? 'destructive' : 'default'}
                      type="email"
                      message={errors.email && errors.email.message}
                    />
                  )}
                  name="email"
                />
                <Controller
                  control={control}
                  render={({ field: { ...field } }) => (
                    <DatePicker
                      {...field}
                      label="Date of Birth"
                      disabled
                      placeholder="DD/MM/YYYY"
                      message={errors.dob && errors.dob.message}
                      variant={errors?.dob ? 'destructive' : 'default'}
                    />
                  )}
                  name="dob"
                />
                <Controller
                  control={control}
                  render={({ field: { value, ...field } }) => (
                    <Input
                      {...field}
                      value={value ?? ''}
                      placeholder="081123456780"
                      label="Mobile Number (Optional)"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.phoneNumber ? 'destructive' : 'default'}
                      message={errors.phoneNumber && errors.phoneNumber.message}
                    />
                  )}
                  name="phoneNumber"
                />
              </div>
              <Button
                variant={'primary'}
                value="Save User"
                leadingIcon={<IconPicker icon="saveAdd" />}
                className="mt-6"
                type="submit"
                disabled={updateLoading}
                loading={updateLoading}
              />
            </PageCard>
          </div>
          <div className="">
            <PageCard title="Edit User Picture">
              <div className="flex flex-col justify-center items-center py-4">
                <ConditionAvatar avatarUrl={data?.avatarUrl} />
                <Text
                  className="mt-4 text-gray-900"
                  variant="text/md"
                  weight="medium"
                >
                  Profile Picture
                </Text>
                <Text
                  variant="text/sm"
                  className="text-primary cursor-pointer underline my-1.1"
                  as="span"
                >
                  Upload
                </Text>
                <div className="flex items-center">
                  <Controller
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <Checkbox
                        onBlur={onBlur}
                        checked={Boolean(value)}
                        onCheckedChange={(val) => onChange(val)}
                      />
                    )}
                    name="avatar"
                  />
                  <Text className="ml-2 text-grey-500">
                    Use System Generated Avatar
                  </Text>
                </div>
              </div>
            </PageCard>
          </div>
        </div>
      </form>
    </div>
  )
}
