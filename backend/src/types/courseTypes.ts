export type RequestNewCourse = {
  name: string
  coverUrl?: string
  description?: string
  duration?: number
}

export type RequestNewCourseModule = {
  name: string
  videoName: string
  videoDuration: number
  videoUrl: string
}