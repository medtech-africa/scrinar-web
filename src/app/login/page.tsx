'use client'
import { Button } from '@/components/ui/button'
import { IconPicker } from '@/components/ui/icon-picker'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import Image from 'next/image'
import React from 'react'

const Login = () => {
  //   const [isVisible, setIsvisible] = useState(false)
  return (
    <div className="grid md:grid-cols-2 grid-rows-1  h-screen">
      <div className="hidden md:block relative w-full h-full">
        <Image src="/login_image.png" alt="login" fill={true} />
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
              <Text variant="text/sm" className="text-grey-600 text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </Text>
            </div>
          </div>
          <form
            onSubmit={(e) => e.preventDefault}
            className="border border-grey-100 bg-white p-8 w-full mt-6 flex flex-col rounded-md"
          >
            <div className="flex flex-col gap-y-4">
              <Input
                label="Email Address"
                placeholder="e.g dammy@play4health.com"
                leadingIcon={<IconPicker icon="mail" />}
                full
              />
              <Input
                label="Password"
                placeholder="Enter Your Password"
                leadingIcon={<IconPicker icon="password" />}
                full
              />
            </div>
            <Text
              variant="text/sm"
              className="py-6 underline text-grey-600 text-center"
            >
              Forgot Password?
            </Text>
            <Button value="Login" variant="primary" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
