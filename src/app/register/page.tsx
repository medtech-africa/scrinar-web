'use client'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import ConditionAvatar from '@/components/ui/condition-avatar'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import {
  educationalInstitutionOptions,
  schoolTypeOptions,
} from '@/constants/selectOptions'
import validation from '@/constants/validation'
import useStateLGA from '@/hooks/queries/useStateLGA'
import useSelectImage from '@/hooks/useSelectImage'
import { convertStringsToOptionArray } from '@/lib/convertStringsToOptionArray'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import filterObject from '@/utils/filterObject'
import uploadImage from '@/utils/uploadImage'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import React, { useRef } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
interface IFormValue {
  email?: string
  phoneNumber?: string
  name: string
  website?: string
  state: { value: string; label: string }
  lga: { value: string; label: string }
  address: string
  zipCode?: string
  schoolType: { value: string; label: string }
  educationalInstitution: { value: string; label: string }[]
  avatar?: boolean
  template?: string
}
interface IDataToSend
  extends Omit<
    IFormValue,
    'state' | 'lga' | 'schoolType' | 'educationalInstitution'
  > {
  state: string
  lga: string
  schoolType: string
  educationalInstitution: string[]
}
const defaultValue = {
  state: { value: '', label: '' },
  lga: { value: '', label: '' },
  schoolType: { value: '', label: '' },
  educationalInstitution: [],
  email: '',
  website: '',
  name: '',
  zipCode: '',
  phoneNumber: undefined,
  address: '',
  template: 'jica',
}
const Register = () => {
  const { isPending: stateLoading, data: states } = useStateLGA()
  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (dataToSend: IDataToSend) =>
      baseAxios.post(API.schoolRegister, dataToSend),
  })
  const {
    control,
    reset,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.register,
    defaultValues: { avatar: true, template: 'jica' },
  })
  console.log('🚀 ~ Register ~ errors:', errors)
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
  const stateOptions = states?.map((state) => ({
    value: state.slug,
    label: state.name,
  }))
  const lgaOPtions = states
    ?.find((state) => state.name === getValues('state.label'))
    ?.locals.map((local) => ({ value: local.id, label: local.name }))

  const onSubmit = async (data: IFormValue) => {
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
      state: data.state?.value,
      lga: data.lga?.label,
      schoolType: data.schoolType?.value,
      educationalInstitution: data.educationalInstitution.map((r) => r.value),
      ...(avatarUrlRes && { avatarUrl: avatarUrlRes?.url }),
    }

    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successful')
          reset(defaultValue)
          setSelectedImg(null)
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } finally {
      setImageLoading(false)
    }
  }
  return (
    <div className="grid md:grid-cols-2 grid-rows-1  h-screen">
      <div className="hidden md:block relative w-full h-full">
        <Image src="/login_image.png" alt="login" fill={true} />
        <div className="bg-gradient-to-t from-black  opacity-[150.49%] absolute w-full h-full top-0 left-0"></div>
      </div>
      <div className="grid place-items-center">
        <div className="md:w-[594px] px-4 flex justify-center items-center flex-col ">
          <div className="flex flex-col gap-y-6 items-center">
            <Image src="/logo_large.png" width={120} height={120} alt="logo" />
            <div>
              <Text
                variant="display/xs"
                weight="medium"
                className="flex justify-center"
              >
                Welcome to Play4Health
              </Text>
              <Text
                variant="text/sm"
                className="text-grey-600 text-center"
              ></Text>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="border border-grey-100 bg-white p-8 w-full mt-6 flex flex-col rounded-md"
          >
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
                title="profile pic"
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
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
              <Controller
                control={control}
                name="email"
                key="email"
                render={({ field: { value, ...field } }) => (
                  <Input
                    {...field}
                    value={value ?? ''}
                    label="School Email Address"
                    placeholder="e.g dammy@play4health.com"
                    leadingIcon={<IconPicker icon="mail" />}
                    full
                    variant={errors?.email ? 'destructive' : 'default'}
                    message={errors.email && errors.email?.message}
                  />
                )}
              />
              <Controller
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Input
                    {...field}
                    value={value ?? ''}
                    className="capitalize"
                    placeholder="e.g oriwu model"
                    label="School Name"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.name ? 'destructive' : 'default'}
                    message={errors.name && errors.name.message}
                  />
                )}
                name="name"
              />
              <Controller
                control={control}
                name="phoneNumber"
                key="phoneNumber"
                render={({ field: { value, ...field } }) => (
                  <Input
                    {...field}
                    value={value ?? ''}
                    labelStyle="lg:text-sm text-xs"
                    placeholder="0812367890"
                    label="School Mobile Number"
                    variant={errors?.phoneNumber ? 'destructive' : 'default'}
                    message={errors.phoneNumber && errors.phoneNumber?.message}
                  />
                )}
              />
              <Controller
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Input
                    {...field}
                    value={value ?? ''}
                    className="capitalize"
                    placeholder="e.g oriwu.com"
                    label="School Webiste"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.website ? 'destructive' : 'default'}
                    message={errors.website && errors.website.message}
                  />
                )}
                name="website"
              />
              <Controller
                control={control}
                render={({ field: { onChange, ...field } }: any) => (
                  <Select
                    placeholder="Select State"
                    label="State"
                    onChange={(val) => {
                      onChange(val)
                      resetField('lga', {
                        defaultValue: {
                          value: '',
                          label: '',
                        },
                      })
                    }}
                    labelStyle="lg:text-sm text-xs"
                    className="capitalize"
                    isLoading={stateLoading}
                    {...field}
                    options={stateOptions}
                    variant={errors?.state ? 'destructive' : 'default'}
                    message={errors.state?.message}
                  />
                )}
                name="state"
              />

              <Controller
                control={control}
                render={({ field: { ...field } }) => (
                  <Select
                    placeholder="Select City"
                    label="City"
                    labelStyle="lg:text-sm text-xs"
                    isLoading={stateLoading}
                    {...field}
                    className="capitalize"
                    options={lgaOPtions}
                    variant={errors?.lga ? 'destructive' : 'default'}
                    message={errors.lga?.message}
                  />
                )}
                name="lga"
              />

              <Controller
                control={control}
                render={({ field: { ...field } }: any) => (
                  <Select
                    placeholder="e.g  Private School"
                    label="School Type"
                    labelStyle="lg:text-sm text-xs"
                    {...field}
                    className="capitalize"
                    options={schoolTypeOptions}
                    variant={errors?.schoolType ? 'destructive' : 'default'}
                    message={errors.schoolType?.message}
                  />
                )}
                name="schoolType"
              />
              <Controller
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Input
                    {...field}
                    value={value ?? ''}
                    className="capitalize"
                    placeholder="e.g no 55, Alagomeji yaba,lagos"
                    label="School Address"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.address ? 'destructive' : 'default'}
                    message={errors.address && errors.address.message}
                  />
                )}
                name="address"
              />
              <Controller
                control={control}
                render={({ field: { value, ...field } }) => (
                  <Input
                    {...field}
                    value={value ?? ''}
                    className="capitalize"
                    placeholder="e.g 100010"
                    label="Zipcode"
                    labelStyle="lg:text-sm text-xs"
                    variant={errors?.zipCode ? 'destructive' : 'default'}
                    message={errors.zipCode && errors.zipCode.message}
                  />
                )}
                name="zipCode"
              />
              <Controller
                control={control}
                render={({ field: { value, ...field } }: any) => (
                  <Select
                    className="capitalize"
                    placeholder="e.g primary"
                    isMulti={true}
                    label="Educational Institution"
                    labelStyle="lg:text-sm text-xs"
                    value={value}
                    {...field}
                    options={educationalInstitutionOptions}
                    variant={
                      errors?.educationalInstitution ? 'destructive' : 'default'
                    }
                    message={errors.educationalInstitution?.message}
                  />
                )}
                name="educationalInstitution"
              />

              <Controller
                control={control}
                render={({ field: { onChange, ...field } }: any) => (
                  <Select
                    placeholder="Select Template"
                    label="Template"
                    onChange={(val: { value: string }) => {
                      onChange(val.value)
                    }}
                    labelStyle="lg:text-sm text-xs"
                    className="capitalize"
                    isLoading={stateLoading}
                    {...field}
                    options={convertStringsToOptionArray([
                      'jica',
                      'play4health',
                    ])}
                  />
                )}
                name="template"
              />
            </div>

            <Button
              className="mt-4 "
              value="Register"
              variant="primary"
              loading={isLoading || imageLoading}
              disabled={isLoading || imageLoading}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register
