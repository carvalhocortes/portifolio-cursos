import request from 'supertest'
import { expect } from 'chai'

describe('POST /courses/:course_id/modules', () => {
  it('should add a course module and return success message', async () => {
    const courseId = '1'
    const newModule = { name: 'New Module', videoName: 'Video 1', videoDuration: '10 minutes', videoUrl: 'http://example.com/video1.mp4' }
    const res = await request(app).post(`/courses/${courseId}/modules`).send(newModule).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.equal('Novo módulo criado com sucesso.')
  })
  it('should return 400 when payload is invalid', async () => {
    const courseId = '1'
    const invalidModule = { name: '', videoName: 'Video 1', videoDuration: 'not a duration', videoUrl: 'not a url' }
    const res = await request(app).post(`/courses/${courseId}/modules`).send(invalidModule).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(400)
  })
  it('should return 404 when course does not exist', async () => {
    const invalidCourseId = '9999'
    const newModule = { name: 'New Module', videoName: 'Video 1', videoDuration: '10 minutes', videoUrl: 'http://example.com/video1.mp4' }
    const res = await request(app).post(`/courses/${invalidCourseId}/modules`).send(newModule).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(404)
  })
  it('should return 403 for unauthorized access', async () => {
    const courseId = '1'
    const newModule = { name: 'New Module', videoName: 'Video 1', videoDuration: '10 minutes', videoUrl: 'http://example.com/video1.mp4' }
    const res = await request(app).post(`/courses/${courseId}/modules`).send(newModule)
    expect(res.status).to.equal(403)
  })
})
