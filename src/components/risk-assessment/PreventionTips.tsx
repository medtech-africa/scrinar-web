import React from 'react'

const getRiskLevel = (score: number) => {
  if (score < 5) return 'low'
  if (score < 10) return 'moderate'
  return 'high'
}
const PreventionTips = ({ score = 1 }) => {
  const level = getRiskLevel(score)
  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Warning Box */}
      <div className="flex items-start gap-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
          <svg
            className="w-6 h-6 text-primary"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.64309 8.06878C6.65449 4.50966 7.66019 2.7301 9.04022 2.27202C9.79943 2.02 10.6172 2.02 11.3764 2.27202C12.7565 2.7301 13.7622 4.50966 15.7736 8.06878C17.785 11.6279 18.7907 13.4075 18.489 14.8575C18.323 15.6552 17.9141 16.3787 17.3209 16.9244C16.2425 17.9163 14.2311 17.9163 10.2083 17.9163C6.18554 17.9163 4.17414 17.9163 3.0958 16.9244C2.50257 16.3787 2.09366 15.6552 1.92769 14.8575C1.626 13.4075 2.63169 11.6279 4.64309 8.06878Z"
              stroke="white"
              stroke-width="1.5"
            />
            <path
              d="M10.2015 13.333H10.209"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M10.2085 10.833L10.2085 7.49967"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <p className="text-lg font-medium">
          A {score}% risk means a {level} chance of stroke in 10 years and a
          strong likelihood of heart disease.
        </p>
      </div>

      {/* Prevention Tips Section */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2 className="text-xl font-bold">Prevention tips</h2>
        </div>

        <div className="space-y-6">
          {/* Nutrition Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-green-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 3.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM13.5 10a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"></path>
                <path
                  fillRule="evenodd"
                  d="M10 2.5c-4.142 0-7.5 3.358-7.5 7.5s3.358 7.5 7.5 7.5 7.5-3.358 7.5-7.5S14.142 2.5 10 2.5zM4.5 10c0-3.033 2.467-5.5 5.5-5.5s5.5 2.467 5.5 5.5-2.467 5.5-5.5 5.5-5.5-2.467-5.5-5.5z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-base">
              Eat heart-healthy foods like fruits, veggies, whole grains, and
              lean proteins while limiting salt, sugar, and saturated fats.
            </p>
          </div>

          {/* Exercise Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.625 2.655A9 9 0 0119 11a1 1 0 11-2 0 7 7 0 00-9.625-6.492 1 1 0 11-.75-1.853zM4.662 4.959A1 1 0 014.75 6.37 6.97 6.97 0 003 11a1 1 0 11-2 0 8.97 8.97 0 012.25-5.953 1 1 0 011.412-.088z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M5 11a5 5 0 1110 0 1 1 0 11-2 0 3 3 0 10-6 0c0 1.677-.345 3.276-.968 4.729a1 1 0 11-1.838-.789A9.964 9.964 0 005 11zm8.921 2.012a1 1 0 01.831 1.145 19.86 19.86 0 01-.545 2.436 1 1 0 11-1.92-.558c.207-.713.371-1.445.49-2.192a1 1 0 011.144-.83z"
                  clipRule="evenodd"
                ></path>
                <path
                  fillRule="evenodd"
                  d="M10 10a1 1 0 011 1c0 2.236-.46 4.368-1.29 6.304a1 1 0 01-1.838-.789A13.952 13.952 0 009 11a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-base">
              Exercise at least 150 minutes weekly with activities like walking
              or cycling. Eat a heart-healthy diet with fruits, veggies, whole
              grains, and lean proteins.
            </p>
          </div>

          {/* Tobacco Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-base">
              Avoiding tobacco protects blood vessels, lowers blood pressure,
              and improves circulation, reducing heart disease risk.
            </p>
          </div>

          {/* Checkups Tip */}
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <p className="text-base">
              Regular checkups detect early CVD signs and help manage risk
              factors like blood pressure and cholesterol.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PreventionTips
