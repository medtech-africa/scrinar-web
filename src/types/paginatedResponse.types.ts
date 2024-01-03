export interface PaginatedResponse<T> {
  data: Data<T>
  message: string
}

export interface ApiResponse<T> {
  data: T
  message: string
}

interface Data<T> {
  from: number
  to: number
  per_page: number
  total: number
  current_page: number
  prev_page: any
  next_page: any
  last_page: number
  data: T
}