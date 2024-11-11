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
import { IFormValue } from '../../add/page'
import { Controller, useForm } from 'react-hook-form'
import validation from '@/constants/validation'
import { errorMessage } from '@/utils/errorMessage'
import toast from 'react-hot-toast'
import filterObject from '@/utils/filterObject'
import { API } from '@/utils/api'
import { useParent, useParentQuestionnaire } from '@/hooks/queries/useParents'
import ContentLoader from '@/components/content-loader'
import { useEffect, useMemo } from 'react'
import { Avatar } from '@/components/ui/avatar'
import { ParentQuestionnaire } from '../../questionnaire'
import { formatQuestionnaireData } from '@/utils/parentQuestionnaire'

const navigationItems = [
  { label: 'User Profile', icon: IconNames.arrowRight },
  { label: 'Parents', icon: IconNames.arrowRight },
  { label: 'Edit Parent' },
]
interface IDataToSend extends Omit<IFormValue, 'level' | 'gender' | 'avatar'> {
  gender?: string
}
export default function EditRecord({ params }: { params: { id: string } }) {
  const { data, isLoading, refetch } = useParent(params.id)
  const { data: questionnaireData, isLoading: qIsLoading } =
    useParentQuestionnaire(params.id)

  const defaultQues = useMemo(
    () => formatQuestionnaireData(questionnaireData),
    [questionnaireData]
  )

  const { isPending: updateLoading, mutate } = useMutation({
    mutationFn: (dataToSend: IDataToSend) =>
      baseAxios.patch(API.parent(params.id), dataToSend),
  })

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.createParent,
  })
  useEffect(() => {
    if (data) {
      setValue('firstName', data?.firstName)
      setValue('lastName', data?.lastName)
      setValue('email', data?.email)
      setValue('mobile', data?.mobile)
      setValue('familyCode', data?.familyCode)
      setValue('gender', { value: data?.gender, label: data?.gender })
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
          toast.success('Successfully updated parent')
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
      <ContentLoader loading={isLoading || qIsLoading} />
      <PageHeader
        title="Edit Parent"
        subtitle="Edit Parent: Modify Parent Profile"
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
                      onChange={onChange}
                      onBlur={onBlur}
                      value={value ?? ''}
                      placeholder="ayans124"
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
                  <Text className="ml-2 text-grey-500">In School</Text>
                </div>
              </div>
            </PageCard>
          </div>
        </div>
      </form>

      {data && (
        <>
          <Text
            variant="display/xs"
            weight="medium"
            className="text-grey-900 capitalize mb-3"
          >
            Questionnaire
          </Text>
          <ParentQuestionnaire
            gender={data?.gender}
            parentId={data.id}
            defaultValue={defaultQues}
          />
        </>
      )}
    </div>
  )
}
