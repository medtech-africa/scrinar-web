import useProfile from '@/hooks/queries/useProfile'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useUser } from './user'
import { usePathname, useRouter } from 'next/navigation'

// import isJwtExpired from 'constants/isJwtExpired';
// import API from 'constants/api';
// import screens from 'constants/screens';

// export const UserContext = createContext(null);
// export const useUser = () => useContext(UserContext);

export interface WithChildren {
  children: React.ReactNode
}

export const ProtectRoute = ({ children }: WithChildren) => {
  const { user, loading } = useUser()
  const router = useRouter()
  const pathname = usePathname()
  const [cookies] = useCookies(['token'])

  useEffect(() => {
    if (!loading && !user) {
      //
      console.log('protect auth')
      if (!pathname.includes('/login')) {
        router.replace('/login')
      }
    }
  }, [cookies, loading, pathname, router, user])

  return children
}

const UserProvider = ({ children }: WithChildren) => {
  // const [user, setUser] = useState(null);
  const loadUser = useUser((state) => state.loadUser)
  const { isLoading, refetch } = useProfile()

  const [cookies] = useCookies(['token'])

  useEffect(() => {
    // console.log('cookies change', cookies.token);
    if (cookies.token) {
      refetch().then((res) => {
        loadUser(res.data)
      })
    }
  }, [cookies.token, loadUser, refetch])

  if (isLoading) return null

  return <>{children}</>
}

export default UserProvider
