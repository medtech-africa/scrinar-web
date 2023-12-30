import Providers from '@/context'
import './globals.css'
import 'react-loading-skeleton/dist/skeleton.css'
import type { Metadata } from 'next'
import CustomToaster from '@/components/custom-toaster'

export const metadata: Metadata = {
  title: 'Play4Health Admin',
  description: 'Play4health admin page',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
          <CustomToaster />
        </Providers>
      </body>
    </html>
  )
}
