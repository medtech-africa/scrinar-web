'use client'

import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import validation from '@/constants/validation'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

interface IFormValue {
  email: string
  password: string
  name: string
}

const MasterLogin = () => {
  const [isVisible, setIsvisible] = useState(false)
  const router = useRouter()

  const {
    isPending: isLoading,
    mutate,
    reset: postReset,
  } = useMutation({
    mutationFn: (dataToSend: IFormValue) =>
      baseAxios.post(API.masterLogin, dataToSend),
  })

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormValue>({
    resolver: validation.createMasterLogin,
  })

  const onSubmit = async (data: IFormValue) => {
    try {
      await mutate(data, {
        onSuccess: () => {
          reset()
          postReset()
          toast.success(
            'Account was created successfully! You can now login with your credentials.'
          )
          router.push('/login')
        },
        onError(error) {
          errorMessage(error)
        },
      })
    } finally {
    }
  }

  const loading = isLoading || isSubmitting

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="grid place-items-center">
        <div className="md:w-[484px] px-4 flex justify-center items-center flex-col ">
          <div className="flex flex-col gap-y-6 items-center">
            <Image src="/logo_large.png" width={120} height={120} alt="logo" />
            <div>
              <Text
                variant="display/xs"
                weight="medium"
                className="flex justify-center"
              >
                Create Trainer Login
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
            <div className="flex flex-col gap-y-4">
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    labelStyle="lg:text-sm text-xs"
                    placeholder="Email"
                    label="Enter Email Address"
                    variant={errors?.email ? 'destructive' : 'default'}
                    message={errors.email && errors.email?.message}
                    autoComplete="email"
                  />
                )}
              />

              <Controller
                control={control}
                name="name"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    labelStyle="lg:text-sm text-xs"
                    placeholder="Name"
                    label="Name"
                    variant={errors?.name ? 'destructive' : 'default'}
                    message={errors.name && errors.name?.message}
                    autoComplete="name"
                  />
                )}
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
                    leadingIcon={<IconPicker icon="password" />}
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
                    full
                    label="Password"
                    type={isVisible ? 'text' : 'password'}
                    variant={errors?.password ? 'destructive' : 'default'}
                    message={errors.password && errors.password?.message}
                  />
                )}
              />
            </div>

            <Button
              className="my-6"
              value="Create"
              variant="primary"
              loading={loading}
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default MasterLogin
