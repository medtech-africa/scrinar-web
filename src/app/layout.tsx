import Providers from '@/context'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { Metadata } from 'next'
import CustomToaster from '@/components/custom-toaster'
import localFont from 'next/font/local'

export const metadata: Metadata = {
  title: 'Play4Health Admin',
  description: 'Play4health admin page',
}

const aeonikFont = localFont({
  src: [
    {
      path: '../fonts/Aeonik-Regular.otf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Medium.otf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Bold.otf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Aeonik-Black.otf',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-aeonik',
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${aeonikFont.variable} font-sans`}>
      <body className="">
        <Providers>
          {children}
          <CustomToaster />
        </Providers>
      </body>
    </html>
  )
}
