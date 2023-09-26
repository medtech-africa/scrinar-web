const BASE_URL = process.env.NEXT_API_URL

export const API = {
  // auth
  login: `${BASE_URL}/api/v1/hospitals/auth/login`,
  getProfile: `${BASE_URL}/api/v1/hospitals/profile`,

  // // staff
  // staff: (currentPage = 1, limit = 10) =>
  //   `${BASE_URL}/api/v1/hospitals/staff?limit=${limit}${
  //     currentPage ? `&page=${currentPage}` : ''
  //   }`,
}
