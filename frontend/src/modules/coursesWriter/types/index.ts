export type GetWriterCoursesRequest = {
  token: string
  id: string
}

export type Course = {
  id: string
  name: string
  cover_url: string
  description: string
  duration: number
  status: string
}

export type GetWriterCoursesResponse = Course[]