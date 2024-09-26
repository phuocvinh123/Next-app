/* eslint-disable @typescript-eslint/no-explicit-any */
import { deleteCookie, setCookie } from 'cookies-next'

export const DeleteAccessToken = () => {
  deleteCookie('accessToken')
}

export const SetAccessToken = (accessToken: any) => {
  setCookie('accessToken', accessToken)
}

export const DeleteAllTokens = () => {
  deleteCookie('customerId')
  deleteCookie('accessToken')
  deleteCookie('refreshToken')
}

export const SetCookieAll = (
  accessToken: any,
  refreshToken: any,
  customer: { id: any }
) => {
  setCookie('customerId', customer.id)
  setCookie('accessToken', accessToken)
  setCookie('refreshToken', refreshToken)
}
