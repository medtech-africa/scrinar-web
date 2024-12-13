'use client'
import React from 'react'
import { RiskAssessmentForm } from './RiskAssessmentForm'

const RiskAssessment = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-2">
        <h1 className="text-2xl font-medium">Risk Assessment (WIP)</h1>
        <p>
          Non communicable Diseases (NCDs) are chronic conditions that are not
          transmitted from person to person, such as diabetes, cardiovascular
          disease, cancer, and chronic respiratory diseases.
        </p>
        <p>
          This screening page is designed for use in pharmacies and hospitals to
          assess a patient’s risk of developing NCDs over a 2 year period, using
          vital signs, family history, personal lifestyle and screening
          responses to provide a comprehensive risk assessment.
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
