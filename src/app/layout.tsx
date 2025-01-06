import Providers from '@/context'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { Metadata, Viewport } from 'next'
import CustomToaster from '@/components/custom-toaster'
import localFont from 'next/font/local'
import NextTopLoader from 'nextjs-toploader'
import colors from '@/constants/colors'

export const metadata: Metadata = {
  title: 'Scrinar',
  description: 'Scrinar admin page',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Scrinar Admin',
  },
}

export const viewport: Viewport = {
  themeColor: '#E31B23',
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
        <NextTopLoader color={colors.lust[500]} showSpinner={false} />

        <Providers>
          {children}
          <CustomToaster />
        </Providers>
      </body>
    </html>
  )
}
