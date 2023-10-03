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
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import DatePicker from '@/components/ui/date-picker'
import schoolLevels from '@/constants/school-levels'
// import calculateAge from '@/utils/calculateAge'
import generateAvatarUrl from '@/utils/generateAvatarUrl'
import { errorMessage } from '@/utils/errorMessage'
import filterObject from '@/utils/filterObject'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Students', icon: IconNames.arrowRight },
  { label: 'Add New Student' },
]

interface IFormValue {
  email?: string
  firstName: string
  lastName: string
  dob: string
  gender: { value: string; label: string }
  level: { value: string; label: string }
  parentMobile: string
  parentMobileAlt?: string
  password?: string
  avatarUrl?: string
  avatar?: boolean
}

interface IDataToSend extends Omit<IFormValue, 'level' | 'gender' | 'avatar'> {
  level: string
  gender: string
  // age: number
}

export default function AddNewStudent() {
  const {
    isLoading,
    mutate,
    reset: postReset,
  } = useMutation((dataToSend: IDataToSend) =>
    baseAxios.post(API.students, dataToSend)
  )

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.createPatient,
    defaultValues: { avatar: true },
  })

  const onSubmit = async (data: IFormValue) => {
    const filteredData = filterObject(data)
    const dataToSend = {
      ...filteredData,
      gender: data.gender?.value,
      level: data.level?.value,
      avatarUrl: data.avatar ? generateAvatarUrl() : '',
      dob: new Date(data.dob).toISOString(),
      // age: calculateAge(data.dob),
    }
    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully added student')
          reset()
          postReset()
          // toast.success('')
        },
        onError: (err) => {
          // console.log(err, 'rr')
          errorMessage(err)
        },
      })
    } finally {
      //
    }
  }

  return (
    <div>
      <PageHeader
        title="Add New Student"
        subtitle="Add Student: Create New Student Profile"
        navigation={navigationItems}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-[2fr_1fr] gap-6 py-7 mt-2">
          <div className="w-full h-full">
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
                    <DatePicker
                      onBlur={onBlur}
                      value={value}
                      onChange={onChange}
                      label="Date of Birth"
                      placeholder="DD/MM/YYYY"
                      message={errors.dob && errors.dob.message}
                      variant={errors?.dob ? 'destructive' : 'default'}
                    />
                  )}
                  name="dob"
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
                        { value: 'm', label: 'Male' },
                        { value: 'f', label: 'Female' },
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
                disabled={isLoading}
                loading={isLoading}
              />
            </PageCard>
          </div>
          <div className="">
            <PageCard title="Add User Picture">
              <div className="flex flex-col justify-center items-center py-4">
                <div className="p-4 rounded-full border border-lust-100 border-dashed">
                  <IconPicker icon="add" className="text-lust-900" />
                </div>
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
