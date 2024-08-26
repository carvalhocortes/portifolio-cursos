import React from 'react'
import { Box, Text, Button, Table, Thead, Tbody, Tr, Th, Td, Switch, Input, Flex } from '@chakra-ui/react'

export const Courses: React.FC = () => {
  return (
    <Box maxWidth="600px" margin="0 auto">
      <Flex justifyContent="space-between">
        <Text fontSize="2xl" mb="4" fontWeight="bold">
          Cursos
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
        >
          Novo Curso
        </Button>
      </Flex>
      <Input placeholder="Pesquise geral" mb="4" />
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Nome</Th>
            <Th>Carga horária</Th>
            <Th>Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>Formação React Js</Td>
            <Td>100h</Td>
            <Td>
              <Switch defaultChecked />
            </Td>
          </Tr>
          {/* mudar para pegar do banco*/}
        </Tbody>
      </Table>
    </Box>
  )
}
