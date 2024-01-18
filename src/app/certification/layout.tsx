import React, { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({
  subsets: ['latin-ext'],
  display: 'auto',
  style: 'normal',
})
const CertificateLayout = ({ children }: { children: ReactNode }) => {
  return <main className={montserrat.className}>{children}</main>
}

export default CertificateLayout
