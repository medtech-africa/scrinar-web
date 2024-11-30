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
  registerStudents: `${BASE_URL}/api/v1/students/createByPublic`,
  parents: `${BASE_URL}/api/v1/parents`,
  exportParentQuestionnaire: `${BASE_URL}/api/v1/parents/questionnaire/export`,
  parentQuestionnaire: (id: string) =>
    `${BASE_URL}/api/v1/parents/${id}/questionnaire`,
  student: (id: string) => `${BASE_URL}/api/v1/students/${id}`,
  exportStudentQuestionnaire: `${BASE_URL}/api/v1/students/questionnaire/export`,
  parent: (id: string) => `${BASE_URL}/api/v1/parents/${id}`,
  getStudents: (
    page?: number,
    level?: string,
    searchVal?: string,
    sortVal = ''
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: '15',
      per_page: '15',
      level: level ?? '',
      search: searchVal ?? '',
      sort: sortVal,
    })

    const queryString = params.toString()
    return `${BASE_URL}/api/v1/students${queryString ? `?${queryString}` : ''}`
  },
  getParents: (
    page?: number,
    searchVal = '',
    gender = '',
    all = false,
    sortVal = ''
  ) => {
    const params = new URLSearchParams({
      page: String(page),
      limit: gender || all ? '1000' : '15',
      per_page: gender || all ? '1000' : '15',
      search: searchVal,
      gender,
      sort: sortVal,
    })

    const queryString = params.toString()
    return `${BASE_URL}/api/v1/parents${queryString ? `?${queryString}` : ''}`
  },

  //instructors
  instructors: `${BASE_URL}/api/v1/instructors`,
  instructor: (id: string) => `${BASE_URL}/api/v1/instructors/${id}`,
  getInstructors: (lastKey?: string) =>
    `${BASE_URL}/api/v1/instructors${lastKey ? `?lastKey=${lastKey}` : ''}`,

  //  health data
  healthData: `${BASE_URL}/api/v1/health-data`,
  getHealthData: `${BASE_URL}/api/v1/health-data`,
  getFamilyHealthData: `${BASE_URL}/api/v1/health-data/house-hold`,
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
  schoolUpload: `${BASE_URL}/api/v1/school/resources`,
  schoolResources: `${BASE_URL}/api/v1/school/resources`,
  schoolUpdate: `${BASE_URL}/api/v1/school/me`,
  householdStats: `${BASE_URL}/api/v1/health-data/house-hold/stats`,
  getSchools: (search: string, state?: string) =>
    `${BASE_URL}/api/v1/school?search=${search}${state ? `&state=${state}` : ''}`,

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

  // survey
  studentSurvey: (id: string) =>
    `${BASE_URL}/api/v1/students/${id}/questionnaire`,

  // analytics
  healthDataAnalytics: `${BASE_URL}/api/v1/analytics/health-data/category-data`,
  healthDataCompletionAnalytics: `${BASE_URL}/api/v1/analytics/health-data/data-with-completion`,

  // risk assessment
  riskAssessment: `${BASE_URL}/api/v1/risk-assessment`,
}
