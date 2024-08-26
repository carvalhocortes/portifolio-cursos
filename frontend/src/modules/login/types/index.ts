import { JwtPayload } from "jwt-decode"

export type LoginRequest = {
  email: string
  password: string
}

export type LoginResponse = {
  token: string
}

export type UserData = {
  token: string
  decodedToken: JwtPayload
}