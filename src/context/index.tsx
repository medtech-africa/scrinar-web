'use client'
import React, { useState } from 'react'
import {
  QueryClient,
  // QueryClientProvider
} from '@tanstack/react-query'
import AuthProvider from './auth-context'
import UserProvider from './user-context'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createIDBPersister } from '@/store/createIDBPersister'

// Create a client
// const queryClient = new QueryClient()

const persister = createIDBPersister()

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 60 * 24, // 24 hours
          },
        },
      })
  )
  return (
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{ persister, maxAge: 1000 * 60 * 60 * 24 }}
    >
      <AuthProvider>
        <UserProvider>
          <ReactQueryDevtools initialIsOpen={false} />
          {children}
        </UserProvider>
      </AuthProvider>
    </PersistQueryClientProvider>
  )
}

export default Providers
