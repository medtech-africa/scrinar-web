/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { IconPicker } from '@/components/ui/icon-picker'
import { Text } from '@/components/ui/text'
import useCertificate from '@/hooks/queries/useCertificate'
import usePdfGenerator from '@/hooks/usePdfGenerator'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useRef } from 'react'
const currentDate = new Date()
const formattedDate = currentDate.toLocaleDateString()
const Certification = () => {
  const searchParams = useSearchParams()
  const userId = searchParams.get('id')
  const generatePdf = usePdfGenerator()
  const html_pdf = useRef<any>(null)
  const { data, isLoading } = useCertificate(userId ?? '')
  const certificate = data?.data

  useEffect(() => {
    const handleGeneratePdf = () => {
      generatePdf(html_pdf, 'Certificate')
    }
    if (html_pdf?.current) {
      handleGeneratePdf()
    }
  }, [isLoading])
  return (
    <div className="w-[50rem] h-full sm:w-screen sm:h-screen flex justify-center items-center bg-white">
      {isLoading ? (
        <IconPicker icon="loader2" size={20} />
      ) : !certificate?.showCertificate ? (
        <div ref={html_pdf} className="p-10 tracking-widest">
          <div className="max-w-4xl p-8 flex flex-col justify-center relative">
            <img
              src="/black_top_border.svg"
              alt="black_top_border"
              width={250}
              height={220}
              className="absolute top-0 left-0 z-10"
            />
            <img
              src="/red_top_border.svg"
              alt="red_top_border"
              width={280}
              height={220}
              className="absolute top-0 self-center z-10"
            />
            <img
              src="/red_right_border.svg"
              alt="red_right_border"
              width={40}
              height={20}
              className="absolute top-0 right-0 z-10"
            />
            <img
              src="/red_left_border.svg"
              alt="red_left_border"
              width={470}
              height={220}
              className="absolute bottom-0 left-0 z-10"
            />
            <img
              src="/black_bottom_border.svg"
              alt="black_border"
              width={250}
              height={220}
              className="absolute bottom-0 right-0 z-10"
            />
            <img
              alt="certificate_background"
              src="/certificate_background.svg"
              className="w-full h-full absolute self-center opacity-10 object-cover"
            />
            <img
              alt="logo"
              src="/logo_large.png"
              width={150}
              height={120}
              className="absolute -top-4 right-14"
            />
            <img
              alt="trophy"
              src="/certificate.svg"
              width={60}
              height={70}
              className="mt-9 self-center "
            />
            <div className="text-center relative z-10 flex flex-col space-y-4 px-[7rem]">
              <Text className="text-sm font-light">
                This certificate is being awarded to
              </Text>
              <Text className="text-3xl font-extrabold uppercase text-[#606060] mb-3">
                {certificate?.user?.name}
              </Text>
              <Text className="font-light text-sm">
                for successfully completing our{' '}
                <span className="text-[#0E0E2C] font-semibold text-sm">
                  Nutrition, Cardiovascular and Physical
                </span>{' '}
                <span className="text-[#0E0E2C] font-bold text-sm">
                  Health Training Modules
                </span>{' '}
                and for being a key participant in the{' '}
                <span className="text-[#0E0E2C] font-bold text-sm">
                  Forcardio{' '}
                </span>{' '}
                <span className="text-[#E31B23] font-bold text-sm">
                  Play4health project 2024.
                </span>
              </Text>
            </div>
            <div className="mt-6 text-center grid grid-cols-2 items-baseline">
              <div className="flex flex-col gap-y-1 items-center">
                <Text className="text-[#0E0E2C] text-sm font-semibold">
                  Program & Date of Completion
                </Text>
                <Text className="font-normal text-[#0E0E2C] text-sm">
                  Forcardio Play4Health
                </Text>
                <Text className="font-normal text-[#0E0E2C] text-sm">
                  {formattedDate}
                </Text>
              </div>
              <div className="flex flex-col items-center gap-y-1 relative">
                <img
                  src="/signature.svg"
                  alt="signature"
                  width={100}
                  height={40}
                  className="absolute -top-3"
                />
                <div className="border border-b-black w-32 mt-9" />
                <span>
                  <Text className="text-[#0E0E2C] text-sm font-semibold">
                    Nelson Igbiriki
                  </Text>
                  <Text className="font-normal text-[#0E0E2C] text-sm">
                    CEO & Co-founder
                  </Text>
                </span>
              </div>
            </div>
            <div className="border border-b-black w-full mt-7 mb-3" />
            <div className="flex flex-row justify-start items-center space-x-2 px-8">
              <img alt="logo" src="/sponsors.svg" className="w-full" />
            </div>
          </div>
        </div>
      ) : (
        <Text className="flex justify-center items-center">No Certificate</Text>
      )}
    </div>
  )
}

export default Certification
