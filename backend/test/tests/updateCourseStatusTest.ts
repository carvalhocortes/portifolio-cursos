import request from 'supertest'
import { expect } from 'chai'

describe('PATCH /courses/:course_id/status', () => {
  it('should update the course status and return success message', async () => {
    const courseId = '1'
    const newStatus = {
      status: 'active'
    }
    const res = await request(app).patch(`/courses/${courseId}/status`).send(newStatus).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(200)
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.equal('Status atualizado com sucesso')
    expect(res.body).to.have.property('newStatus')
    expect(res.body.newStatus).to.equal(newStatus.status)
  })
  it('should return 400 when payload is invalid', async () => {
    const courseId = '1'
    const invalidStatus = {
      status: ''
    }
    const res = await request(app).patch(`/courses/${courseId}/status`).send(invalidStatus).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(400)
  })
  it('should return 404 when course does not exist', async () => {
    const invalidCourseId = '9999'
    const newStatus = {
      status: 'active'
    }
    const res = await request(app).patch(`/courses/${invalidCourseId}/status`).send(newStatus).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(404)
  })
  it('should return 403 for unauthorized access', async () => {
    const courseId = '1'
    const newStatus = {
      status: 'active'
    }
    const res = await request(app).patch(`/courses/${courseId}/status`).send(newStatus)
    expect(res.status).to.equal(403)
  })
})
