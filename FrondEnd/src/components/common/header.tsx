import Image from 'next/image'
import { Logo } from '../../../public/page'
import Link from 'next/link'
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { toast } from 'react-toastify'
import { deleteCookie, getCookie } from 'cookies-next'
import { useEffect, useState } from 'react'
export const Header = () => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null
  const customerId = getCookie('customerId')

  const handleLogOut = () => {
    deleteCookie('customerId')
    toast.success('Log Out Successfully')
    window.location.href = '/'
  }
  return (
    <div className='3xl:max-w-[1920px] container mx-auto 3xl:px-14 pt-10 flex justify-between relative z-10 '>
      <div className='flex items-center '>
        <div className='flex justify-center items-center w-[170px]'>
          <Link href={'/'}>
            <Image src={Logo} alt='images' width={169} height={34} />
          </Link>
        </div>
        {!customerId ? (
          <div className='lg:flex justify-center items-center text-center gap-[38px] ml-36 hidden font-medium text-lg leading-normal text-[#272D4E] not-italic cursor-pointer'>
            <div>Sell</div>
            <div>Marketplace</div>
            <div>Community</div>
            <div>Develop</div>
            <div>Resources</div>
          </div>
        ) : (
          <div className='lg:flex hidden justify-center items-center ml-36 text-xl leading-normal text-[#272D4E] not-italic cursor-pointer gap-14 '>
            <Link href={'/product'} className='hover:text-orange-500'>
              Product
            </Link>
            <Link href={'/order-now'} className='hover:text-orange-500'>
              Order Now
            </Link>
            <Link href={'/history-order'} className='hover:text-orange-500'>
              Order History
            </Link>
          </div>
        )}
      </div>
      <div className='xl:flex items-center gap-[38px] hidden font-medium text-lg '>
        {!customerId ? (
          <Link href={'/login'} className='text-[#272D4E] cursor-pointer'>
            Log In
          </Link>
        ) : null}
        <div className='rounded-[5px] text-white bg-purple px-[14px] py-[13px] cursor-pointer'>
          Get Started
        </div>
        <div className='cursor-pointer'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            viewBox='0 0 16 16'
            fill='none'
          >
            <path
              d='M15.7812 13.8344L12.6656 10.7188C12.525 10.5781 12.3344 10.5 12.1344 10.5H11.625C12.4875 9.39688 13 8.00937 13 6.5C13 2.90937 10.0906 0 6.5 0C2.90937 0 0 2.90937 0 6.5C0 10.0906 2.90937 13 6.5 13C8.00937 13 9.39688 12.4875 10.5 11.625V12.1344C10.5 12.3344 10.5781 12.525 10.7188 12.6656L13.8344 15.7812C14.1281 16.075 14.6031 16.075 14.8938 15.7812L15.7781 14.8969C16.0719 14.6031 16.0719 14.1281 15.7812 13.8344ZM6.5 10.5C4.29063 10.5 2.5 8.7125 2.5 6.5C2.5 4.29063 4.2875 2.5 6.5 2.5C8.70938 2.5 10.5 4.2875 10.5 6.5C10.5 8.70938 8.7125 10.5 6.5 10.5Z'
              fill='#272D4E'
            />
          </svg>
        </div>
        {!customerId ? null : (
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
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
                  d='M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z'
                />
              </svg>
            </MenuButton>
            <MenuList>
              <MenuItem as='a' href={'/product'}>
                Product
              </MenuItem>
              <MenuItem as='a' href={'/order-now'}>
                Order Now
              </MenuItem>
              <MenuItem as='a' href={'/history-order'}>
                Order History
              </MenuItem>
              <MenuItem onClick={() => handleLogOut()}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        )}
      </div>
      <div className='lg:hidden'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='169px'
          height='34px'
          viewBox='0 0 24 24'
          fill='none'
        >
          <path
            d='M4 6H20M4 12H20M4 18H20'
            stroke='#000000'
            strokeWidth='2'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
      </div>
    </div>
  )
}
