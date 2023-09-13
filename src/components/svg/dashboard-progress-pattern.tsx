import React, { SVGProps } from 'react'

const DashboardProgressPattern = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      // viewBox="0 0 400 400"
      fill="none"
      {...props}
    >
      <path
        d="M0 1H237M0 26.2227H237M0 51.4454H237M0 76.6681H237M0 101.891H237M0 127.114H237M0 152.336H237M0.620419 153L0.620411 1.66376M24.1963 153L24.1963 1.66376M47.7723 153L47.7723 1.66376M71.3482 153L71.3482 1.66376M94.9241 153L94.9241 1.66376M118.5 153L118.5 1.66376M142.076 153V1.66376M165.652 153L165.652 1.66376M189.228 153L189.228 1.66376M212.804 153L212.804 1.66376M236.38 153L236.38 1.66376"
        stroke="url(#paint0_radial_352_27548)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_352_27548"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(118.5 77) rotate(90) scale(76 118.5)"
        >
          <stop stopColor="#E31B23" stopOpacity="0.25" />
          <stop offset="1" stopColor="#E31B23" stopOpacity="0" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default DashboardProgressPattern
