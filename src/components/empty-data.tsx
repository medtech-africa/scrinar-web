import React from 'react'
import { IconPicker } from './ui/icon-picker'
import { Text } from './ui/text'

const EmptyData = () => {
  return (
    <div className="flex justify-center flex-col items-center w-full h-full min-h-[300px]">
      <IconPicker className="text-grey-300" icon="grid7" size="4rem" />
      <Text className="text-grey-400" variant="text/sm">
        No Data Entry
      </Text>
    </div>
  )
}

export default EmptyData
