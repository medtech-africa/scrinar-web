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
import baseAxios from '@/utils/baseAxios'
import { useMutation } from '@tanstack/react-query'
import { IFormValue } from '../../add-student/page'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { errorMessage } from '@/utils/errorMessage'
import toast from 'react-hot-toast'
import filterObject from '@/utils/filterObject'
import { API } from '@/utils/api'
import { useStudent } from '@/hooks/queries/useStudents'
import ContentLoader from '@/components/content-loader'
import schoolLevels from '@/constants/school-levels'
import { useEffect } from 'react'
import { Avatar } from '@/components/ui/avatar'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Students', icon: IconNames.arrowRight },
  { label: 'Edit Student' },
]
interface IDataToSend
  extends Omit<IFormValue, 'level' | 'gender' | 'avatar' | 'dob'> {
  level?: string
  gender?: string
  dob?: string
  // age: number
}
export default function EditRecord({ params }: { params: { id: string } }) {
  const { data, isLoading, refetch } = useStudent(params.id)
  const { isPending: updateLoading, mutate } = useMutation({
    mutationFn: (dataToSend: IDataToSend) =>
      baseAxios.patch(API.student(params.id), dataToSend),
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.createPatient,
  })
  useEffect(() => {
    if (data) {
      setValue('firstName', data?.firstName)
      setValue('lastName', data?.lastName)
      setValue('email', data?.email)
      setValue('age', data?.age)
      setValue('parentMobile', data?.parentMobile)
      setValue('parentMobileAlt', data?.parentMobileAlt)
      setValue('gender', { value: data?.gender, label: data?.gender })
      setValue('level', { value: data?.level, label: data?.level })
      setValue('avatar', !!data?.avatarUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const onSubmit = async (formData: IFormValue) => {
    const filteredData = filterObject(formData)
    const dataToSend = {
      ...filteredData,
      gender: formData.gender?.value,
      level: data.level?.value,
    }
    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully updated student')
          refetch()
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } finally {
      //
    }
  }

  return (
    <div className="relative">
      <ContentLoader loading={isLoading} />
      <PageHeader
        title="Edit Student"
        subtitle="Edit Student: Modify Student Profile"
        navigation={navigationItems}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
          <div className="w-full h-full order-last md:order-first">
            <PageCard title="Add Basic Information" bodyStyle="p-4">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ?? ''}
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
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
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      label="Age"
                      disabled
                      placeholder="Student age"
                      message={errors.age && errors.age.message}
                      variant={errors?.age ? 'destructive' : 'default'}
                    />
                  )}
                  name="age"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ?? ''}
                      placeholder="email@play4health.com"
                      label="Email"
                      disabled={!!data?.email}
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.email ? 'destructive' : 'default'}
                      type="email"
                      message={errors.email && errors.email.message}
                    />
                  )}
                  name="email"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ?? ''}
                      placeholder="08112345678"
                      label="Parent Mobile Number 1"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.parentMobile ? 'destructive' : 'default'}
                      message={
                        errors.parentMobile && errors.parentMobile.message
                      }
                    />
                  )}
                  name="parentMobile"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ?? ''}
                      placeholder="08112345678"
                      label="Parent Mobile Number 2"
                      labelStyle="lg:text-sm text-xs"
                      variant={
                        errors?.parentMobileAlt ? 'destructive' : 'default'
                      }
                      message={
                        errors.parentMobileAlt && errors.parentMobileAlt.message
                      }
                    />
                  )}
                  name="parentMobileAlt"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <Select
                      placeholder="Select Gender"
                      label="Gender"
                      labelStyle="lg:text-sm text-xs"
                      onBlur={onBlur}
                      value={value}
                      onChange={(val) => {
                        onChange(val)
                      }}
                      // onChange={(val) => {
                      //   console.log(val)
                      //   onChange(val)
                      // }}
                      options={[
                        { value: 'male', label: 'Male' },
                        { value: 'female', label: 'Female' },
                      ]}
                      variant={errors?.gender ? 'destructive' : 'default'}
                      message={errors.gender && 'Please select a gender'}
                    />
                  )}
                  name="gender"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <Select
                      placeholder="Select class"
                      label="Class"
                      labelStyle="lg:text-sm text-xs"
                      onBlur={onBlur}
                      isSearchable
                      value={value}
                      defaultValue={data?.level}
                      onChange={(val) => {
                        onChange(val)
                      }}
                      options={schoolLevels}
                      variant={errors?.level ? 'destructive' : 'default'}
                      message={errors.level && 'Please select a class'}
                    />
                  )}
                  name="level"
                />

                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }: any) => (
                    <Input
                      placeholder="••••••••••••"
                      label="Password"
                      labelStyle="lg:text-sm text-xs"
                      onBlur={onBlur}
                      value={value ?? ''}
                      type="password"
                      onChange={(val: any) => onChange(val)}
                      message="By default, the first name is user’s Password"
                    />
                  )}
                  name="password"
                />
              </div>
              <Button
                variant={'primary'}
                value="Save User"
                type="submit"
                leadingIcon={<IconPicker icon="saveAdd" />}
                className="mt-6"
                disabled={updateLoading}
                loading={updateLoading}
              />
            </PageCard>
          </div>
          <div className="">
            <PageCard title="Add User Picture">
              <div className="flex flex-col justify-center items-center py-4">
                {data?.avatarUrl ? (
                  <Avatar size="sm" src={data?.avatarUrl} />
                ) : (
                  <div className="p-4 rounded-full border border-lust-100 border-dashed">
                    <IconPicker icon="add" className="text-lust-900" />
                  </div>
                )}
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
                  {/* <Checkbox  /> */}
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
