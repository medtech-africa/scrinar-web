const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://dev-play4health-api.us-east-1.elasticbeanstalk.com'

export const API = {
  //school
  upload: `${BASE_URL}/api/v1/upload`,

  // auth
  login: `${BASE_URL}/api/v1/auth/school/login`,
  updatePassword: `${BASE_URL}/api/v1/auth/update-password`,
  getProfile: `${BASE_URL}/api/v1/auth/me`,

  //students
  students: `${BASE_URL}/api/v1/students`,
  student: (id: string) => `${BASE_URL}/api/v1/students/${id}`,
  getStudents: (page?: number, level?: string) =>
    `${BASE_URL}/api/v1/students${page ? `?page=${page}` : ''}${
      level ? `${page ? '&' : '?'}level=${level}` : ''
    }`,

  //instructors
  instructors: `${BASE_URL}/api/v1/instructors`,
  instructor: (id: string) => `${BASE_URL}/api/v1/instructors/${id}`,
  getInstructors: (lastKey?: string) =>
    `${BASE_URL}/api/v1/instructors${lastKey ? `?lastKey=${lastKey}` : ''}`,

  //  health data
  healthData: `${BASE_URL}/api/v1/health-data`,
  singleHealthData: (id: string) => `${BASE_URL}/api/v1/health-data/${id}`,

  //  school
  schoolRegister: `${BASE_URL}/api/v1/school`,
  schoolUpdate: `${BASE_URL}/api/v1/school/me`,

  // misc
  getState: `${BASE_URL}/api/v1/misc/states-with-lga`,
}
