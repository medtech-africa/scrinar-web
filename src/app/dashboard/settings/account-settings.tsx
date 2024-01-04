'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PageCard } from '@/components/ui/page-card'
import { Select } from '@/components/ui/select'
import useStateLGA from '@/hooks/queries/useStateLGA'
import uploadImage from '@/utils/uploadImage'
import { useMutation } from '@tanstack/react-query'
import filterObject from '@/utils/filterObject'
import { Controller, useForm } from 'react-hook-form'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import validation from '@/constants/validation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import { IconPicker } from '@/components/ui/icon-picker'
import {
  educationalInstitutionOptions,
  genderOptions,
  roleOptions,
  schoolTypeOptions,
} from '@/constants/selectOptions'
import { useUser } from '@/context/user'
import useProfile from '@/hooks/queries/useProfile'
import { InstructorFormValue } from '../user-profile/instructors/add-instructor/page'
import DatePicker from '@/components/ui/date-picker'
import { HealthDataPayload } from '@/types/healthData.types'
import { isMasterInstructor } from '@/utils/checkPermission'

interface IFormValue {
  email?: string
  phoneNumber?: string
  name: string
  website: string
  state: { value: string; label: string }
  lga: { value: string; label: string }
  address: string
  zipCode?: string
  schoolType: { value: string; label: string }
  educationalInstitution: { value: string; label: string }[]
}

const AdminUpdate = ({ selectedImg = null as File | null }) => {
  const { isLoading: stateLoading, data: states } = useStateLGA()
  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (dataToSend: HealthDataPayload) =>
      baseAxios.patch(API.schoolUpdate, dataToSend),
  })
  const {
    control,
    handleSubmit,
    resetField,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.register,
  })
  const [imageLoading, setImageLoading] = useState(false)
  const stateOptions = states?.map((state) => ({
    value: state.slug,
    label: state.name,
  }))
  const lgaOPtions = states
    ?.find((state) => state.name === getValues('state.label'))
    ?.locals.map((local) => ({ value: local.id, label: local.name }))
  const { refetch } = useProfile()
  const { user, setUser } = useUser()

  useEffect(() => {
    setValue('email', user?.user?.email)
    setValue('phoneNumber', user?.user?.phoneNumber)
    setValue('website', user?.website ?? '')
    setValue('name', user?.name ?? '')
    setValue('schoolType', {
      value: user?.schoolType ?? '',
      label: user?.schoolType ?? '',
    })
    setValue('state', { value: user?.state ?? '', label: user?.state ?? '' })
    setValue('zipCode', user?.zipCode)
    setValue(
      'educationalInstitution',
      user?.educationalInstitution?.map((v: string) => ({
        value: v,
        label: v,
      })) ?? []
    )
    setValue('address', user?.address ?? '')
    setValue('lga', { value: user?.lga ?? '', label: user?.lga ?? '' })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const onSubmit = async (data: IFormValue) => {
    if (!data?.email && !data.phoneNumber) {
      return toast.error('Enter a Phone Number or Email')
    }
    const filteredData = filterObject(data)
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
          refetch().then((res) => {
            console.log(res.data)
            setUser(res.data?.data)
          })
          toast.success('Successfully updated')
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
    <PageCard title="Personal Information" bodyStyle="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
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
        </div>
        <Button
          value="Update Settings"
          className="mt-6 py-3 px-4"
          variant="primary"
          loading={isLoading || imageLoading}
          disabled={isLoading || imageLoading}
          type="submit"
        />
      </form>
    </PageCard>
  )
}

const InstructorUpdate = ({ selectedImg = null as File | null, id = '' }) => {
  const { isPending: isLoading, mutate } = useMutation({
    mutationFn: (dataToSend: HealthDataPayload) =>
      baseAxios.patch(API.instructor(id), dataToSend),
  })
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<InstructorFormValue>({
    resolver: validation.createInstructor,
  })
  const [imageLoading, setImageLoading] = useState(false)
  const { refetch } = useProfile()
  const user = useUser((state) => state.user)
  const setUser = useUser((state) => state.setUser)

  useEffect(() => {
    if (user) {
      setValue('firstName', user?.firstName)
      setValue('lastName', user?.lastName)
      setValue('middleName', user?.middleName)
      setValue('email', user?.email)
      setValue('dob', user?.dob)
      setValue('gender', { value: user?.gender, label: user?.gender })
      setValue('role', { value: user?.roles?.[0], label: user?.roles?.[0] })
      setValue('phoneNumber', user?.phoneNumber)
      setValue('avatar', !!user?.avatarUrl)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  const onSubmit = async (data: InstructorFormValue) => {
    const filteredData = filterObject(data)

    let avatarUrlRes
    if (selectedImg) {
      setImageLoading(true)
      avatarUrlRes = await uploadImage(selectedImg)
    }
    const dataToSend = {
      ...filteredData,
      gender: data.gender?.value,
      dob: new Date(data?.dob).toISOString(),
      ...(avatarUrlRes && { avatarUrl: avatarUrlRes?.url }),
    }

    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          refetch().then((res) => {
            console.log(res.data)
            setUser(res.data?.data)
          })
          toast.success('Successfully updated')
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
    <PageCard title="Personal Information" bodyStyle="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
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
                disabled={!!user?.email}
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
        {!isMasterInstructor(user?.roles) && (
          <Button
            value="Update Settings"
            className="mt-6 py-3 px-4"
            variant="primary"
            loading={isLoading || imageLoading}
            disabled={isLoading || imageLoading}
            type="submit"
          />
        )}
      </form>
    </PageCard>
  )
}

export const AccountSettings = ({ selectedImg = null as File | null }) => {
  const { user } = useUser()

  return user?.user?.roles?.includes('school') ? (
    <AdminUpdate selectedImg={selectedImg} />
  ) : (
    <InstructorUpdate selectedImg={selectedImg} id={user?.id} />
  )
}
