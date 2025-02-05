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
      <head>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
          integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />
      </head>
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
