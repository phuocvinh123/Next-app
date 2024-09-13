'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </>
  )
}
