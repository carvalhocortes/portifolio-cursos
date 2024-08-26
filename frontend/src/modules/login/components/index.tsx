'use client'

import LoginForm from './LoginForm'
import { UnlockIcon } from '@chakra-ui/icons'
import { Flex } from '@chakra-ui/react'

export const LoginPage: React.FC = () => {
  return (
    <Flex
      maxWidth="600px"
      height="100vh"
      margin="auto"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <UnlockIcon fontSize="100px" transform="scaleX(-1)" />
      <LoginForm />
    </Flex>
  )
}
