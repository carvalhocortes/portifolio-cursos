'use client'
import { Courses } from '@/modules/courses/components'
import { CoursesWriter } from '@/modules/coursesWriter/components'
import { userLoginStore } from '@/modules/login/store'
import { MainLayout } from '@/modules/shared/MainLayout'
import { RedirectingPage } from '@/modules/shared/RedirectingPage'
import { jwtDecode } from 'jwt-decode'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export const HomePage = () => {
  const { loginData, setLoginData } = userLoginStore()
  const router = useRouter()
  useEffect(() => {
    if(loginData) return
    const loginStorage = localStorage.getItem('user-login')
    if (!loginStorage) return router.push('/login')
    const token = JSON.parse(loginStorage).token as string
    const decodedToken = jwtDecode(token)
    const userData = { decodedToken, token}
    return setLoginData(userData)
  }, [loginData, router, setLoginData])
  if(!loginData) return <RedirectingPage/>
  return (
    <MainLayout>
      {loginData.decodedToken.aud === 'admin' ? <Courses /> : <CoursesWriter />}
    </MainLayout>
  )
}
