import request from 'supertest'
import { expect } from 'chai'

describe('POST /users', () => {
  it('should create a new user and return the user details', async () => {
    const newUser = {
      name: 'Test User',
      email: 'testuser@example.com',
      courses: []
    }
    const res = await request(app).post('/users').send(newUser).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(201)
    expect(res.body).to.have.property('message')
    expect(res.body.message).to.equal('Novo usuário criado com sucesso, a senha foi enviada para o e-mail cadastrado.')
    expect(res.body).to.have.property('user')
    expect(res.body.user).to.include({ name: newUser.name, email: newUser.email })
  })
  it('should return 400 when payload is invalid', async () => {
    const invalidUser = {
      name: '',
      email: 'not-an-email',
      courses: 'not-an-array'
    }
    const res = await request(app).post('/users').send(invalidUser).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(400)
  })
  it('should return 409 when user already exists', async () => {
    const existingUser = {
      name: 'Existing User',
      email: 'existinguser@example.com',
      courses: []
    }
    await request(app).post('/users').send(existingUser).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    const res = await request(app).post('/users').send(existingUser).set('Authorization', 'Bearer YOUR_ADMIN_TOKEN')
    expect(res.status).to.equal(409)
  })
  it('should return 403 for unauthorized access', async () => {
    const newUser = {
      name: 'Unauthorized User',
      email: 'unauthorized@example.com',
      courses: []
    }
    const res = await request(app).post('/users').send(newUser)
    expect(res.status).to.equal(403)
  })
})
