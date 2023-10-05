const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  'http://dev-play4health-api.us-east-1.elasticbeanstalk.com'

export const API = {
  // auth
  login: `${BASE_URL}/api/v1/hospitals/auth/login`,
  getProfile: `${BASE_URL}/api/v1/hospitals/profile`,

  //students
  students: `${BASE_URL}/api/v1/students`,
  student: (id: string) => `${BASE_URL}/api/v1/students/${id}`,
  getStudents: (currentPage = 0) =>
    `${BASE_URL}/api/v1/students${currentPage ? `?page=${currentPage}` : ''}`,

  //instructors
  instructors: `${BASE_URL}/api/v1/instructors`,
  instructor: (id: string) => `${BASE_URL}/api/v1/instructors/${id}`,
  getInstructors: (currentPage = 0, limit = 4) =>
    `${BASE_URL}/api/v1/instructors${
      currentPage ? `?page=${currentPage}` : ''
    }?limit=${limit}`,
  // // staff
  // staff: (currentPage = 1, limit = 10) =>
  //   `${BASE_URL}/api/v1/hospitals/staff?limit=${limit}${
  //     currentPage ? `&page=${currentPage}` : ''
  //   }`,
}
