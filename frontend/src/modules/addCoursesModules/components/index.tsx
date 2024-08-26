'use client'

import React, { useEffect, useState } from 'react'
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Flex, Button, useDisclosure, useToast } from '@chakra-ui/react'
import { useForm } from 'react-hook-form'
import { Module } from '../types'
import { zodResolver } from '@hookform/resolvers/zod'
import { userLoginStore } from '@/modules/login/store'
import { getCourseModules, createCourseModule } from '../services'
import { RedirectingPage } from '@/modules/shared/RedirectingPage'
import { MainLayout } from '@/modules/shared/MainLayout'
import { ModuleFormData, moduleSchema } from '../validators'
import { useRouter } from 'next/navigation'
import { AddModuleModal } from './AddModuleModal'
import { jwtDecode } from 'jwt-decode'

export const CoursesModules: React.FC<{ id: string }> = ({ id }) => {
  const [courseModules, setCourseModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const { loginData, setLoginData } = userLoginStore()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ModuleFormData>({
    resolver: zodResolver(moduleSchema)
  })
  useEffect(() => {
    if(loginData) return
    const loginStorage = localStorage.getItem('user-login')
    if (!loginStorage) return router.push('/login')
    const token = JSON.parse(loginStorage).token as string
    const decodedToken = jwtDecode(token)
    const userData = { decodedToken, token}
    return setLoginData(userData)
  }, [loginData, router, setLoginData])

  useEffect(() => {
    const fetchCourseModules = async (id: string) => {
      try {
        const response = await getCourseModules(loginData!.token, id)
        setCourseModules(response)
      } catch (err) {
        console.error('Erro ao carregar cursos:', err)
        setCourseModules([])
      } finally {
        setLoading(false)
      }
    }

    fetchCourseModules(id)
  }, [loginData, id, router])

  const handleAddModule = async (data: ModuleFormData) => {
    try {
      const response = await createCourseModule(loginData!.token, id, data)
      setCourseModules([...courseModules, response])
      toast({
        title: 'Módulo criado.',
        description: 'O módulo foi criado com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true
      })
      reset()
      onClose()
    } catch (err) {
      toast({
        title: 'Erro.',
        description: 'Não foi possível criar o módulo.',
        status: 'error',
        duration: 5000,
        isClosable: true
      })
    }
  }

  if (loading) return <RedirectingPage />

  return (
    <MainLayout>
      <Box maxWidth="600px" margin="0 auto">
        <Flex justifyContent="space-between">
          <Text fontSize="2xl" mb="4" fontWeight="bold">
            Módulos
          </Text>
          <Button
            color="white"
            backgroundColor="form.primary-button"
            mb="4"
            borderWidth="1px"
            _hover={{
              borderColor: 'form.primary-button',
              color: 'form.primary-button',
              backgroundColor: 'transparent'
            }}
            onClick={onOpen}
          >
            Novo módulo
          </Button>
        </Flex>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Nome do módulo</Th>
            </Tr>
          </Thead>
          <Tbody>
            {courseModules.length > 0 ? (
              courseModules.map((module) => (
                <Tr key={module.id}>
                  <Td>{module.name}</Td>
                </Tr>
              ))
            ) : (
              <Tr>
                <Td>Nenhum módulo encontrado.</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </Box>

      <AddModuleModal
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleAddModule}
        errors={errors}
        register={register}
        handleSubmit={handleSubmit}
      />
    </MainLayout>
  )
}
