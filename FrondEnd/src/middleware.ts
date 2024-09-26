/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'
import { CustomJwtPayload } from '@/components/interfaces/interface'

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: any = jwtDecode(token)
    if (!decoded.exp) {
      console.error('Token does not have an exp field')
      return true
    }
    return decoded.exp * 1000 < Date.now()
  } catch (error) {
    console.error('Error decoding token:', error)
    return true
  }
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
    console.log('Tạo mới token thành công')
    return newAccessToken
  } catch (err) {
    console.error('Error refreshing token:', err)
    return null
  }
}

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const accessToken = req.cookies.get('accessToken')?.value
  const refreshToken = req.cookies.get('refreshToken')?.value

  if (!accessToken) {
    return NextResponse.redirect(new URL('/login?error=no-access', req.url))
  }

  let decoded: CustomJwtPayload | null = null
  let isExpired = false
  try {
    decoded = jwtDecode<CustomJwtPayload>(accessToken)
    isExpired = isTokenExpired(accessToken)
  } catch (error) {
    console.error('Token không hợp lệ:', error)
    res.cookies.delete('accessToken')
    isExpired = true
  }

  if (isExpired) {
    if (refreshToken) {
      const newAccessToken = await fetchNewAccessToken(refreshToken)

      if (!newAccessToken) {
        res.cookies.delete('accessToken')
        res.cookies.delete('refreshToken')
        res.cookies.delete('customerId')
        return NextResponse.redirect(
          new URL('/login?error=session-expired', req.url)
        )
      }
      res.cookies.set('accessToken', newAccessToken)
      decoded = jwtDecode<CustomJwtPayload>(newAccessToken)
    } else {
      res.cookies.delete('accessToken')
      res.cookies.delete('refreshToken')
      res.cookies.delete('customerId')
      return NextResponse.redirect(
        new URL('/login?error=session-expired', req.url)
      )
    }
  }

  const customerId = decoded?.customerId || null
  const role = decoded?.role || null

  if (!customerId) {
    res.cookies.delete('accessToken')
    res.cookies.delete('refreshToken')
    res.cookies.delete('customerId')
    return NextResponse.redirect(new URL('/login?error=no-access', req.url))
  }

  if (role === 'ADMIN') {
    return res
  }

  if (
    req.nextUrl.pathname.startsWith('/product') ||
    req.nextUrl.pathname.startsWith('/buy-order') ||
    req.nextUrl.pathname.startsWith('/history-order') ||
    req.nextUrl.pathname.startsWith('/order-now') ||
    req.nextUrl.pathname.startsWith('/order-success')
  ) {
    return res
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
