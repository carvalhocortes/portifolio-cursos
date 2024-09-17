import { InferType } from 'yup'
import createUserSchema from '../Schemas/createUserSchema'
import updateUserSchema from '../Schemas/updateUserSchema'
import EnumProfiles from '../enums/EnumProfiles'

export type User = {
  id: string
  name: string
  email: string
  password: string
  profile: EnumProfiles
  created_at: Date
  updated_at: Date
}

export type UserResponse = Omit<User, 'password'>

export type CreateUserPayload = InferType<typeof createUserSchema>['body']

export type UpdateUserPayload = InferType<typeof updateUserSchema>['body']


