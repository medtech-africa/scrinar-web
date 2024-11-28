'use client'
import React from 'react'
import { RiskAssessmentForm } from './RiskAssessmentForm'

const RiskAssessment = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Risk Assessment (WIP)</h1>
        <p className="">
          This non-communicable disease (NCD) screening page is designed for use
          in pharmacies or hospitals to assess a patient&apos;s risk of
          developing NCDs over a two-year period. The page captures the
          patient&apos;s vital signs, personal details, family history, and
          screening responses to provide a comprehensive risk assessment
        </p>
      </div>
      <div className="">
        <div className="grid">
          <RiskAssessmentForm />
        </div>
      </div>
    </div>
  )
}

export default RiskAssessment
