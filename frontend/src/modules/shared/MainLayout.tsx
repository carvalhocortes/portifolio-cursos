'use client'
import React from 'react'
import { Box, VStack, Link } from '@chakra-ui/react'
import { userLoginStore } from '../login/store'
import { useRouter } from 'next/navigation'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { loginData, resetLoginData } = userLoginStore()

  const handleLogout = () => {
    resetLoginData()
    router.push('/login')
  }
  const goCourses = () => {
    router.push('/home')
  }
  return (
    <Box display="flex" minHeight="100vh">
      <Box
        width="200px"
        bg="main.secundary"
        p="4"
        color="black"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <VStack align="flex-start" spacing={4}>
          { loginData?.decodedToken.aud === 'admin' ?
            <Link href="#" fontSize="lg" fontWeight="bold">Usuários</Link>
          : null
          }
          <Link href="#" fontSize="lg" fontWeight="bold" onClick={goCourses}>Cursos</Link>
          <Link href="#" fontSize="lg" fontWeight="bold" onClick={handleLogout}>Sair</Link>
        </VStack>
      </Box>
      <Box flex="1" p="8" bg="main.primary">
        {children}
      </Box>
    </Box>
  )
}
