'use client'

import { usePathname } from 'next/navigation'
import { Header } from '@/components/common/header'
import { Footer } from '@/components/common/footer'
import { Provider } from 'react-redux'
import store from '@/components/store/store'
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname === '/register'

  return (
    <Provider store={store}>
      {!isAuthPage && <Header />}
      {children}
      {!isAuthPage && <Footer />}
    </Provider>
  )
}
