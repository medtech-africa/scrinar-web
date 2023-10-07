const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://dev-play4health-api.us-east-1.elasticbeanstalk.com'

export const API = {
  // auth
  login: `${BASE_URL}/api/v1/auth/school/login`,
  getProfile: `${BASE_URL}/api/v1/user`,

  //students
  students: `${BASE_URL}/api/v1/students`,
  student: (id: string) => `${BASE_URL}/api/v1/students/${id}`,
  getStudents: (currentPage = 0) =>
    `${BASE_URL}/api/v1/students${currentPage ? `?page=${currentPage}` : ''}`,

  //instructors
  instructors: `${BASE_URL}/api/v1/instructors`,
  instructor: (id: string) => `${BASE_URL}/api/v1/instructors/${id}`,
  getInstructors: (lastKey?: any) =>
    `${BASE_URL}/api/v1/instructors${lastKey ? `?lastKey=${lastKey}` : ''}`,
  // // staff
  // staff: (currentPage = 1, limit = 10) =>
  //   `${BASE_URL}/api/v1/hospitals/staff?limit=${limit}${
  //     currentPage ? `&page=${currentPage}` : ''
  //   }`,
}
