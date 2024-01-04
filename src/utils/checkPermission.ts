/* eslint-disable import/no-unused-modules */
const restrictNonAdmin = (roles: string[] = []) => {
  if (
    roles?.includes('school') ||
    roles?.includes('admin') ||
    roles?.includes('play4health_admin')
  ) {
    return true
  }

  return false
}

export default restrictNonAdmin

export const isMasterInstructor = (roles: string[] = []) =>
  roles?.includes('play4health_admin')
export const isTrainer = (roles: string[] = []) =>
  roles?.includes('trainer')
