import useWindowSize from '@/hooks/useWindowSize'
import React from 'react'
import { ResizableBox } from '../resizableBox'

export const FullWidthResizableBox = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { width = 500 } = useWindowSize()
  console.log('🚀 ~ width:', width)
  return <ResizableBox width={width * 0.6}>{children}</ResizableBox>
}
