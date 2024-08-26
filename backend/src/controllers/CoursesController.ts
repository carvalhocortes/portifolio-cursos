import { Request, Response } from 'express'
import CoursesRepository from '../repositories/CoursesRepository'

export default class CoursesController {
  constructor(private coursesRepository: CoursesRepository) {}

  private async handleResponse(promise: Promise<any>, res: Response, successStatus = 200) {
    return promise
      .then(data => res.status(successStatus).json(data))
      .catch((error: any) => {
        console.log(error)
        const statusCode = error.httpCode || 500
        const message = error.msg || 'Internal Server Error'
        return res.status(statusCode).json({ message })
      })
  }

  async listAllCourses(req: Request, res: Response) {
    const usersPromise = this.coursesRepository.listAllCourses()
    return this.handleResponse(usersPromise, res)
  }
  async createNewCourse(req: Request, res: Response) {
    const usersPromise = this.coursesRepository.createNewCourse(req.body).then(res => ({
      message: 'Novo curso criado com sucesso.',
      courseId: res.id
    }))
    return this.handleResponse(usersPromise, res, 201)
  }
  async updateCourseStatus(req: Request, res: Response) {
    const updatePromise = this.coursesRepository.updateCourseStatus(req).then(status => ({
      message: 'Status atualizado com sucesso',
      newStatus: status
    }))
    return this.handleResponse(updatePromise, res)
  }
  async listUserCourses(req: Request, res: Response) {
    const coursesPromise = this.coursesRepository.listUserCourses(req.params.user_id)
    return this.handleResponse(coursesPromise, res)
  }
  async addCourseModule(req: Request, res: Response) {
    const newCourseModulePromise = this.coursesRepository.addCourseModule(req).then(() => ({
      message: 'Novo módulo criado com sucesso.'
    }))
    return this.handleResponse(newCourseModulePromise, res, 201)
  }
  async listCourseModules(req: Request, res: Response) {
    const newCourseModulePromise = this.coursesRepository.listCourseModules(req.params.course_id)
    return this.handleResponse(newCourseModulePromise, res)
  }
}
