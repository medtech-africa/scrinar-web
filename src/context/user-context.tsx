// import useProfile from '@/hooks/queries/useProfile'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useUser } from './user'
import useProfile from '@/hooks/queries/useProfile'

export interface WithChildren {
  children: React.ReactNode
}

const UserProvider = ({ children }: WithChildren) => {
  const { loadUser, setLoading } = useUser()
  const { refetch } = useProfile()

  const [cookies] = useCookies(['token'])

  useEffect(() => {
    if (cookies.token) {
      setLoading(true)
      refetch().then((res) => {
        loadUser(res.data?.data)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cookies.token, loadUser, refetch])

  return <>{children}</>
}

export default UserProvider
