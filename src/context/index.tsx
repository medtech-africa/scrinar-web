'use client'
import React, { useState } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AuthProvider from './auth-context'
import UserProvider from './user-context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
// const queryClient = new QueryClient()

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </UserProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default Providers
