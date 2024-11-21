import React, { useEffect, useState } from 'react'
import { Select } from './ui/select'
import { IconPicker } from './ui/icon-picker'

const sortValues = [
  {
    label: 'Household code',
    value: 'familyCode',
  },

  {
    label: 'Most recent',
    value: 'createdAt',
  },
  {
    label: 'Last updated',
    value: 'updatedAt',
  },
]

type SelectVal = {
  value: string
  label: string
}

const SortBy = ({
  onChange,
  isHealthData = false,
}: {
  onChange: (val: string) => void
  isHealthData?: boolean
}) => {
  const [by, setBy] = useState<SelectVal | null>(null)
  const [isAsc, setIsAsc] = useState(true)

  const newSortValues = isHealthData
    ? sortValues
    : sortValues.concat({
        label: 'Alphabetical',
        value: 'firstName',
      })

  useEffect(() => {
    if (by) {
      onChange(`${isAsc ? '' : '-'}${by.value}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [by, isAsc])

  return (
    <div className="flex items-center gap-4 mt-2 z-[9999] relative">
      <Select
        // label="Sort by"
        full
        labelStyle="lg:text-sm text-xs"
        placeholder="Sort by"
        options={newSortValues}
        onChange={(val) => setBy(val as SelectVal)}
        className="capitalize"
        value={by}
      />

      <span
        onClick={() => setIsAsc((pr) => !pr)}
        className="cursor-pointer p-1"
      >
        <IconPicker
          size={isAsc ? 28 : 20}
          icon={isAsc ? 'sortDesc' : 'sortAsc'}
        />
      </span>
    </div>
  )
}

export default SortBy
