import { http, UnexpectedError } from '@/config'
import { GetCoursesModulesResponse, Module } from '../types'

export const getCourseModules = async (token: string, courseId: string): Promise<GetCoursesModulesResponse> => {
  const url = `/courses/${courseId}/modules`
  try {
    const result = await http.get(url, { headers: { Authorization: `Bearer ${token}` } })
    return result.data
  } catch (err) {
    throw new UnexpectedError()
  }
}

interface CreateCourseModuleRequest {
  name: string
  videoName: string
  videoDuration: string
  videoUrl: string
}

export const createCourseModule = async (
  token: string,
  courseId: string,
  moduleData: CreateCourseModuleRequest
): Promise<Module> => {
  const url = `/courses/${courseId}/modules`
  try {
    const response = await http.post(url, moduleData, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const newModule: Module = {
      id: `temp-id-${Date.now()}`,
      name: moduleData.name,
      videoName: moduleData.videoName,
      videoDuration: moduleData.videoDuration,
      videoUrl: moduleData.videoUrl
    }
    return newModule
  } catch (err) {
    throw new UnexpectedError()
  }
}
