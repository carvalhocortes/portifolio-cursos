'use client'
import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const colors = {
  main: {
    primary: '#FFFFFF',
    secundary: '#E7E4FF'
  },
  form: {
    label: '#685AFA',
    'label-selected': '#5449c8',
    'primary-button': '#685AFA',
    'primary-button-selected': '#685AFA',
    'secundary-button': '#7B8C97',
    'secundary-button-selected': '#7B8C97'
  }
}

const fonts = {
  fonts: {
    montserrat: `'Montserrat', sans-serif`,
    architectsDaughter: 'Architects Daughter',
    capriola: "'Capriola', sans-serif"
  }
}

const theme = extendTheme({ colors, fonts })

const queryClient = new QueryClient()

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheProvider>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </CacheProvider>
    </QueryClientProvider>
  )
}
