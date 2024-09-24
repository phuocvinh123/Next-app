/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteCookie, setCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from '@/components/interfaces/interface'

const isTokenExpired = (token: string): boolean => {
  const decoded: any = jwtDecode(token)
  return decoded.exp * 1000 < Date.now()
}

const fetchNewAccessToken = async (refreshToken: string | undefined) => {
  try {
    const response = await fetch(
      'http://localhost:9002/api/user/refresh-token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
        credentials: 'include',
      }
    )

    if (!response.ok) {
      throw new Error('Failed to refresh token')
    }

    const { accessToken: newAccessToken } = await response.json()
    setCookie('accessToken', newAccessToken, { maxAge: 60 })
    console.log('tạo mới token thành công')
    return newAccessToken
  } catch (err) {
    console.error('Error refreshing token:', err)
    return null
  }
}

export async function middleware(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (!accessToken) {
    throw new Error('Failed to accessToken token')
  }

  const decoded = jwtDecode<CustomJwtPayload>(accessToken)
  const customerId = decoded?.customerId || null
  const role = decoded?.role || null

  if (!customerId) {
    return NextResponse.redirect(new URL('/login?error=no-access', req.url))
  }

  if (accessToken && isTokenExpired(accessToken)) {
    const newAccessToken = await fetchNewAccessToken(refreshToken)
    if (!newAccessToken) {
      deleteCookie('accessToken')
      deleteCookie('customerId')
      deleteCookie('refreshToken')
      return NextResponse.redirect(
        new URL('/login?error=session-expired', req.url)
      )
    }
  }
  if (role === 'ADMIN') {
    return NextResponse.next()
  }

  if (
    req.nextUrl.pathname.startsWith('/product') ||
    req.nextUrl.pathname.startsWith('/buy-order') ||
    req.nextUrl.pathname.startsWith('/history-order') ||
    req.nextUrl.pathname.startsWith('/order-now') ||
    req.nextUrl.pathname.startsWith('/order-success')
  ) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login?error=no-access', req.url))
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/product/:path*',
    '/buy-order/:path*',
    '/history-order/:path*',
    '/order-now/:path*',
    '/order-success/:path*',
    '/api/:path*',
  ],
}
