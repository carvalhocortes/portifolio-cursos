import axios from 'axios'
import should from 'should'

describe('Session path', () => {
  it('should login successfully with valid credentials', async () => {
    const loginData = {
      email: 'admin@supercourses.com',
      password: '8191279'
    }
    const response = await axios.post('http://localhost:5000/sessions', loginData)
    response.should.have.property('data')
    response.data.should.have.property('token').which.is.a.String()
    response.should.have.property('status').which.is.eql(200)
  })
  it('should return 400 if email is missing', async () => {
    const loginData = {
      password: '8191279'
    }
    try {
      await axios.post('http://localhost:5000/sessions', loginData)
    } catch (error) {
      error.should.have.property('status').which.is.eql(400)
      error.data.should.have.property('message', 'Invalid request')
    }
  })
  it('should return 400 if password is missing', async () => {
    const loginData = {
      email: 'admin@supercourses.com'
    }
    try {
      await axios.post('http://localhost:5000/sessions', loginData)
    } catch (error) {
      error.should.have.property('status').which.is.eql(400)
      error.data.should.have.property('message', 'Invalid request')
    }
  })
  it('should return 401 if credentials are invalid', async () => {
    const loginData = {
      email: 'invalid@example.com',
      password: 'wrongpassword'
    }
    try {
      await axios.post('http://localhost:5000/sessions', loginData)
    } catch (error) {
      error.should.have.property('status').which.is.eql(401)
      error.data.should.have.property('message', 'Invalid password')
    }
  })
})
