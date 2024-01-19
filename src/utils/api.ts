const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'https://dev-play4health-api.onrender.com'

export const API = {
  //school
  upload: `${BASE_URL}/api/v1/upload`,

  // auth
  login: `${BASE_URL}/api/v1/auth/school/login`,
  masterLogin: `${BASE_URL}/api/v1/auth/admin/master?type=trainer`,
  updatePassword: `${BASE_URL}/api/v1/auth/update-password`,
  getProfile: `${BASE_URL}/api/v1/auth/me`,
  // master instructor
  attachToSchool: (schoolId: string) =>
    `${BASE_URL}/api/v1/auth/attach-to-school?school=${schoolId}`,
  //students
  students: `${BASE_URL}/api/v1/students`,
  student: (id: string) => `${BASE_URL}/api/v1/students/${id}`,
  getStudents: (page?: number, level?: string, searchVal?: string) =>
    `${BASE_URL}/api/v1/students${page ? `?page=${page}` : ''}${
      level ? `${page ? '&' : '?'}level=${level}` : ''
    }${searchVal ? `&search=${searchVal}` : ''}`,

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
  getSchools: (search: string) => `${BASE_URL}/api/v1/school?search=${search}`,

  // misc
  getState: `${BASE_URL}/api/v1/misc/states-with-lga`,

  //training modules
  trainingModules: (courseId: string) =>
    `${BASE_URL}/api/v1/training-modules/courses/${courseId}/modules`,
  trainingCourses: `${BASE_URL}/api/v1/training-modules/courses`,
  trainers: ({ search, page }: { search?: string; page?: number }) => {
    const params = new URLSearchParams()
    if (search) {
      params.append('search', search)
    }
    if (page) {
      params.append('page', page.toString())
    }
    return `${BASE_URL}/api/v1/training-modules/trainers?${params.toString()}`
  },
  trainer: (id: string) => `${BASE_URL}/api/v1/training-modules/trainers/${id}`,
  trainingModule: (id: string) => `${BASE_URL}/api/v1/training-modules/${id}`,
  trainingCourse: (id: string) =>
    `${BASE_URL}/api/v1/training-modules/courses/${id}`,
  quizQuestions: (id: string) =>
    `${BASE_URL}/api/v1/quiz/${id}/questions?type=trainer`,
  trainingModuleComplete: (id: string, moduleId: string) =>
    `${BASE_URL}/api/v1/training-modules/courses/${id}/modules/${moduleId}/complete`,
  trainingModuleQuizComplete: (moduleId: string) =>
    `${BASE_URL}/api/v1/training-modules/${moduleId}/submit-quiz`,
  trainingModuleProgress: (id: string) =>
    `${BASE_URL}/api/v1/training-modules/courses/${id}/progress`,
  getCertificate: (userId: string) =>
    `${BASE_URL}/api/v1/training-modules/certificate/users/${userId}`,
}
