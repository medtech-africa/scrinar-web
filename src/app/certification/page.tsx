/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client'
import { Text } from '@/components/ui/text'
import usePdfGenerator from '@/hooks/usePdfGenerator'
import React, { useEffect, useRef } from 'react'

const Certification = () => {
  const certificateData = {
    recipientName: 'John Doe',
    courseName: 'React Certificate Course',
    date: 'January 1, 2023',
  }
  const generatePdf = usePdfGenerator()
  const html_pdf = useRef<any>(null)

  useEffect(() => {
    const handleGeneratePdf = () => {
      generatePdf(html_pdf, 'Certificate')
    }
    handleGeneratePdf()
  }, [])
  return (
    <div className=" w-screen h-screen flex justify-center items-center bg-white">
      <div ref={html_pdf} className="p-10 tracking-widest">
        <div className="max-w-2xl mx-auto border-2 border-green-200 p-8 flex flex-col justify-center relative">
          <div className="absolute -top-[70px] -right-5">
            <img
              alt="logo"
              src="/logo_large.png"
              width={150}
              height={120}
              className="mt-9 p-5 bg-white bg-opacity-90"
            />
          </div>
          <img
            alt="logo"
            src="/certificate.png"
            width={60}
            height={70}
            className="mt-9 self-center "
          />
          <div className="text-center relative z-10">
            <Text className="text-base font-extrabold text-green-800">
              This certificate is awarded to
            </Text>
            <Text className="text-2xl font-extralight text-green-800">
              {certificateData?.recipientName}
            </Text>
            <Text>for successful completion of </Text>
            <Text className="text-xl text-green-600 font-light">
              {certificateData?.courseName}
            </Text>
            <Text variant="text/sm">
              the online acceleration program developed by Medtech Africa -
              supported by Novartis Foundation and Norrsken Foundation.
            </Text>
            <Text className="mt-4" variant="text/sm">
              Our methodology has provided the recipient with innovation-based
              entrepreneurship training, business mentorship, and the tools
              necessary to develop the venture.
            </Text>
          </div>
          <div className="mt-6 text-center grid grid-cols-3">
            <div>
              <Text
                className="text-blue-900 text-sm font-semibold
          "
              >
                Program & Date of Completion
              </Text>
              <Text className="mt-9 font-extralight text-sm">
                Medtech Africa Programme
              </Text>
              <Text className="font-extralight text-sm">
                {certificateData?.date}
              </Text>
            </div>
            <div className="flex flex-col items-center">
              <Text className="text-blue-900 text-sm font-semibold">
                Program created with
              </Text>

              <img
                alt="logo"
                src="/logo_large.png"
                width={90}
                height={90}
                className="mt-9"
              />
            </div>
            <div className="flex flex-col items-center">
              <Text className="text-blue-900 text-sm font-semibold">
                Nelson Igbiriki
              </Text>
              <Text className="text-blue-900 text-sm font-semibold">
                CEO & Co-founder
              </Text>
              <div className="border border-b-black w-32 mt-9" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Certification
