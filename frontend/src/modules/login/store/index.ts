import { create } from 'zustand'
import { UserData } from '../types'
interface ILoginFormData {
  loginData?: UserData
  setLoginData: (data: UserData) => void
  resetLoginData: () => void
}

export const userLoginStore = create<ILoginFormData>((set) => ({
  loginData: undefined,
  setLoginData: (data: UserData) => set({ loginData: data }),
  resetLoginData: () => {
    set({ loginData: undefined })
    localStorage.removeItem('user-login')
  }
}))
