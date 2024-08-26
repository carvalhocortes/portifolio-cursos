import { http, UnexpectedError } from '@/config'
import { GetWriterCoursesRequest, GetWriterCoursesResponse } from '../types'

export const getWriterCourses = async (data: GetWriterCoursesRequest): Promise<GetWriterCoursesResponse> => {
  const url = `/courses/${data.id}`
  try {
    const result = await http.get(url, {headers: {Authorization: `Bearer ${data.token}` }})
    return result.data
  } catch (err) {
    throw new UnexpectedError()
  }
}
