import type { Metadata } from 'next'
import { Providers } from './providers'
import '@fontsource/titan-one'

export const metadata: Metadata = {
  title: 'Super Cursos',
  description: 'Super Cursos application'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
