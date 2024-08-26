import request from 'supertest'
import { expect } from 'chai'

describe('POST /courses', () => {
  it('should create a new course and return the course details', async () => {
    const newCourse = {
      name: 'Test Course',
      description: 'This is a test course.',
      duration: '10 hours',
      coverUrl: 'http://example.com/course-cover.jpg'
    }
    const res = await request(app).post('/courses').send(newCourse).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.equal('Novo curso criado com sucesso.')
    expect(res.body).to.have.property('courseId')
  })
  it('should return 400 when payload is invalid', async () => {
    const invalidCourse = {
      name: '',
      description: 'This is an invalid course.',
      duration: 'not a duration',
      coverUrl: 'not a url'
    }
    const res = await request(app).post('/courses').send(invalidCourse).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(400)
  })
  it('should return 409 when course already exists', async () => {
    const existingCourse = {
      name: 'Existing Course',
      description: 'This course already exists.',
      duration: '5 hours',
      coverUrl: 'http://example.com/existing-course-cover.jpg'
    }
    await request(app).post('/courses').send(existingCourse).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    const res = await request(app).post('/courses').send(existingCourse).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(409)
  })
  it('should return 403 for unauthorized access', async () => {
    const newCourse = {
      name: 'Unauthorized Course',
      description: 'This course should not be created.',
      duration: '3 hours',
      coverUrl: 'http://example.com/unauthorized-course-cover.jpg'
    }
    const res = await request(app).post('/courses').send(newCourse)
    expect(res.status).to.equal(403)
  })
})
