import request from 'supertest'
import { expect } from 'chai'

describe('GET /courses/:course_id/modules', () => {
  it('should return the list of modules for a course', async () => {
    const courseId = '1'
    const res = await request(app).get(`/courses/${courseId}/modules`).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf.above(0)
  })
  it('should return 404 when course does not exist', async () => {
    const invalidCourseId = '9999'
    const res = await request(app).get(`/courses/${invalidCourseId}/modules`).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(404)
  })
  it('should return 403 for unauthorized access', async () => {
    const courseId = '1'
    const res = await request(app).get(`/courses/${courseId}/modules`)
    expect(res.status).to.equal(403)
  })
})
