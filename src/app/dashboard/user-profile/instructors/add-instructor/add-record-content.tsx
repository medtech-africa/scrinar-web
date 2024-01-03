'use client'
import { PageCard } from '@/components/ui/page-card'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { useMutation } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import filterObject from '@/utils/filterObject'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import DatePicker from '@/components/ui/date-picker'
import { useRef, useState } from 'react'
import ConditionAvatar from '@/components/ui/condition-avatar'
import uploadImage from '@/utils/uploadImage'
import useSelectImage from '@/hooks/useSelectImage'
import { InstructorDataToSend, InstructorFormValue } from './page'

const defaultValues = {
  role: { value: '', label: '' },
  gender: { value: '', label: '' },
  email: '',
  phoneNumber: '',
  firstName: '',
  lastName: '',
  middleName: '',
  password: '',
}
export const AddRecordContent = () => {
  const [isVisible, setIsvisible] = useState(false)

  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: InstructorDataToSend) =>
      baseAxios.post(API.instructors, dataToSend),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<InstructorFormValue>({
    resolver: validation.createInstructor,
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

  const onSubmit = async (data: InstructorFormValue) => {
    if (!data?.email && !data.phoneNumber) {
      return toast.error('Enter a Phone Number or Email')
    }
    const { avatar: _, ...filteredData } = filterObject(data)
    let avatarUrlRes
    if (selectedImg) {
      setImageLoading(true)
      avatarUrlRes = await uploadImage(selectedImg)
    }
    const dataToSend = {
      ...filteredData,
      role: data.role?.value,
      gender: data.gender?.value,
      dob: new Date(data.dob).toISOString(),
      ...(avatarUrlRes && { avatarUrl: avatarUrlRes?.url }),
    }
    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully added instructor')
          reset(defaultValues)
          setSelectedImg(null)
          postReset()
        },
        onError(error) {
          errorMessage(error)
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
                name="firstName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    placeholder="e.g John"
                    label="First Name"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.firstName ? 'destructive' : 'default'}
                    message={errors.firstName && errors.firstName?.message}
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
                    variant={errors?.lastName ? 'destructive' : 'default'}
                    message={errors.lastName && errors.lastName?.message}
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
                    placeholder="e.g Doe"
                    label="Middle Name"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.middleName ? 'destructive' : 'default'}
                    message={errors.middleName && errors.middleName?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="role"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Select
                    placeholder="Select Role"
                    label="Role"
                    labelStyle="lg:text-sm text-xs"
                    onBlur={onBlur}
                    value={value}
                    onChange={(val) => {
                      onChange(val)
                    }}
                    options={[
                      { value: 'admin', label: 'Admin' },
                      { value: 'instructor', label: 'Instructor' },
                    ]}
                    variant={errors?.role ? 'destructive' : 'default'}
                    message={errors.role && 'Please select a role'}
                  />
                )}
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
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    placeholder="e.g teacher@yourschool.com"
                    label="Email"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.email ? 'destructive' : 'default'}
                    message={errors.email && errors.email?.message}
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
                    labelStyle="lg:text-sm text-xs"
                    placeholder="0812367890"
                    label="Mobile Number (Optional)"
                    variant={errors?.phoneNumber ? 'destructive' : 'default'}
                    message={errors.phoneNumber && errors.phoneNumber?.message}
                  />
                )}
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
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={(val: any) => onChange(val)}
                    onBlur={onBlur}
                    value={value ?? ''}
                    labelStyle="lg:text-sm text-xs"
                    placeholder="••••••••••••"
                    endingIcon={
                      isVisible ? (
                        <div onClick={() => setIsvisible(!isVisible)}>
                          <IconPicker icon="eyeOpen" />
                        </div>
                      ) : (
                        <div onClick={() => setIsvisible(!isVisible)}>
                          <IconPicker icon="eyeClose" />
                        </div>
                      )
                    }
                    label="Password"
                    type={isVisible ? 'text' : 'password'}
                    message={'By default, the first name is user’s Password'}
                  />
                )}
              />
            </div>
            <Button
              variant={'primary'}
              value="Save User"
              leadingIcon={<IconPicker icon="saveAdd" />}
              className="mt-6"
              loading={isLoading || imageLoading}
              disabled={isLoading || imageLoading}
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
