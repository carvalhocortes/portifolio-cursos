import request from 'supertest'
import { expect } from 'chai'

describe('Users API', () => {
  describe('GET /users', () => {
    it('should return a list of users for admin', async () => {
      const res = await request(app).get('/users').set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
      expect(res.status).to.equal(200)
      expect(res.body).to.be.an('array')
      expect(res.body).to.have.lengthOf.above(0)
      expect(res.body[0]).to.have.all.keys('name', 'email')
    })
    it('should return 403 for unauthorized access', async () => {
      const res = await request(app).get('/users')
      expect(res.status).to.equal(403)
    })
  })
})
