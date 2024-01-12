// import useProfile from '@/hooks/queries/useProfile'
import React, { useEffect } from 'react'
import { useUser } from './user'
import useProfile from '@/hooks/queries/useProfile'
import { getCookie } from 'cookies-next'

export interface WithChildren {
  children: React.ReactNode
}

const UserProvider = ({ children }: WithChildren) => {
  const { loadUser, setLoading } = useUser()
  const { refetch } = useProfile()

  const token = getCookie('token')

  useEffect(() => {
    if (token) {
      setLoading(true)
      refetch().then((res) => {
        loadUser(res.data?.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, loadUser, refetch])

  return <>{children}</>
}

export default UserProvider
