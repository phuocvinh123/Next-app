import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { Inter, Roboto } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/auth/use-auth'
import { ChakraProvider } from '@chakra-ui/react'
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
  weight: '400',
})

const CircularStd = localFont({
  src: './fonts/CircularStd-BoldItalic.woff',
  variable: '--font-CircularStd-sans',
  weight: '100',
})

export const metadata: Metadata = {
  title: 'Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.variable} ${roboto.variable} ${CircularStd.variable} antialiased`}
      >
        <ChakraProvider>
          <AuthProvider>{children}</AuthProvider>
        </ChakraProvider>
      </body>
    </html>
  )
}
