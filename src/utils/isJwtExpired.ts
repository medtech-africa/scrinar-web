import jwtDecode from 'jwt-decode'

const isJwtExpired = (token: string) => {
  if (typeof token !== 'string' || !token) {
    return true
  }

  let expired = false
  try {
    const { exp, nbf } = jwtDecode<{ exp: number; nbf: number }>(token)
    const currentTime = Date.now().valueOf() / 1000

    if (currentTime > exp) expired = true
    if (typeof exp !== 'undefined' && exp < currentTime) {
      expired = true
    }
    if (typeof nbf !== 'undefined' && nbf > currentTime) {
      expired = true
    }
  } catch {
    return true
  }

  return expired
}

export default isJwtExpired
