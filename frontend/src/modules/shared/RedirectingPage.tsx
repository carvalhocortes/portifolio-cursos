import { Spinner, Text } from '@chakra-ui/react'
import { MainLayout } from './MainLayout'

export const RedirectingPage = () => {
  return (
    <MainLayout>
      <Spinner p={6} mt={6} />
    </MainLayout>
  )
}
