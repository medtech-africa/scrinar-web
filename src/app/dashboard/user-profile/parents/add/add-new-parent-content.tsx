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
import { errorMessage } from '@/utils/errorMessage'
import filterObject from '@/utils/filterObject'
import useSelectImage from '@/hooks/useSelectImage'
import { useRef, useState } from 'react'
import uploadImage from '@/utils/uploadImage'
import ConditionAvatar from '@/components/ui/condition-avatar'
import { IDataToSend, IFormValue } from './page'
import { ParentQuestionnaire } from '../questionnaire'

const defaultValues = {
  gender: { value: '', label: '' },
  email: '',
  firstName: '',
  lastName: '',
  mobile: '',
  familyCode: '',
  isGuardian: false,
}

export const AddNewParentContent = () => {
  const queryClient = useQueryClient()
  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: ({ id, ...dataToSend }: Omit<IDataToSend, 'level'>) =>
      id
        ? baseAxios.patch(API.parent(id), dataToSend)
        : baseAxios.post(API.parents, dataToSend),
  })

  const [showQuestionnaire, setShowQuestionnaire] = useState(false)
  const [parentAddedId, setParentAddedId] = useState('')

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IFormValue>({
    resolver: validation.createParent,
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

  const onSubmit = async (data: IFormValue, questionnaire = false) => {
    const filteredData = filterObject(data)
    let avatarUrlRes
    if (selectedImg) {
      setImageLoading(true)
      avatarUrlRes = await uploadImage({ file: selectedImg })
    }
    const dataToSend = {
      ...filteredData,
      gender: data.gender?.value,
      ...(avatarUrlRes && { avatarUrl: avatarUrlRes?.url }),
      ...(parentAddedId && { id: parentAddedId }),
      age: Number(data.age),
    }

    try {
      await mutate(dataToSend, {
        onSuccess: (res) => {
          if (questionnaire) {
            const parentId = res.data?.data?.id
            baseAxios.get(API.parentQuestionnaire(parentId))
            setParentAddedId(parentId)
            setShowQuestionnaire(true)
          } else if (!questionnaire) {
            setSelectedImg(null)
            reset(defaultValues)
            postReset()
          }

          toast.success(
            `Successfully saved parent${questionnaire ? ', you can continue with the questionnaire' : ''}`
          )
          queryClient.invalidateQueries('students' as any)
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } finally {
      setImageLoading(false)
    }
  }

  const gender = watch('gender')?.value

  return (
    <>
      <form>
        <div className="grid md:grid-cols-[2fr_1fr] gap-6 pt-7 mt-2">
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
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ?? ''}
                      placeholder="123"
                      label="HouseHold code"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.familyCode ? 'destructive' : 'default'}
                      message={errors.familyCode && errors.familyCode.message}
                    />
                  )}
                  name="familyCode"
                />

                <Controller
                  control={control}
                  render={({ field: { value, ...rest } }) => (
                    <Input
                      {...rest}
                      value={value ?? ''}
                      label="Age"
                      placeholder="Parent age"
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
                  render={({ field: { value, ...rest } }) => (
                    <Input
                      {...rest}
                      value={value ?? ''}
                      placeholder="08112345678"
                      label="Mobile Number"
                      labelStyle="lg:text-sm text-xs"
                      variant={errors?.mobile ? 'destructive' : 'default'}
                      message={errors.mobile && errors.mobile.message}
                    />
                  )}
                  name="mobile"
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
              </div>

              <div className="mt-6 flex items-center">
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Checkbox
                      onBlur={onBlur}
                      checked={Boolean(value)}
                      onCheckedChange={(val) => {
                        onChange(val)
                        setSelectedImg(null)
                      }}
                    />
                  )}
                  name="isGuardian"
                />

                <Text className="ml-2 text-base text-grey-700">
                  Is Guardian?
                </Text>
              </div>

              <div className="mt-6 flex items-center">
                <Checkbox
                  checked={showQuestionnaire}
                  onCheckedChange={(val) => {
                    if (Boolean(val)) {
                      handleSubmit((data) => onSubmit(data, true))() // create a parent
                    } else {
                      setShowQuestionnaire(Boolean(val))
                    }
                  }}
                />
                {/* <Checkbox  /> */}
                <div className="flex gap-2">
                  <Text className="ml-2 text-base text-grey-700">
                    Add Questionnaire
                  </Text>
                  {(isLoading || imageLoading) && (
                    <>
                      <IconPicker icon="loader2" size="1rem" className="mr-2" />
                      Please wait
                    </>
                  )}
                </div>
              </div>

              {!showQuestionnaire && (
                <Button
                  variant={'primary'}
                  onClick={handleSubmit((data) => onSubmit(data))}
                  value="Save User"
                  type="submit"
                  leadingIcon={<IconPicker icon="saveAdd" />}
                  className="mt-6"
                  disabled={isLoading || imageLoading}
                  loading={isLoading || imageLoading}
                />
              )}
            </PageCard>
          </div>
          <div className="">
            <PageCard title="Add User Picture">
              <div className="flex flex-col justify-center items-center py-4">
                <ConditionAvatar
                  avatarUrl={
                    selectedImg ? URL.createObjectURL(selectedImg) : ''
                  }
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
                  title="profile picture"
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
      {showQuestionnaire && (
        <ParentQuestionnaire gender={gender} parentId={parentAddedId} />
      )}
    </>
  )
}
