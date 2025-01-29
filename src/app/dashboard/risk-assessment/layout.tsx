import Head from 'next/head'
import React, { ReactNode } from 'react'
import 'react-form-builder2/dist/app.css'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Head>
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
      </Head>
      {children}
    </div>
  )
}

export default Layout
