'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import validation from '@/constants/validation'
import { useAuth } from '@/context/auth'
import { API } from '@/utils/api'
import baseAxios from '@/utils/baseAxios'
import { errorMessage } from '@/utils/errorMessage'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
interface IFormValue {
  loginId?: string
  password: string
}
interface IDataToSend {
  loginId?: string
  password: string
}
const Login = () => {
  const [isVisible, setIsvisible] = useState(false)
  const [authLoading, setAuthLoading] = useState(false)
  const { authenticate, isAuth } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isAuth) router.replace('/dashboard')
  }, [isAuth, router])

  const {
    isLoading,
    mutate,
    reset: postReset,
  } = useMutation((dataToSend: IDataToSend) =>
    baseAxios.post(API.login, dataToSend)
  )
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValue>({
    resolver: validation.login,
  })

  const onSubmit = async (data: IFormValue) => {
    const dataToSend = {
      loginId: data?.loginId,
      password: data?.password,
    }
    setAuthLoading(true)
    try {
      await mutate(dataToSend, {
        onSuccess: async (response) => {
          const responseData = response.data
          const accessToken = responseData?.access_token
          if (accessToken) {
            await authenticate(accessToken)
          }
          reset()
          postReset()
          router.push('/dashboard')
        },
        onError(error) {
          errorMessage(error)
        },
      })
    } finally {
      setAuthLoading(false)
    }
  }
  return (
    <div className="grid md:grid-cols-2 grid-rows-1  h-screen">
      <div className="hidden md:block relative w-full h-full">
        <Image
          src="/login_image.png"
          alt="login"
          fill={true}
          className="object-cover"
        />
        <div className="bg-gradient-to-t from-black  opacity-[150.49%] absolute w-full h-full top-0 left-0"></div>
      </div>
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
                Welcome Back
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
            <div className="flex justify-end">
              {/* <Text
                variant={'text/md'}
                weight={'medium'}
                onClick={() => setUseEmail(!useEmail)}
                className="text-right text-lust-800 underline cursor-pointer"
              >
                {useEmail ? 'use your mobile number' : 'use your email'}
              </Text> */}
            </div>
            <div className="flex flex-col gap-y-4">
              {/* {useEmail ? (
                <Controller
                  control={control}
                  name="email"
                  key="email"
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input
                      onChange={(e) => {
                        if (errors.phoneNumber) {
                          setValue('phoneNumber', '')
                        }
                        onChange(e.target.value)
                      }}
                      onBlur={onBlur}
                      value={value ?? ''}
                      label="Email Address"
                      placeholder="e.g dammy@play4health.com"
                      leadingIcon={<IconPicker icon="mail" />}
                      full
                      variant={errors?.email ? 'destructive' : 'default'}
                      message={errors.email && errors.email?.message}
                    />
                  )}
                />
              ) : ( */}
              <Controller
                control={control}
                name="loginId"
                key="loginId"
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input
                    onChange={onChange}
                    onBlur={onBlur}
                    value={value ?? ''}
                    labelStyle="lg:text-sm text-xs"
                    placeholder="Email or mobile number"
                    label="Enter Email Address or Mobile Number"
                    variant={errors?.loginId ? 'destructive' : 'default'}
                    message={errors.loginId && errors.loginId?.message}
                  />
                )}
              />
              {/* )} */}

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
                    message={'By default, the first name is user’s Password'}
                  />
                )}
              />
            </div>
            <Text
              variant="text/sm"
              className="py-6 underline text-grey-600 text-center"
            >
              Forgot Password?
            </Text>
            <Button
              value="Login"
              variant="primary"
              loading={isLoading || authLoading}
              disabled={isLoading || authLoading}
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
