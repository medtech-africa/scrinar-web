import React from 'react'
import { IconPicker } from './icon-picker'
import DashboardProgressPattern from '../svg/dashboard-progress-pattern'
import { Text } from './text'
import { Button } from './button'
type IProps = {
  onClose: (close: boolean) => void
  action?: () => void
}
const Delete = ({ onClose, action }: IProps) => {
  return (
    <div className="fixed top-0 left-0 flex justify-center items-center w-screen h-screen z-50">
      <div className="bg-grey-50 p-6 rounded-2xl border-[2px] border-gray-50 relative">
        <div className="flex flex-col space-y-6 justify-center items-center">
          <div className="justify-center items-center flex relative pl-[43.5px] pt-[17px] pr-[51.5px] pb-[23px]">
            <DashboardProgressPattern className="absolute right-0 left-0 hidden md:block" />
            <div className="text-lust-900 bg-lust-50 p-4 rounded-lg z-20">
              <IconPicker icon="trash" size={35} />
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <Text variant="text/lg" weight="medium">
              Are you sure you want to delete?
            </Text>
            <Text variant="text/sm" className="text-grey-600">
              Note that deleted data cannot be recovered.
            </Text>
          </div>
          <div className="space-x-4">
            <Button
              value="Cancel"
              variant="tertiary"
              onClick={() => onClose(false)}
              leadingIcon={<IconPicker icon="closeSquare" />}
            />
            <Button
              value="Delete"
              variant="primary"
              onClick={action}
              leadingIcon={<IconPicker icon="trash" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Delete
