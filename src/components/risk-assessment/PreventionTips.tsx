import React from 'react'
import { Text } from '../ui/text'
const PreventionTips = () => {
  return (
    <div className="w-full max-w-3xl mx-auto">
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
          <Text>Prevention tips</Text>
        </div>

        <div className="space-y-6">
          {/* Nutrition Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🥗</span>
            </div>
            <Text variant="text/sm">
              Eat heart-healthy foods like fruits, veggies, whole grains, and
              lean proteins while limiting salt, sugar, and saturated fats.
            </Text>
          </div>

          {/* Exercise Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🏃‍♂</span>
            </div>
            <Text variant="text/sm">
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
            <Text variant="text/sm">
              Avoiding tobacco protects blood vessels, lowers blood pressure,
              and improves circulation, reducing heart disease risk.
            </Text>
          </div>

          {/* Checkups Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
              <span>🩺</span>
            </div>
            <Text variant="text/sm">
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
