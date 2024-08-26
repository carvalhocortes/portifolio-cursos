import { expect } from 'chai'
import nock from 'nock'
import axios from 'axios'
import CoursesEntity from '../../src/entities/CoursesEntity'

describe('List All Courses Test', () => {
  it('should return all courses when courses exist', async () => {
    const mockCourses = [
      new CoursesEntity('Course 1', 'Description 1', 10, 'http://example.com/cover1'),
      new CoursesEntity('Course 2', 'Description 2', 20, 'http://example.com/cover2')
    ]
    nock('http://localhost:3000').get('/courses').reply(200, mockCourses)
    const result = await axios.get('https://api.example.com/endpoint')
    expect(result).to.deep.equal(mockCourses)
  })
  it('should return an empty array when no courses exist', async () => {
    const mockCourses: any[] = []
    nock('http://localhost:3000').get('/courses').reply(200, mockCourses)
    const result = await axios.get('http://localhost:3000/courses')
    expect(result).to.deep.equal(mockCourses)
  })
})
