import { Metadata } from 'next'
import React from 'react'
export const metadata: Metadata = {
  title: 'Register Your Child',
  description:
    'Fill the form to register your student for the play4health initiative',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Register Your Child',
  },
}
const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => {
  return <div>{children}</div>
}

export default layout
