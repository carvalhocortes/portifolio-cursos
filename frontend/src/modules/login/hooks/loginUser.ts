import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { LoginRequest } from '../types'
import { loginUser } from '../services'
import { userLoginStore } from '../store'
import { jwtDecode } from 'jwt-decode';

/**
 * @name useCreateUser
 * @description Hook responsável por simular login de usuário
 */

export const useLoginUser = () => {
  const router = useRouter()
  const { setLoginData } = userLoginStore()
  return useMutation(['register/create'], (data: LoginRequest) => loginUser(data), {
    onSuccess: (data) => {
      const token = data.token
      const decodedToken = jwtDecode(data.token)
      setLoginData({ decodedToken, token })
      localStorage.setItem('user-login', JSON.stringify(data))
      router.prefetch('/home')
      router.push('/home')
    },
    onError: (error) => {
      console.error('Erro ao fazer login:', error)
      alert('Erro ao fazer login, tente novamente.')
    }
  })
}
