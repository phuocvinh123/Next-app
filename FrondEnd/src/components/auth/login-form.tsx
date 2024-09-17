'use client'

import { useRouter } from 'next/navigation'
import { Spinner } from '@chakra-ui/react'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/components/store/store'
import { setCookie } from 'cookies-next'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  setEmail,
  setPassword,
} from '@/components/slice/user-slice'

/* eslint-disable react/no-unescaped-entities */
const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { email, password, loading, error } = useSelector(
    (state: RootState) => state.user
  )

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    dispatch(loginStart())
    try {
      const response = await fetch('http://localhost:9002/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })
      const user = await response.json()

      if (!response.ok) {
        throw new Error(user.message || 'Login failed')
      }

      setCookie('userId', user.id)
      dispatch(loginSuccess({ token: user.token, user }))
      toast.success('Login successful')
      router.push('/product')
    } catch (err) {
      console.error('Error occurred:', err)
      dispatch(loginFailure('Something went wrong. Please try again.'))
    }
  }

  return (
    <>
      {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50'>
          <Spinner size='xl' className='w-16 h-16' />
        </div>
      )}
      <div className='flex flex-col justify-center items-center bg-white shadow-2xl w-[600px] p-10'>
        <div className='text-3xl font-bold leading-[35px]'>Sign in</div>
        <div className='flex justify-center items-center gap-5 mt-10 bg-indigo-100 px-12 py-4 rounded-xl cursor-pointer'>
          <div className='rounded-full p-2 bg-white '>
            <svg className='w-4' viewBox='0 0 533.5 544.3'>
              <path
                d='M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z'
                fill='#4285f4'
              />
              <path
                d='M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z'
                fill='#34a853'
              />
              <path
                d='M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z'
                fill='#fbbc04'
              />
              <path
                d='M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z'
                fill='#ea4335'
              />
            </svg>
          </div>
          <div>Sign Up with Google</div>
        </div>
        <div className='flex justify-center items-center gap-5 mt-10 bg-indigo-100 px-12 py-4 rounded-xl cursor-pointer'>
          <div className='rounded-full p-2 bg-white '>
            <svg className='w-6' viewBox='0 0 32 32'>
              <path
                fillRule='evenodd'
                d='M16 4C9.371 4 4 9.371 4 16c0 5.3 3.438 9.8 8.207 11.387.602.11.82-.258.82-.578 0-.286-.011-1.04-.015-2.04-3.34.723-4.043-1.609-4.043-1.609-.547-1.387-1.332-1.758-1.332-1.758-1.09-.742.082-.726.082-.726 1.203.086 1.836 1.234 1.836 1.234 1.07 1.836 2.808 1.305 3.492 1 .11-.777.422-1.305.762-1.605-2.664-.301-5.465-1.332-5.465-5.93 0-1.313.469-2.383 1.234-3.223-.121-.3-.535-1.523.117-3.175 0 0 1.008-.32 3.301 1.23A11.487 11.487 0 0116 9.805c1.02.004 2.047.136 3.004.402 2.293-1.55 3.297-1.23 3.297-1.23.656 1.652.246 2.875.12 3.175.77.84 1.231 1.91 1.231 3.223 0 4.61-2.804 5.621-5.476 5.922.43.367.812 1.101.812 2.219 0 1.605-.011 2.898-.011 3.293 0 .32.214.695.824.578C24.566 25.797 28 21.3 28 16c0-6.629-5.371-12-12-12z'
              />
            </svg>
          </div>
          <div>Sign Up with GitHub</div>
        </div>
        <div className='my-12  text-center'>
          <div className='relative inline-block px-2'>
            <span className='absolute -left-40 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-300'></span>
            <div className='leading-none text-sm text-gray-600 tracking-wide font-medium bg-white'>
              Or sign up with e-mail
            </div>
            <span className='absolute -right-40 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-300'></span>
          </div>
        </div>
        {error && <div className='text-red-500 mt-4'>{error}</div>}
        <form onSubmit={handleLogin} method='POST' className='flex flex-col'>
          <input
            className='w-[300px] px-12 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
            type='text'
            placeholder='Username'
            value={email}
            onChange={(e) => dispatch(setEmail(e.target.value))}
          />
          <input
            className='w-[300px] px-12 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5'
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
          />
          <button
            type='submit'
            className='mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none'
          >
            <svg
              className='w-6 h-6 -ml-2'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
              <circle cx='8.5' cy='7' r='4' />
              <path d='M20 8v6M23 11h-6' />
            </svg>
            <span className='ml-3'>Sign In</span>
          </button>
        </form>
        <p className='mt-10 text-xs text-gray-600 text-center'>
          I agree to abide by templatana's
          <Link href='#' className='border-b border-gray-500 border-dotted'>
            Terms of Service
          </Link>
          and its
          <Link href='#' className='border-b border-gray-500 border-dotted'>
            Privacy Policy
          </Link>
        </p>
      </div>
    </>
  )
}

export default LoginForm
