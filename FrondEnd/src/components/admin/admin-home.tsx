'use client'

import AdminOrder from '@/components/admin/admin-order'
import AdminProduct from '@/components/admin/admin-product'
import AdminSendEmail from '@/components/admin/admin-send-email'
import Dashboard from '@/components/admin/dashboard'
import RatingAdmin from '@/components/admin/admin-rating'
import { DeleteAllTokens } from '@/components/cookies/token'
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
} from '@chakra-ui/react'
import { useState } from 'react'
import { toast } from 'react-toastify'

const AdminHome = () => {
  const [currentTab, setCurrentTab] = useState('Dashboard')

  const renderContent = () => {
    switch (currentTab) {
      case 'Product':
        return <AdminProduct />
      case 'Dashboard':
        return <Dashboard />
      case 'Order':
        return <AdminOrder />
      case 'SendEmail':
        return <AdminSendEmail />
      case 'Rating':
        return <RatingAdmin />
      case 'User':
      default:
        return null
    }
  }

  const handleLogOut = () => {
    DeleteAllTokens()
    window.location.href = '/'
    toast.success('Log Out Successfully')
  }
  return (
    <div className='flex'>
      <div className='w-[350px] h-[920px] bg-[#1c2434] pl-4 fixed'>
        <div className='pt-6 text-4xl text-white text-center border-b-2 border-black pb-4 w-[320px] font-medium'>
          # ADMIN
        </div>
        <div className='mt-5 flex flex-col gap-y-10 text-2xl ml-6 text-white font-normal'>
          <div
            className='border-b-[0.5px] border-[#rgb(131_131_131)] pb-4 w-[260px] cursor-pointer hover:text-red-300'
            onClick={() => setCurrentTab('Dashboard')}
          >
            Dashboard
          </div>
          <div
            className='border-b-[0.5px] border-[#rgb(131_131_131)] pb-4 w-[260px] cursor-pointer hover:text-red-300'
            onClick={() => setCurrentTab('Product')}
          >
            Product
          </div>
          <div
            className='border-b-[0.5px] border-[#rgb(131_131_131)] pb-4 w-[260px] cursor-pointer hover:text-red-300'
            onClick={() => setCurrentTab('Order')}
          >
            Order
          </div>
          <div
            className='border-b-[0.5px] border-[#rgb(131_131_131)] pb-4 w-[260px] cursor-pointer hover:text-red-300'
            onClick={() => setCurrentTab('SendEmail')}
          >
            Send Email
          </div>
          <div
            className='border-b-[0.5px] border-[#rgb(131_131_131)] pb-4 w-[260px] cursor-pointer hover:text-red-300'
            onClick={() => setCurrentTab('Rating')}
          >
            Rating
          </div>
        </div>
      </div>
      <div className='bg-[#f1f5f9] w-full'>
        <div className='w-[1520px] ml-[350px] h-[80px] bg-white p-5 flex justify-between fixed z-10'>
          <div className='flex items-center gap-4 ml-4'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                />
              </svg>
            </div>
            <div>
              <input
                type='search'
                className='border border-white hover:border-white focus:border-white focus:outline-none p-2 w-[550px]'
                placeholder='Type to search ...'
              />
            </div>
          </div>
          <div className='flex mr-10 items-center gap-8'>
            <div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth='1.5'
                stroke='currentColor'
                className='size-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5'
                />
              </svg>
            </div>
            <Menu>
              <MenuButton>
                <div className='flex items-center gap-5'>
                  <div>
                    <Wrap>
                      <WrapItem>
                        <Avatar
                          name='Dan Abrahmov'
                          src='https://bit.ly/dan-abramov'
                        />
                      </WrapItem>
                    </Wrap>
                  </div>
                  <div>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth='1.0'
                      stroke='currentColor'
                      className='size-4'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='m19.5 8.25-7.5 7.5-7.5-7.5'
                      />
                    </svg>
                  </div>
                </div>
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => handleLogOut()}>Log Out</MenuItem>
              </MenuList>
            </Menu>
          </div>
        </div>
        <div className='mt-32 ml-[380px] z-0'>
          <div className='text-3xl font-medium'>{currentTab}</div>
          <div className='mt-5'>{renderContent()}</div>
        </div>
      </div>
    </div>
  )
}
export default AdminHome
