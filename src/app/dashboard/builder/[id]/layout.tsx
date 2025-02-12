'use client'

import { ReactNode } from 'react'

import { DesignerContextProvider } from '../../../../features/form-builder/context/DesignerContext'

const BuilderPageLayout = ({ children }: { children: ReactNode }) => {
  return <DesignerContextProvider>{children}</DesignerContextProvider>
}

export default BuilderPageLayout
