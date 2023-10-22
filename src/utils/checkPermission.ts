/* eslint-disable import/no-unused-modules */
const restrictNonAdmin = (roles: string[]) => {
  if (roles?.includes('school') || roles?.includes('admin')) {
    return true
  }

  return false
}

export default restrictNonAdmin
