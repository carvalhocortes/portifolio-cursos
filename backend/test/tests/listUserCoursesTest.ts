import request from 'supertest'
import { expect } from 'chai'

describe('GET /users/:user_id/courses', () => {
  it('should return the list of courses for a user', async () => {
    const userId = '1'
    const res = await request(app).get(`/users/${userId}/courses`).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(200)
    expect(res.body).to.be.an('array')
    expect(res.body).to.have.lengthOf.above(0)
  })
  it('should return 404 when user does not exist', async () => {
    const invalidUserId = '9999'
    const res = await request(app).get(`/users/${invalidUserId}/courses`).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(404)
  })
  it('should return 403 for unauthorized access', async () => {
    const userId = '1'
    const res = await request(app).get(`/users/${userId}/courses`)
    expect(res.status).to.equal(403)
  })
})
