import React from 'react'
import { Text } from '../ui/text'

const getRiskLevelLikelihood = (score: number) => {
  if (score < 5) return 'weak'
  if (score < 10) return 'moderate'
  return 'strong'
}
const PreventionTips = ({ score = 1, level = '' }) => {
  const likelihood = getRiskLevelLikelihood(score)
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
        <p className="text-sm">
          A {score}% risk means a {level} chance of stroke in 10 years and a{' '}
          {likelihood} likelihood of heart disease.
        </p>
      </div>

      {/* Prevention Tips Section */}
      <div className="">
        <div className="flex items-center gap-2 mb-6">
          <div className="flex-shrink-0  w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M16.6668 10.8335C16.6668 15.0002 13.7502 17.0835 10.2835 18.2919C10.102 18.3534 9.90478 18.3505 9.72516 18.2835C6.25016 17.0835 3.3335 15.0002 3.3335 10.8335V5.00021C3.3335 4.7792 3.42129 4.56724 3.57757 4.41096C3.73385 4.25468 3.94582 4.16688 4.16683 4.16688C5.8335 4.16688 7.91683 3.16688 9.36683 1.90021C9.54337 1.74938 9.76796 1.6665 10.0002 1.6665C10.2324 1.6665 10.457 1.74938 10.6335 1.90021C12.0918 3.17521 14.1668 4.16688 15.8335 4.16688C16.0545 4.16688 16.2665 4.25468 16.4228 4.41096C16.579 4.56724 16.6668 4.7792 16.6668 5.00021V10.8335Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.5 10H12.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M10 7.5V12.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <Text variant="text/sm">Prevention tips</Text>
        </div>

        <div className="space-y-6">
          {/* Nutrition Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🥗</span>
            </div>
            <Text variant="text/xs">
              Eat heart-healthy foods like fruits, veggies, whole grains, and
              lean proteins while limiting salt, sugar, and saturated fats.
            </Text>
          </div>

          {/* Exercise Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🏃‍♂</span>
            </div>
            <Text variant="text/xs">
              Exercise at least 150 minutes weekly with activities like walking
              or cycling. Eat a heart-healthy diet with fruits, veggies, whole
              grains, and lean proteins.
            </Text>
          </div>

          {/* Tobacco Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🚬</span>
            </div>
            <Text variant="text/xs">
              Avoiding tobacco protects blood vessels, lowers blood pressure,
              and improves circulation, reducing heart disease risk.
            </Text>
          </div>

          {/* Checkups Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🩺</span>
            </div>
            <Text variant="text/xs">
              Regular checkups detect early CVD signs and help manage risk
              factors like blood pressure and cholesterol.
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreventionTips
