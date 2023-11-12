import { useUser } from '@/context/user'
import { useEffect } from 'react'

const useSchoolChangeRefresh = (refetch: () => void) => {
  const { selectedSchool } = useUser()

  useEffect(() => {
    if (selectedSchool) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSchool])
}

export default useSchoolChangeRefresh
