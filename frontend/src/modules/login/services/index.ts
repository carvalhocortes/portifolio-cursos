import { http, UnexpectedError } from '@/config'
import { LoginRequest, LoginResponse } from '../types'

export const loginUser = async (data: LoginRequest): Promise<LoginResponse> => {
  const url = `/sessions`
  try {
    const result = await http.post(url, {
      email: data.email,
      password: data.password
    })
    return result.data as LoginResponse
  } catch (err) {
    throw new UnexpectedError()
  }
}
