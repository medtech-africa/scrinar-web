import React from 'react'

const getRiskLevelLikelihood = (score: number) => {
  if (score < 5) return 'weak'
  if (score < 10) return 'moderate'
  return 'strong'
}
const RiskSummary = ({
  score = 1,
  level = '',
  type,
}: {
  score: number
  level: string
  type: 'cvd' | 'diabetes'
}) => {
  const likelihood = getRiskLevelLikelihood(score)

  const getText = () => {
    if (type === 'cvd') {
      return `A ${score}% risk means a ${level} chance of developing a stroke in 10 years and a ${likelihood} likelihood of heart disease.`
    }
    if (type === 'diabetes') {
      return `A ${score}% risk means a ${level} chance of developing type II diabetes in 10 years and a ${likelihood} likelihood.`
    }
    return ''
  }
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Warning Box */}
      <div className="flex items-start gap-4 mb-6">
        <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 19 18">
            <path
              d="M3.64309 7.06878C5.65449 3.50966 6.66019 1.7301 8.04022 1.27202C8.79943 1.02 9.61724 1.02 10.3764 1.27202C11.7565 1.7301 12.7622 3.50966 14.7736 7.06878C16.785 10.6279 17.7907 12.4075 17.489 13.8575C17.323 14.6552 16.9141 15.3787 16.3209 15.9244C15.2425 16.9163 13.2311 16.9163 9.20833 16.9163C5.18554 16.9163 3.17414 16.9163 2.0958 15.9244C1.50257 15.3787 1.09366 14.6552 0.927686 13.8575C0.625995 12.4075 1.63169 10.6279 3.64309 7.06878Z"
              stroke="white"
              stroke-width="1.5"
            />
            <path
              d="M9.2015 12.333H9.20898"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9.2085 9.83301L9.2085 6.49967"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-sm">{getText()}</p>
      </div>
    </div>
  )
}

export default RiskSummary
