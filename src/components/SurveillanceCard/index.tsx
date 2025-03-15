import React from 'react'
import { Text } from '../ui/text'
import { Select } from '../ui/select'

interface Option {
  value: string
  label: string
}

interface SurveillanceCardProps {
  title: string
  subtitle: string
  children: React.ReactNode
  onChange: (value: any) => void
  options: Option[]
  value: string
}

const SurveillanceCard: React.FC<SurveillanceCardProps> = ({
  title,
  subtitle,
  children,
  onChange,
  options,
  value,
}) => {
  const handleChange = (selectedOption: any) => {
    onChange(selectedOption.value)
  }

  return (
    <div className="border border-secBorder rounded-2xl p-4">
      <div className="flex justify-between">
        <div className="pb-9">
          <Text variant="display/xs">{title}</Text>
          <Text variant="text/sm" className="text-grey-20">
            {subtitle}
          </Text>
        </div>
        <Select
          onChange={handleChange}
          options={options}
          value={options.find((option) => option.value === value)}
          className="z-20"
        />
      </div>
      {children}
    </div>
  )
}

export default React.memo(SurveillanceCard)
