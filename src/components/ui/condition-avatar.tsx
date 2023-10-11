import React from 'react'
import { Avatar } from './avatar'
import { IconPicker } from './icon-picker'

const ConditionAvatar = ({ avatarUrl }: { avatarUrl?: string }) => (
  <>
    {avatarUrl ? (
      <Avatar size="md" src={avatarUrl} />
    ) : (
      <div className="p-4 rounded-full border border-lust-100 border-dashed">
        <IconPicker icon="add" className="text-lust-900" />
      </div>
    )}
  </>
)

export default ConditionAvatar
