const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://dev-play4health-api.us-east-1.elasticbeanstalk.com'

export const API = {
  //school
  upload: `${BASE_URL}/api/v1/upload`,

  // auth
  login: `${BASE_URL}/api/v1/auth/school/login`,
  getProfile: `${BASE_URL}/api/v1/user`,

  //students
  students: `${BASE_URL}/api/v1/students`,
  student: (id: string) => `${BASE_URL}/api/v1/students/${id}`,
  getStudents: (lastKey?: string) =>
    `${BASE_URL}/api/v1/students${lastKey ? `?lastKey=${lastKey}` : ''}`,

  //instructors
  instructors: `${BASE_URL}/api/v1/instructors`,
  instructor: (id: string) => `${BASE_URL}/api/v1/instructors/${id}`,
  getInstructors: (lastKey?: string) =>
    `${BASE_URL}/api/v1/instructors${lastKey ? `?lastKey=${lastKey}` : ''}`,

  //  health data
  healthData: `${BASE_URL}/api/v1/health-data`,
  singleHealthData: (id: string) => `${BASE_URL}/api/v1/health-data/${id}`,
}
