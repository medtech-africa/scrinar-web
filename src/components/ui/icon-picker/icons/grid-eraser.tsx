import { FunctionComponent } from 'react'
import { IconPickerProp } from '../icons.models'
import { cn } from '@/lib/utils'

export const GridEraserIcon: FunctionComponent<IconPickerProp> = ({
  size = '1rem',
  className,
  ...rest
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      className={cn(`text-currentColor`, className)}
      style={{ width: size, height: size, ...rest.style }}
      {...rest}
      fill="none"
    >
      <path
        d="M58.6668 29.333V23.9997C58.6668 10.6663 53.3335 5.33301 40.0002 5.33301H24.0002C10.6668 5.33301 5.3335 10.6663 5.3335 23.9997V39.9997C5.3335 53.333 10.6668 58.6663 24.0002 58.6663H26.6668"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <g opacity="0.4">
        <path
          d="M5.41162 22.667H58.665"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M5.41162 41.333H31.9983"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.6929 58.6393V5.35938"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M41.3594 31.9727V5.35938"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <path
        d="M50.1335 52.5332L45.0669 57.5999C43.6802 58.9866 41.3868 58.9866 39.9735 57.5999L35.7602 53.36C34.3735 51.9734 34.3735 49.6799 35.7602 48.2666L40.8269 43.2266L50.1335 52.5332Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M57.626 45.067L50.1327 52.5602L40.7993 43.2268L48.2926 35.707C49.6793 34.3203 51.9993 34.3203 53.386 35.707L57.5994 39.9469C59.0127 41.3602 59.0126 43.6804 57.626 45.067Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
