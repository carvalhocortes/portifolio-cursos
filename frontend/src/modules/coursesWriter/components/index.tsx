'use client'
import React, { useEffect, useState } from 'react'
import { Box, Text, Table, Thead, Tbody, Tr, Th, Td, Link } from '@chakra-ui/react'
import { FaPencil } from 'react-icons/fa6'
import { Course } from '../types'
import { userLoginStore } from '@/modules/login/store'
import { getWriterCourses } from '../services'
import { RedirectingPage } from '@/modules/shared/RedirectingPage'
import { useRouter } from 'next/navigation'

export const CoursesWriter: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { loginData } = userLoginStore()
  const router = useRouter()
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getWriterCourses({
          token: loginData!.token,
          id: (loginData!.decodedToken as { userId: string }).userId!
        })
        setCourses(response)
      } catch (err) {
        setError('Erro ao carregar cursos')
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [loginData])

  if (loading) return <RedirectingPage />
  if (error) return <Text color="red.500">{error}</Text>
  return (
    <Box maxWidth="600px" margin="0 auto">
      <Text fontSize="2xl" mb="4" fontWeight="bold">
        Cursos
      </Text>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Carga horária</Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses.map((course) => (
            <Tr key={course.id}>
              <Td>{course.name}</Td>
              <Td>{course.duration}h</Td>
              <Td>
                <FaPencil onClick={() => router.push(`module/${course.id}`)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}
