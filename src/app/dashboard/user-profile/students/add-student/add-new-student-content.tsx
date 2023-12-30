'use client'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import DatePicker from '@/components/ui/date-picker'
import schoolLevels from '@/constants/school-levels'
import { errorMessage } from '@/utils/errorMessage'
import filterObject from '@/utils/filterObject'
import useSelectImage from '@/hooks/useSelectImage'
import { useRef } from 'react'
import uploadImage from '@/utils/uploadImage'
import ConditionAvatar from '@/components/ui/condition-avatar'
import { IDataToSend, IFormValue } from './page'

const defaultValues = {
  level: { value: '', label: '' },
  gender: { value: '', label: '' },
  email: '',
  firstName: '',
  lastName: '',
  parentMobile: '',
  parentMobileAlt: '',
  password: '',
}
export const AddNewStudentContent = () => {
  const queryClient = useQueryClient()
  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: IDataToSend) =>
      baseAxios.post(API.students, dataToSend),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.createPatient,
    defaultValues: { avatar: true },
  })

  const inputFile = useRef<HTMLInputElement | null>(null)
  const {
    handleFileChange,
    selectedImg,
    setSelectedImg,
    setImageLoading,
    imageLoading,
  } = useSelectImage()

  const handleFileSelect = () => {
    if (inputFile.current) {
      inputFile.current.click()
    }
  }

  const onSubmit = async (data: IFormValue) => {
    const filteredData = filterObject(data)
    let avatarUrlRes
    if (selectedImg) {
      setImageLoading(true)
      avatarUrlRes = await uploadImage(selectedImg)
    }
    const dataToSend = {
      ...filteredData,
      gender: data.gender?.value,
      level: data.level?.value,
      dob: new Date(data.dob).toISOString(),
      ...(avatarUrlRes && { avatarUrl: avatarUrlRes?.url }),
      // age: calculateAge(data.dob),
    }
    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully added student')
          reset(defaultValues)
          setSelectedImg(null)
          postReset()
          queryClient.invalidateQueries('students' as any)
          // toast.success('')
        },
        onError: (err) => {
          // console.log(err, 'rr')
          errorMessage(err)
        },
      })
    } finally {
      setImageLoading(false)
    }
  }
  return (
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
                    message={errors.parentMobile && errors.parentMobile.message}
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
              disabled={isLoading || imageLoading}
              loading={isLoading || imageLoading}
            />
          </PageCard>
        </div>
        <div className="">
          <PageCard title="Add User Picture">
            <div className="flex flex-col justify-center items-center py-4">
              <ConditionAvatar
                avatarUrl={selectedImg ? URL.createObjectURL(selectedImg) : ''}
              />
              <Text
                className="mt-4 text-gray-900"
                variant="text/md"
                weight="medium"
              >
                Profile Picture
              </Text>
              <input
                type="file"
                onChange={handleFileChange}
                ref={inputFile}
                className="hidden"
                accept="image/*"
              />
              <Text
                variant="text/sm"
                className="text-primary cursor-pointer underline my-1.1"
                as="span"
                onClick={handleFileSelect}
              >
                Upload
              </Text>
              <div className="flex items-center">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                      onBlur={onBlur}
                      checked={!!selectedImg ? false : Boolean(value)}
                      onCheckedChange={(val) => {
                        onChange(val)
                        setSelectedImg(null)
                      }}
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
  )
}
