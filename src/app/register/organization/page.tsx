'use client'

import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { Controller, useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import baseAxios from '@/utils/baseAxios'
import { API } from '@/utils/api'
import toast from 'react-hot-toast'
import { errorMessage } from '@/utils/errorMessage'
import Image from 'next/image'
import validation from '@/constants/validation'
import useStateLGA from '@/hooks/queries/useStateLGA'

interface IFormOrgData {
  name: string
  website?: string
  email: string
  password: string
  state: { value: string; label: string }
  lga: { value: string; label: string }
  address: string
  zipCode: string
  type: { value: string; label: string }
}

const defaultValues = {
  name: '',
  website: '',
  email: '',
  password: '',
  state: { value: '', label: '' },
  lga: { value: '', label: '' },
  address: '',
  zipCode: '',
  type: { value: '', label: '' },
}

const RegisterNewOrganization = () => {
  const queryClient = useQueryClient()

  const { isPending: stateLoading, data: states } = useStateLGA()
  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: any) =>
      baseAxios.post(API.organizationRegister, dataToSend),
  })

  const {
    control,
    reset,
    handleSubmit,
    resetField,
    getValues,
    formState: { errors },
  } = useForm<IFormOrgData>({
    resolver: validation.organizationValidation,
    defaultValues,
  })

  const stateOptions = states?.map((state) => ({
    value: state.slug,
    label: state.name,
  }))
  const lgaOPtions = states
    ?.find((state) => state.name === getValues('state.label'))
    ?.locals.map((local) => ({ value: local.id, label: local.name }))

  const onSubmit = async (data: IFormOrgData) => {
    const dataToSend = {
      ...data,
      state: data.state.value,
      lga: data.lga.value,
      type: data.type.value,
    }

    try {
      await mutate(dataToSend, {
        onSuccess: () => {
          toast.success('Successfully registered organization')
          reset(defaultValues)
          postReset()
          queryClient.invalidateQueries({ queryKey: ['organizations'] })
        },
        onError: (err) => {
          errorMessage(err)
        },
      })
    } catch (error) {
      console.error('Registration error:', error)
    }
  }

  return (
    <div className="grid lg:grid-cols-2 grid-rows-1 lg:h-screen">
      <div className="hidden lg:block relative w-full h-full">
        <Image src="/login_image.png" alt="login" fill={true} />
        <div className="bg-gradient-to-t from-black  opacity-[150.49%] absolute w-full h-full top-0 left-0"></div>
      </div>
      <div className="md:w-[594px] mx-auto px-4 flex justify-center items-center flex-col mt-4">
        <div className="flex flex-col gap-y-6 items-center">
          <Image src="/logo_large.png" width={120} height={120} alt="logo" />
          <div>
            <Text
              variant="display/xs"
              weight="medium"
              className="flex justify-center"
            >
              Welcome to Scrinar
            </Text>
            <Text variant="text/sm" className="text-grey-600 text-center">
              Register Organization
            </Text>
          </div>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="border border-grey-100 bg-white p-8 w-full mt-6 flex flex-col rounded-md"
        >
          <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Organization Name"
                  label="Name *"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.name ? 'destructive' : 'default'}
                  message={errors.name?.message}
                />
              )}
              name="name"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="https://www.example.com"
                  label="Website"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.website ? 'destructive' : 'default'}
                  message={errors.website?.message}
                />
              )}
              name="website"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="info@organization.com"
                  label="Email *"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.email ? 'destructive' : 'default'}
                  type="email"
                  message={errors.email?.message}
                />
              )}
              name="email"
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
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="Enter Address"
                  label="Address *"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.address ? 'destructive' : 'default'}
                  message={errors.address?.message}
                />
              )}
              name="address"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="ZIP Code"
                  label="ZIP Code"
                  labelStyle="lg:text-sm text-xs"
                  variant={errors?.zipCode ? 'destructive' : 'default'}
                  message={errors.zipCode?.message}
                />
              )}
              name="zipCode"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Select
                  placeholder="Select Organization Type"
                  label="Organization Type *"
                  labelStyle="lg:text-sm text-xs"
                  onBlur={onBlur}
                  value={value}
                  onChange={onChange}
                  options={[
                    { value: 'ngo', label: 'NGO' },
                    { value: 'school', label: 'School' },
                    { value: 'company', label: 'Company' },
                  ]}
                  variant={errors?.type ? 'destructive' : 'default'}
                  message={errors.type?.message}
                />
              )}
              name="type"
            />

            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  onChange={onChange}
                  onBlur={onBlur}
                  value={value}
                  placeholder="••••••••••••"
                  label="Password *"
                  labelStyle="lg:text-sm text-xs"
                  type="password"
                  variant={errors?.password ? 'destructive' : 'default'}
                  message={errors.password?.message}
                />
              )}
              name="password"
            />
          </div>

          <Button
            variant="primary"
            value="Register Organization"
            type="submit"
            leadingIcon={<IconPicker icon="saveAdd" />}
            className="mt-6"
            disabled={isLoading}
            loading={isLoading}
          >
            Register Organization
          </Button>
        </form>
      </div>
    </div>
  )
}

export default RegisterNewOrganization
