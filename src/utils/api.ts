const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://dev-play4health-api.onrender.com'

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
  highRisk: `${BASE_URL}/api/v1/health-data/high-risk`,

  //screening
  getScreenings: (page?: number) =>
    `${BASE_URL}/api/v1/schedules${page ? `?page=${page}` : ''}`,
  screening: (id: string) => `${BASE_URL}/api/v1/schedules/${id}`,
  schedules: `${BASE_URL}/api/v1/schedules`,
  getAssessmentType: `${BASE_URL}/api/v1/schedules/assessment-type`,
  getAssessmentStatus: `${BASE_URL}/api/v1/schedules/assessment-status`,

  //  school
  schoolRegister: `${BASE_URL}/api/v1/school`,
  schoolUpdate: `${BASE_URL}/api/v1/school/me`,
  schoolDashboard: `${BASE_URL}/api/v1/school/dashboard`,

  // misc
  getState: `${BASE_URL}/api/v1/misc/states-with-lga`,
}
