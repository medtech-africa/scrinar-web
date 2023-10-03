import React, { FC, ReactNode } from 'react'

type Props = {
  children?: ReactNode
}

export const Message: FC<Props> = ({ children }) => (
  <div className="text-[10px]">{children}</div>
)
